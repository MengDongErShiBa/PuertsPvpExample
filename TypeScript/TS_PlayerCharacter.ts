import * as UE from "ue";
import {
    EAttachmentRule,
    ENetRole,
    HitResult,
    PvpBlueprintFunctionLibrary,
    SkeletalMeshComponent,
    TArray,
    ufunction,
    uproperty
} from "ue";
import TS_HealthBarComponent from "./TS_HealthBarComponent";

// 血量变更委托
class TS_PlayerCharacter extends UE.PvpCharacter 
{
    
    // TODO: Ts的注解不太好用
    // https://github.com/Tencent/puerts/discussions/1855  查询了此QA，但没有找到解决方案
    // 暂时使用RPC处理
    @uproperty.uproperty(uproperty.Replicated)
    CurrentHealth: number;
    
    @uproperty.uproperty(uproperty.Replicated)
    private MaxHealth: number;

    @uproperty.uproperty(uproperty.Replicated, uproperty.BlueprintReadOnly)
    private IsAttacking: boolean;

    // 攻击间隔 单位秒
    private AttackInterval: number;

    private AttackRange: number;
    
    private HealthBar: TS_HealthBarComponent;
    
    ReceiveBeginPlay():void
    {
        super.ReceiveBeginPlay();
        
        // 查找组件
        this.HealthBar = this.GetComponentByClass(TS_HealthBarComponent.StaticClass()) as TS_HealthBarComponent;
        if (this.HealthBar)
        {
            // 将组件附加到骨骼的head
            // 查询骨骼组件
            const SkeletalMesh = this.GetComponentByClass(SkeletalMeshComponent.StaticClass()) as SkeletalMeshComponent;
            if (!SkeletalMesh)
            {
                return;
            }
            
            this.HealthBar.K2_AttachToComponent(SkeletalMesh, `UISocket`, EAttachmentRule.SnapToTarget, EAttachmentRule.SnapToTarget, 0, false);
            // console.log(`[TS_PlayerCharacter::ReceiveBeginPlay] 附加HealthBar组件`);
        }
    }

    
    OnRep_CurrentHealth(OldVHealth: number) : void
    {
        console.log(`[TS_PlayerCharacter::OnRep_CurrentHealth]: ${this.CurrentHealth} (old: ${OldVHealth})`);
        if (this.HealthBar)
        {
            this.HealthBar.OnHealthChanged(this.CurrentHealth);
            // console.log(`[TS_PlayerCharacter::OnRep_CurrentHealth]: 调用HealthBar组件`);
        }
        else
        {
            console.log(`[TS_PlayerCharacter::OnRep_CurrentHealth]: 没有找到HealthBar组件`);
        }
    }

    // 服务器RPC函数转发来的
    TsProcessComboAttack():void
    {
        if (!this.HasAuthority())
        {
            return;
        }

        // 获取当前的权限
        let Authority = this.GetLocalRole();

        if (this.IsAttacking)
        {
            console.log(`[TS_PlayerCharacter::TsProcessComboAttack] ${ENetRole[Authority]} 正在攻击中，无法执行新的攻击！`);
            return;
        }

        // 设置攻击状态
        this.IsAttacking = true;
        setTimeout(()=>{
            this.IsAttacking = false;
        }, this.AttackInterval * 1000);

        console.log(`[TS_PlayerCharacter::TsProcessComboAttack] ${ENetRole[Authority]} 发起攻击！`);

        // 检查范围内敌人
        this.CheckEnemyInRange();
        // 播放攻击动画
        this.PlayMontage();
    }

