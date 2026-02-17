import {UserWidget, WidgetComponent} from "ue";
import TS_PlayerCharacter from "./TS_PlayerCharacter";

class TS_HealthBarComponent extends WidgetComponent
{
    OwnerCharacter: TS_PlayerCharacter;
    ReceiveBeginPlay(): void
    {
        console.log(`[TS_HealthBarComponent::ReceiveBeginPlay]`);
        
        this.OwnerCharacter = this.GetOwner() as TS_PlayerCharacter;
    }
    
    OnHealthChanged(CurrentHealth: number): void 
    {
        console.log(`[TS_HealthBarComponent::OnHealthChanged] ${CurrentHealth}`);
        
        if (this.OwnerCharacter)
        {
            // 获取最大血量
            const MaxHealth = this.OwnerCharacter.GetMaxHealth();
            const CurrentHealth = this.OwnerCharacter.GetCurrentHealth();
            const Percent = CurrentHealth / MaxHealth;
            
            // TODO: 更新UI
            
            console.log(`[TS_HealthBarComponent::OnHealthChanged] ${Percent}`);
        }
    }
    
}

export default TS_HealthBarComponent;