"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UE = require("ue");
class TS_Player extends UE.Character {
    StaticMesh;
    ReceiveBeginPlay() {
        super.ReceiveBeginPlay();
        console.log("TS_Player ReceiveBeginPlay");
    }
    Test() {
        console.log("TS_Player Test");
    }
}
exports.default = TS_Player;
//# sourceMappingURL=TS_Player.js.map