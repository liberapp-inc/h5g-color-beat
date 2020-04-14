// Liberapp 2020 - Tahiti Katagai
// ゲーム

const SaveKeyBestScore = "colortiles-bestScore";
const DefaultBestScore = 50;

const FPS = 60;

const BACK_COLOR = 0x000000;    // index.htmlで設定
const FONT_COLOR = 0xff80e0;
const FONT2_COLOR = 0xf080ff;

const GameSpeedMinPH = 1/(FPS*4);
const GameSpeedMaxPH = 1/FPS;

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

    static addTouchEvent:boolean = false;

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

        if( Game.addTouchEvent == false ){
            Game.addTouchEvent = true;
            GameObject.gameDisplay.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e: egret.TouchEvent) => this.touchBegin(e), this);
            GameObject.gameDisplay.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, (e: egret.TouchEvent) => this.touchMove(e), this);
            GameObject.gameDisplay.stage.addEventListener(egret.TouchEvent.TOUCH_END, (e: egret.TouchEvent) => this.touchEnd(e), this);
        }
    }

	onDestroy(){
        Game.I = null;
        // remove しても削除できない Egretのバグぽい
        // GameObject.gameDisplay.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, (e: egret.TouchEvent) => this.touchBegin(e), this);
        // GameObject.gameDisplay.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, (e: egret.TouchEvent) => this.touchMove(e), this);
        // GameObject.gameDisplay.stage.removeEventListener(egret.TouchEvent.TOUCH_END, (e: egret.TouchEvent) => this.touchEnd(e), this);
    }

	update(){
        if( GameOver.I != null ) return;

        // this.touchUpdate();

        const levelMaxSec = 50;
        this.speedRate += 1 / FPS / levelMaxSec;
        this.speed = Util.h( Util.lerp( GameSpeedMinPH, GameSpeedMaxPH, this.speedRate ) );
        this.progress += this.speed;

        if( this.nextLine <= this.progress ){
            new TempoLine( -0.5 * this.noteSize );
            this.nextLine += 4 * this.noteSize;
        }

        if( this.speedPeriod <= this.speedRate ){
            if( Tile.tiles.length == 0 ){
                this.speedRate = Util.clamp01( this.speedRate - 0.35 );
                this.speedPeriod = Util.clamp01( this.speedPeriod + 0.1 );
                this.nextNote += this.noteSize * 4 * 4;
            }
            return;
        }

        if( this.nextNote <= this.progress ){
            let lane = randI( 0, 3+1 );
            let x = Util.w(0.5) + (lane-1.5) * this.noteSize;
            let y = -0.5 * this.noteSize;
            new Tile( x, y );
            this.nextNote += randI( 1, 4+1 ) * this.noteSize;

            if( randBool(0.2) ){
                lane = (lane + randI( 1, 2+1 )) % 3;
                x = Util.w(0.5) + (lane-1.5) * this.noteSize;
                y = -0.5 * this.noteSize;
                new Tile( x, y );
                this.nextNote += randI( 1, 4+1 ) * this.noteSize;
            }
        }
	}

    touchBegin(e:egret.TouchEvent){
        if( GameOver.I != null ) return;
        Tile.checkTouch( e.localX, e.localY );
    }
    touchMove(e:egret.TouchEvent){
    }
    touchEnd(e:egret.TouchEvent){
    }
}

