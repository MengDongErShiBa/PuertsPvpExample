import * as UE from "ue";

class TS_PlayerCharacter extends UE.Character {
    @UE.uproperty.uproperty(UE.uproperty.BlueprintReadOnly, "Category=Combat")
    @UE.rpc.flags(UE.rpc.PropertyFlags.CPF_RepNotify)
    private currentHealth: number = 1000000;

    @UE.uproperty.uproperty(UE.uproperty.BlueprintReadOnly, "Category=Combat")
    @UE.rpc.flags(UE.rpc.PropertyFlags.CPF_Net)
    private maxHealth: number = 1000000;

    constructor() {
        super();
        this.bReplicates = true;
    }

    ReceiveAnyDamage(
        damage: number,
        damageType: UE.DamageType,
        instigatedBy: UE.Controller,
        damageCauser: UE.Actor
    ): void {
        if (!this.HasAuthority()) {
            return;
        }

        this.applyDamageInternal(damage);
    }

    @UE.ufunction.ufunction()
    private OnRep_currentHealth(): void {
        this.handleHealthChanged();
    }

    @UE.ufunction.ufunction(UE.ufunction.BlueprintCallable, UE.ufunction.BlueprintPure)
    public getCurrentHealth(): number {
        return this.currentHealth;
    }

    @UE.ufunction.ufunction(UE.ufunction.BlueprintCallable, UE.ufunction.BlueprintPure)
    public getMaxHealth(): number {
        return this.maxHealth;
    }

    @UE.ufunction.ufunction(UE.ufunction.BlueprintCallable)
    public requestApplyDamage(damage: number): void {
        if (this.HasAuthority()) {
            this.applyDamageInternal(damage);
            return;
        }

        this.serverApplyDamage(damage);
    }

    @UE.ufunction.ufunction(UE.ufunction.Server, UE.ufunction.Reliable)
    public serverApplyDamage(damage: number): void {}

    public serverApplyDamage_Implementation(damage: number): void {
        this.applyDamageInternal(damage);
    }

    @UE.ufunction.ufunction(UE.ufunction.BlueprintImplementableEvent)
    protected onHealthChanged(currentHealth: number, maxHealth: number): void {}

    @UE.ufunction.ufunction(UE.ufunction.BlueprintImplementableEvent)
    protected onDeath(): void {}

    private applyDamageInternal(damage: number): void {
        const nextHealth = Math.max(0, Math.min(this.maxHealth, this.currentHealth - damage));
        if (nextHealth === this.currentHealth) {
            return;
        }

        this.currentHealth = nextHealth;
        this.handleHealthChanged();
    }

    private handleHealthChanged(): void {
        this.onHealthChanged(this.currentHealth, this.maxHealth);

        if (this.currentHealth <= 0) {
            this.onDeath();
        }
    }
}

export default TS_PlayerCharacter;