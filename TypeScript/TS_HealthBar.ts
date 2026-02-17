import * as UE from "ue";
import {Game, TSWidgetPrivate} from "ue";
import {$Nullable} from "puerts";

type UMGClass = Game.Blueprints.TSWidget.WBP_HealthBar.WBP_HealthBar_C;
class TS_HealthBar extends TSWidgetPrivate
{
    Widget: UMGClass;
    
    constructor() 
    {
        super();
    }
    
    SetupUI(UI: $Nullable<UE.UserWidget>) 
    {
        super.SetupUI(UI);
        this.Widget = UI as UMGClass;
    }

    /**'
     * 设置进度条
     */
    SetProgress(Progress: number) 
    {
        this.Widget.HealthBar.SetPercent(Progress);
    }
}

export default TS_HealthBar;