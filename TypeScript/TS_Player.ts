import * as UE from 'ue'

class TS_Player extends UE.Character {
    
    StaticMesh: UE.StaticMesh;

    ReceiveBeginPlay(): void
    {
        super.ReceiveBeginPlay();
        
        console.log("TS_Player ReceiveBeginPlay");
    }

    Test(): void
    {
        console.log("TS_Player Test");
    }
}

export default TS_Player;