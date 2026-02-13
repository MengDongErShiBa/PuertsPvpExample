import * as UE from 'ue'

class TsActor extends UE.Actor {

    StaticMesh: UE.StaticMesh;
    TestMesh: UE.StaticMesh;
    
    Test():void
    {
        console.log("TsActor Test");
    }
}

export default TsActor;