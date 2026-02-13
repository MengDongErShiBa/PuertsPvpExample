"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UE = require("ue");
class TS_LobbyGameMode extends UE.GameMode {
    playerCount = 0;
    targetMapPath = "/Game/_Game/Lvl_Combat.Lvl_Combat";
    constructor() {
        super();
        this.bUseSeamlessTravel = true;
    }
    K2_PostLogin(newPlayer) {
        super.K2_PostLogin(newPlayer);
        this.playerCount += 1;
        console.log("OnPostLogin", this.playerCount);
        this.tryStartGame();
    }
    K2_OnLogout(exiting) {
        super.K2_OnLogout(exiting);
        this.playerCount = Math.max(0, this.playerCount - 1);
        console.log("OnLogout", this.playerCount);
    }
    tryStartGame() {
        if (this.playerCount < 2) {
            console.log(`[TS_LobbyGameMode::TryStartGame] 不满足开始游戏条件 [${this.playerCount}]`);
            return;
        }
        const World = this.GetWorld();
        if (!World) {
            console.log(`[TS_LobbyGameMode::TryStartGame] 世界不存在`);
            return;
        }
        this.StartMatch();
        // 传送到对战关卡
    }
}
exports.default = TS_LobbyGameMode;
//# sourceMappingURL=TS_LobbyGameMode.js.map