"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UE = require("ue");
class TS_Player extends UE.Character {
    StaticMesh;
    ReceiveBeginPlay() {
        console.log("我被激活了");
    }
    ReceiveTick(DeltaTime) {
        console.log("我被更新了");
    }
}
exports.default = TS_Player;
//# sourceMappingURL=TS_Player.js.map