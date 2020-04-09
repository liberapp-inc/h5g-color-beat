// Liberapp 2020 - Tahiti Katagai
// ゲーム

const SaveKeyBestScore = "beattiles-bestScore";
const DefaultBestScore = 50;

const BACK_COLOR = 0x000000;    // index.htmlで設定
const FONT_COLOR = 0xff80e0;
const FONT2_COLOR = 0xf080ff;

const GameSpeedLowPH = 1/200;
const GameSpeedTopPH = 1/100;

class Game extends GameObject{

    static I:Game;

    counter:number = 0;

    length:number = 0;
    speedMax:number;
    speed:number;
    next:number = 0;

    private localTouchBegan:boolean = false;
    press:boolean = false;
    touch:boolean = false;
    tapX:number = 0;
    tapY:number = 0;

    constructor() {
        super();
        Game.I = this;
        this.speedMax = this.speed = Util.h( GameSpeedLowPH );

        GameObject.gameDisplay.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e: egret.TouchEvent) => this.touchBegin(e), this);
        GameObject.gameDisplay.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, (e: egret.TouchEvent) => this.touchMove(e), this);
        GameObject.gameDisplay.stage.addEventListener(egret.TouchEvent.TOUCH_END, (e: egret.TouchEvent) => this.touchEnd(e), this);
    }

	onDestroy(){
        Game.I = null;
        GameObject.gameDisplay.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, (e: egret.TouchEvent) => this.touchBegin(e), this);
        GameObject.gameDisplay.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, (e: egret.TouchEvent) => this.touchMove(e), this);
        GameObject.gameDisplay.stage.removeEventListener(egret.TouchEvent.TOUCH_END, (e: egret.TouchEvent) => this.touchEnd(e), this);
    }

    touchBegin(e:egret.TouchEvent){
        Tile.checkTouch( e.localX, e.localY );

        this.localTouchBegan = 
        this.press = 
        this.touch = true;
        this.tapX = e.localX;
        this.tapY = e.localY;
    }
    touchMove(e:egret.TouchEvent){
        this.tapX = e.localX;
        this.tapY = e.localY;
    }
    touchEnd(e:egret.TouchEvent){
        this.touch = false;
    }
    touchUpdate(){
        if( this.localTouchBegan ){
            this.localTouchBegan = false;
        }else{
            this.press = false;
        }
    }

	update(){
        if( GameOver.I != null ) return;

        this.counter++;
        this.touchUpdate();
        const speedRate = Util.clamp01( this.counter / (60 * 120) );
        const speed = Util.h( Util.lerp( GameSpeedLowPH, GameSpeedTopPH, speedRate ) );
        this.length += this.speed;
        this.speed += Util.clamp( speed - this.speed, -speed/20, speed/20 );

        if( this.next <= this.length ){
            const w = Util.w(TilePerW);
            const lane = randI( 0, 3+1 );
            let x = Util.w(0.5) + (lane-1.5) * w;
            let y = -0.5 * w;

            // if( randBool( 0.8 ) ){
                new Tile( x, y );
                this.next += randI( 1, 4+1 ) * w;
            // }else{
            //     if( randBool( 0.7 ) ){
                    // new TileLong( x, y );
                    // this.next += TileLongLength * w;
            //     }else{
            //         new TileBig( x, y - w*0.5 );
            //         this.next += randI( 2, 5+1 ) * w;
            //     }
            // }
        }
	}
}

