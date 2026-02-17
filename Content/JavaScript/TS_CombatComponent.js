"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ue_1 = require("ue");
class TS_CombatComponent extends ue_1.ActorComponent {
    OwnerCharacter;
    ReceiveBeginPlay() {
        console.log(`[TS_CombatComponent::ReceiveBeginPlay]`);
        this.OwnerCharacter = this.GetOwner();
    }
    
    ApplyDamage(Damage) {
        console.log(`[TS_CombatComponent::OnTakeAnyDamage] ${Damage}`);
        // 检查权限
        if (!this.OwnerCharacter.HasAuthority()) {
            console.log(`[TS_CombatComponent::OnTakeAnyDamage] 没有权限`);
            return;
        }
        if (!this.OwnerCharacter) {
            console.log(`[TS_CombatComponent::OnTakeAnyDamage] OwnerCharacter is null`);
            return;
        }
        this.OwnerCharacter.ApplyDamage(Damage);
    }
}
__decorate([
    ue_1.ufunction.ufunction()
], TS_CombatComponent.prototype, "ApplyDamage", null);
exports.default = TS_CombatComponent;
//# sourceMappingURL=TS_CombatComponent.js.map