import * as UE from "ue";

class TS_Player extends UE.Character{
    
    StaticMesh:UE.StaticMeshComponent;
    
    ReceiveBeginPlay():void
    {
        console.log("我被激活了");
    }
    
    ReceiveTick(DeltaTime: number):void
    {
        console.log("我被更新了");
    }
}

export default TS_Player;