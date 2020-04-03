// Liberapp 2020 - Tahiti Katagai
// タイル

const TilePerW = 0.20;
const TilePerH = 0.18;
const TileColor0 = 0xff40d0;
const TileColor1 = 0xd040ff;
const TileColor2 = 0x80ffe0;

class Tile extends GameObject{

    static tiles:Tile[] = [];
    static colors:number[] = [ TileColor0, TileColor1, TileColor2 ];

    sizeW:number;
    sizeH:number;
    color:number;

    constructor( x:number, y:number ) {
        super();

        Tile.tiles.push(this);
        this.sizeW = Util.w(TilePerW);
        this.sizeH = Util.h(TilePerH);
        this.color = Tile.colors[ randI( 0, Tile.colors.length ) ];
        this.setShape(x, y);
    }

    onDestroy(){
        Tile.tiles = Tile.tiles.filter( obj => obj != this );
    }

    setShape(x:number, y:number){
        this.display = new egret.Shape();
        GameObject.gameDisplay.addChild(this.display);
        let shape = this.display as egret.Shape;
        shape.x = x;
        shape.y = y;
        shape.graphics.lineStyle( 10, this.color );
        // shape.graphics.beginFill(TileColor);
        const s = this.sizeW;
        shape.graphics.drawRect(-0.5*s, -0.5*s, s, s );
        shape.graphics.lineStyle( 3, 0xffffff);
        shape.graphics.drawRect(-0.5*s, -0.5*s, s, s );
        // shape.graphics.endFill();
        shape.rotation = 45;
    }

    update() {
        if( GameOver.I ) return;
        
        if( this.checkTouch() ) {
            this.defeated();
            return;
        }

        this.Y += Game.I.speed;

        // 通過みのがし
        if( this.checkFall() ){
            new GameOver();
            // this.destroy();
        }
    }

    checkTouch():boolean {
        if( Game.I.press ){
            if( (Game.I.tapX - this.X ) ** 2 < (this.sizeW*0.6) ** 2 &&
                (Game.I.tapY - this.Y ) ** 2 < (this.sizeH*0.6) ** 2 ){
                return true;
            }
        }
    }
    checkFall():boolean{
        // return ( this.Y >= Util.height + this.sizeH * 0.5 );
        return this.Y > Util.height;
    }

    defeated(){
        this.destroy();
        SoundEffect.I.play( randI( 0, 6 ) );
        Score.I.addPoint(10);
        for( let i=0 ; i<4 ; i++ ){
            // new Debris( this.X, this.Y );
            let vx = randF( -1, +1 ) * 20;
            let vy = randF( -1, +1 ) * 20;
            let s = this.sizeW * randF( 0.2, 1.0 );
            new EffectFrame( this.X + vx, this.Y + vy, s, s, this.color, 0.7, 1/4, 1/8, vx, vy );
        }
    }
}

