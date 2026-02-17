"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ue_1 = require("ue");
class TS_HealthBarComponent extends ue_1.WidgetComponent {
    OwnerCharacter;
    ReceiveBeginPlay() {
        console.log(`[TS_HealthBarComponent::ReceiveBeginPlay]`);
        this.OwnerCharacter = this.GetOwner();
    }
    OnHealthChanged(CurrentHealth) {
        console.log(`[TS_HealthBarComponent::OnHealthChanged] ${CurrentHealth}`);
        if (this.OwnerCharacter) {
            // 获取最大血量
            const MaxHealth = this.OwnerCharacter.GetMaxHealth();
            const CurrentHealth = this.OwnerCharacter.GetCurrentHealth();
            const Percent = CurrentHealth / MaxHealth;
            // TODO: 更新UI
            console.log(`[TS_HealthBarComponent::OnHealthChanged] ${Percent}`);
        }
    }
}
exports.default = TS_HealthBarComponent;
//# sourceMappingURL=TS_HealthBarComponent.js.map