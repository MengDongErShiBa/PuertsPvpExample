"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ue_1 = require("ue");
class TS_HealthBar extends ue_1.TSWidgetPrivate {
    Widget;
    constructor() {
        super();
    }
    SetupUI(UI) {
        super.SetupUI(UI);
        this.Widget = UI;
    }
    /**'
     * 设置进度条
     */
    SetProgress(Progress) {
        this.Widget.HealthBar.SetPercent(Progress);
    }
}
exports.default = TS_HealthBar;
//# sourceMappingURL=TS_HealthBar.js.map