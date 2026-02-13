"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const UE = require("ue");
class TS_PlayerCharacter extends UE.Character {
    currentHealth = 1000000;
    maxHealth = 1000000;
    constructor() {
        super();
        this.bReplicates = true;
    }
    ReceiveAnyDamage(damage, damageType, instigatedBy, damageCauser) {
        if (!this.HasAuthority()) {
            return;
        }
        this.applyDamageInternal(damage);
    }
    OnRep_currentHealth() {
        this.handleHealthChanged();
    }
    getCurrentHealth() {
        return this.currentHealth;
    }
    getMaxHealth() {
        return this.maxHealth;
    }
    requestApplyDamage(damage) {
        if (this.HasAuthority()) {
            this.applyDamageInternal(damage);
            return;
        }
        this.serverApplyDamage(damage);
    }
    serverApplyDamage(damage) { }
    serverApplyDamage_Implementation(damage) {
        this.applyDamageInternal(damage);
    }
    onHealthChanged(currentHealth, maxHealth) { }
    onDeath() { }
    applyDamageInternal(damage) {
        const nextHealth = Math.max(0, Math.min(this.maxHealth, this.currentHealth - damage));
        if (nextHealth === this.currentHealth) {
            return;
        }
        this.currentHealth = nextHealth;
        this.handleHealthChanged();
    }
    handleHealthChanged() {
        this.onHealthChanged(this.currentHealth, this.maxHealth);
        if (this.currentHealth <= 0) {
            this.onDeath();
        }
    }
}
__decorate([
    UE.uproperty.uproperty(UE.uproperty.BlueprintReadOnly, "Category=Combat"),
    UE.rpc.flags(UE.rpc.PropertyFlags.CPF_RepNotify)
], TS_PlayerCharacter.prototype, "currentHealth", void 0);
__decorate([
    UE.uproperty.uproperty(UE.uproperty.BlueprintReadOnly, "Category=Combat"),
    UE.rpc.flags(UE.rpc.PropertyFlags.CPF_Net)
], TS_PlayerCharacter.prototype, "maxHealth", void 0);
__decorate([
    UE.ufunction.ufunction()
], TS_PlayerCharacter.prototype, "OnRep_currentHealth", null);
__decorate([
    UE.ufunction.ufunction(UE.ufunction.BlueprintCallable, UE.ufunction.BlueprintPure)
], TS_PlayerCharacter.prototype, "getCurrentHealth", null);
__decorate([
    UE.ufunction.ufunction(UE.ufunction.BlueprintCallable, UE.ufunction.BlueprintPure)
], TS_PlayerCharacter.prototype, "getMaxHealth", null);
__decorate([
    UE.ufunction.ufunction(UE.ufunction.BlueprintCallable)
], TS_PlayerCharacter.prototype, "requestApplyDamage", null);
__decorate([
    UE.ufunction.ufunction(UE.ufunction.Server, UE.ufunction.Reliable)
], TS_PlayerCharacter.prototype, "serverApplyDamage", null);
__decorate([
    UE.ufunction.ufunction(UE.ufunction.BlueprintImplementableEvent)
], TS_PlayerCharacter.prototype, "onHealthChanged", null);
__decorate([
    UE.ufunction.ufunction(UE.ufunction.BlueprintImplementableEvent)
], TS_PlayerCharacter.prototype, "onDeath", null);
exports.default = TS_PlayerCharacter;
//# sourceMappingURL=TS_PlayerCharacter.js.map