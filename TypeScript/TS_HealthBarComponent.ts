import {UserWidget, WidgetComponent} from "ue";
import TS_PlayerCharacter from "./TS_PlayerCharacter";

class TS_HealthBarComponent extends WidgetComponent
{
    OwnerCharacter: TS_PlayerCharacter;
    HealthBarWidget: UserWidget;
    
    constructor() 
    {
        super();
    }
    
    ReceiveBeginPlay(): void
    {
        console.log(`[TS_HealthBarComponent::ReceiveBeginPlay]`);
        
        this.OwnerCharacter = this.GetOwner() as TS_PlayerCharacter;
        this.HealthBarWidget = this.GetWidget();
        
        // 初始化进度条
        this.OnHealthChanged(this.OwnerCharacter.GetCurrentHealth());
    }
    
    OnHealthChanged(CurrentHealth: number): void 
    {
        console.log(`[TS_HealthBarComponent::OnHealthChanged] ${this.OwnerCharacter}:${CurrentHealth}`);
        
        if (this.OwnerCharacter)
        {
            // 获取最大血量
            const MaxHealth = this.OwnerCharacter.GetMaxHealth();
            const CurrentHealth = this.OwnerCharacter.GetCurrentHealth();
            const Percent = CurrentHealth / MaxHealth;
            
            if (this.HealthBarWidget)
            {
                const HealthBarWidget = this.HealthBarWidget as any;
                HealthBarWidget.HealthBar.SetPercent(Percent);
                console.log(`[TS_HealthBarComponent::OnHealthChanged] ${this.OwnerCharacter}:${Percent}`);
            }
            else
            {
                console.log(`[TS_HealthBarComponent::OnHealthChanged] 没有找到HealthBarWidget`);
            }
        }
        else
        {
            console.log(`[TS_HealthBarComponent::OnHealthChanged] 没有找到OwnerCharacter`);
        }
    }
    
}

export default TS_HealthBarComponent;