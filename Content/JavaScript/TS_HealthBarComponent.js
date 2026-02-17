"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ue_1 = require("ue");
class TS_HealthBarComponent extends ue_1.WidgetComponent {
    OwnerCharacter;
    HealthBarWidget;
    constructor() {
        super();
    }
    ReceiveBeginPlay() {
        console.log(`[TS_HealthBarComponent::ReceiveBeginPlay]`);
        this.OwnerCharacter = this.GetOwner();
        this.HealthBarWidget = this.GetWidget();
        // 初始化进度条
        this.OnHealthChanged(this.OwnerCharacter.GetCurrentHealth());
    }
    OnHealthChanged(CurrentHealth) {
        // console.log(`[TS_HealthBarComponent::OnHealthChanged] ${this.OwnerCharacter}:${CurrentHealth}`);
        if (this.OwnerCharacter) {
            // 获取最大血量
            const MaxHealth = this.OwnerCharacter.GetMaxHealth();
            const CurrentHealth = this.OwnerCharacter.GetCurrentHealth();
            const Percent = CurrentHealth / MaxHealth;
            if (this.HealthBarWidget) {
                const HealthBarWidget = this.HealthBarWidget;
                HealthBarWidget.HealthBar.SetPercent(Percent);
                console.log(`[TS_HealthBarComponent::OnHealthChanged] 设置进度条:${Percent}`);
            }
            else {
                console.log(`[TS_HealthBarComponent::OnHealthChanged] 没有找到HealthBarWidget`);
            }
        }
        else {
            console.log(`[TS_HealthBarComponent::OnHealthChanged] 没有找到OwnerCharacter`);
        }
    }
}
exports.default = TS_HealthBarComponent;
//# sourceMappingURL=TS_HealthBarComponent.js.map