// Liberapp 2020 - Tahiti Katagai
// ゲーム

const SaveKeyBestScore = "beattiles-bestScore";
const DefaultBestScore = 50;

const BACK_COLOR = 0x000000;    // index.htmlで設定
const FONT_COLOR = 0xff80e0;
const FONT2_COLOR = 0xf080ff;

const GameSpeedMinPH = 1/200;
const GameSpeedMaxPH = 1/50;

class Game extends GameObject{

    static I:Game;

    counter:number = 0;

    noteSize:number;

    minSpeed:number;
    maxSpeed:number;
    speedRate:number;
    speedPeriod:number;
    progress:number = 0;
    speed:number;
    nextNote:number = 0;
    nextLine:number = 0;

    private localTouchBegan:boolean = false;
    press:boolean = false;
    touch:boolean = false;
    tapX:number = 0;
    tapY:number = 0;

    constructor() {
        super();
        Game.I = this;
        this.noteSize = Util.w(TilePerW);
        this.minSpeed = Util.h( GameSpeedMinPH );
        this.maxSpeed = Util.h( GameSpeedMaxPH );
        this.speedRate = 0;
        this.speedPeriod = 0.2;
        this.progress = 0;
        this.speed = this.minSpeed;
        
        this.speed = Util.h( GameSpeedMinPH );

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

	update(){
        if( GameOver.I != null ) return;

        // this.touchUpdate();

        if( this.speedPeriod <= this.speedRate ){
            if( Tile.tiles.length == 0 ){
                this.speedRate = Util.clamp01( this.speedRate - 0.3 );
                this.speedPeriod = Util.clamp01( this.speedPeriod + 0.2 );
                this.nextNote += this.noteSize * 4 * 4;
            }
            return;
        }

        const levelMaxSec = 30;
        const fps = 60;
        this.speedRate += 1 / fps / levelMaxSec;
        this.speed = Util.h( Util.lerp( GameSpeedMinPH, GameSpeedMaxPH, this.speedRate ) );
        this.progress += this.speed;

        if( this.nextLine <= this.progress ){
            new TempoLine( -0.5 * this.noteSize );
            this.nextLine += 4 * this.noteSize;
        }
        if( this.nextNote <= this.progress ){
            const lane = randI( 0, 3+1 );
            let x = Util.w(0.5) + (lane-1.5) * this.noteSize;
            let y = -0.5 * this.noteSize;

            new Tile( x, y );
            this.nextNote += randI( 1, 4+1 ) * this.noteSize;

            // if( randBool( 0.8 ) ){
            //     new Tile( x, y );
            //     this.next += randI( 1, 4+1 ) * w;
            // }else{
            //     if( randBool( 0.7 ) ){
            //         new TileLong( x, y );
            //         this.next += TileLongLength * w;
            //     }else{
            //         new TileBig( x, y - w*0.5 );
            //         this.next += randI( 2, 5+1 ) * w;
            //     }
            // }
        }
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
}

