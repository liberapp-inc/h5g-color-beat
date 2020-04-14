// Liberapp 2020 - Tahiti Katagai
// color beat

class Main extends eui.UILayer {

    public constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
    }
 
    private async addToStage() {
        await this.loadResource();

        Util.initial( this );
        GameObject.initial( this.stage );
        // PhysicsObject.prepare( PIXEL_PER_METER );
        Camera2D.initial();

        SceneTitle.loadScene();
        egret.startTick(this.tickLoop, this);
    }

    private async loadResource() {
        try {
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("preload", 0);
        }
        catch (e) {
            console.error(e);
        }
    }

    tickLoop(timeStamp:number):boolean{
        this.updateAverageFrame( timeStamp );

        // PhysicsObject.progress();
        GameObject.process();
        Camera2D.process();
        return false;
    }


    updateAverageFrame( timeStamp:number ){
        if( this.lastTimeStamp != 0 ){
            let span = (timeStamp - this.lastTimeStamp) / 1000 / (1/FPS);
            Main.averageFrame = Util.lerp( Main.averageFrame, span, 0.2 );
            console.log( "ta=" + Main.averageFrame );
        }
        this.lastTimeStamp = timeStamp;
    }
    lastTimeStamp:number = 0;
    static averageFrame:number = 1.0; // 1.0=60fps (2.0=30fps)
}