    /**
     * 检查范围内敌人 部分代码不好实现，写在C++中
     */
    @ufunction.ufunction(ufunction.Server, ufunction.Reliable)
    CheckEnemyInRange():void
    {
        if (!this.HasAuthority())
        {
            return;
        }

        console.log(`[TS_PlayerCharacter::CheckEnemyInRange] 检查范围内敌人`);

        const HitResult:TArray<HitResult> = PvpBlueprintFunctionLibrary.CheckEnemyInRange(this, this.AttackRange);
        if (HitResult.Num() > 0)
        {
            console.log(`[TS_PlayerCharacter::CheckEnemyInRange] 发现敌人: ${HitResult.Num()}`);
        }

        // TODO: 处理攻击逻辑  由固定的组件完成
        for (let hitResultElement of HitResult) 
        {
            const HitActor = hitResultElement.GetActor();
            
            // 先不严谨的处理一下吧
            const Enemy = HitActor as TS_PlayerCharacter;
            if (Enemy)
            {
                console.log(`[TS_PlayerCharacter::CheckEnemyInRange] 攻击敌人: ${Enemy.NetDriverName}`);
                Enemy.ApplyDamage(10);
                Enemy.OnRep_CurrentHealth(Enemy.CurrentHealth);
            }
        }
    }

    /**
     * 播放Montage - NetMulticast版本，所有客户端执行
     */
    @ufunction.ufunction(ufunction.NetMulticast, ufunction.Reliable)
    MulticastPlayMontage():void
    {
        // console.log(`[TS_PlayerCharacter::MulticastPlayMontage] 客户端播放动画，LocalRole: ${ENetRole[this.GetLocalRole()]}`);

        // 获取动画实例
        const SkeletalMesh = this.GetComponentByClass(SkeletalMeshComponent.StaticClass()) as SkeletalMeshComponent;
        if (!SkeletalMesh)
        {
            console.error(`[TS_PlayerCharacter::MulticastPlayMontage] 未找到SkeletalMeshComponent`);
            return;
        }

        const AnimationInstance = SkeletalMesh.GetAnimInstance();
        if (!AnimationInstance)
        {
            console.error(`[TS_PlayerCharacter::MulticastPlayMontage] 未找到动画实例`);
            return;
        }

        if (!this.ComboAttackMontage)
        {
            console.error(`[TS_PlayerCharacter::MulticastPlayMontage] 未找到Montage, 无法播放`);
            return;
        }
        
        // 播放 Montage
        const PlayRate = 1.0;
        const bPlaying = AnimationInstance.Montage_Play(this.ComboAttackMontage, PlayRate);
        // console.log(`[TS_PlayerCharacter::MulticastPlayMontage] Montage_Play 结果: ${bPlaying > 0}`);
        
        if (bPlaying) 
        {
            AnimationInstance.Montage_JumpToSection(`Melee01`, this.ComboAttackMontage);
        }
    }

    /**
     * 播放Montage - 服务器入口点
     */
    @ufunction.ufunction()
    PlayMontage():void
    {
        if (!this.HasAuthority()) 
        {
            console.log(`[TS_PlayerCharacter::PlayMontage] 没有权限`);
            return;
        }

        // console.log(`[TS_PlayerCharacter::PlayMontage] 服务器播放蒙太奇`);
        // 同步蒙太奇
        this.MulticastPlayMontage();
    }
    
    /**
     * 应用伤害
     * @param Damage 
     * @param DamageEvent 
     * @param DamageCauser 
     */
    @ufunction.ufunction()
    ApplyDamage(Damage: number):void
    {
        if (!this.HasAuthority())
        {
            console.log(`[TS_PlayerCharacter::ApplyDamage] 没有权限`);
            return;
        }
        
        // console.log(`[TS_PlayerCharacter::ApplyDamage] 应用伤害: ${Damage}`);
        this.CurrentHealth = Math.max(1, this.CurrentHealth - Damage);
        console.log(`[TS_PlayerCharacter::ApplyDamage] ${this.NetDriverName}当前生命: ${this.CurrentHealth}`);
    }
    
    public GetCurrentHealth(): number
    {
        return this.CurrentHealth;
    }
    
    public GetMaxHealth(): number
    {
        return this.MaxHealth;
    }
}

export default TS_PlayerCharacter;