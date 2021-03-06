// Liberapp 2020 - Tahiti Katagai
// タイル

const TilePerW = 0.15;
const TileColor0 = 0xff40d0;
const TileColor1 = 0xd040ff;
const TileColor2 = 0x00ff90;
const TileColor3 = 0xff9000;
const TileColor4 = 0x0090ff;

class Tile extends GameObject{

    static tiles:Tile[] = [];
    static colors:number[] = [ TileColor0, TileColor1, TileColor2, TileColor3, TileColor4 ];

    size:number;
    radiusSqr:number;
    color:number;

    constructor( x:number, y:number, flagShape:boolean = true ) {
        super();

        Tile.tiles.push(this);
        this.size = Util.w(TilePerW);
        const marginRate = 2.5;
        this.radiusSqr = (this.size * 0.5 * marginRate) ** 2;
        this.color = Tile.colors[ randI( 0, Tile.colors.length ) ];
        if( flagShape )
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
        const s = this.size * (2/3);
        shape.graphics.drawRect(-0.5*s, -0.5*s, s, s );
        shape.graphics.lineStyle( 3, 0xffffff);
        shape.graphics.drawRect(-0.5*s, -0.5*s, s, s );
        shape.rotation = 45;
    }

    update() {
        if( GameOver.I != null ) return;
        
        this.Y += Game.I.speed;

        // 通過みのがし
        if( this.checkFall() ){
            new GameOver();
        }
    }

    static checkTouch( x:number, y:number ):boolean {
        let target = null;
        let ndd = 1024 ** 2;

        for( let i=0 ; i<Tile.tiles.length ; i++ ){
            const t = Tile.tiles[ i ];
            let dd = (t.X - x) ** 2 + (t.Y - y) ** 2;
            if( dd <= t.radiusSqr ){
                if( ndd > dd ){
                    ndd = dd;
                    target = t;
                }
            }
        }
        if( target ){
            target.defeated();
            return true;
        }
        return false;
    }

    checkFall():boolean{
        // return ( this.Y > Util.height + this.size );
        return ( this.Y > Util.height );
    }

    defeated(){
        this.destroy();
        SoundEffect.I.play( randI( 0, 6 ) );

        Score.I.addPoint( this.getPoint( this.Y ) );

        let count = ( Main.averageFrame < 1.2 ) ? 3 : 1;
        for( let i=0 ; i<count ; i++ ){
            // new Debris( this.X, this.Y );
            let vx = randF( -1, +1 ) * 25;
            let vy = randF( -1, +1 ) * 25;
            let s = this.size * randF( 0.2, 1.0 );
            new EffectFrame( this.X + vx, this.Y + vy, s, s, this.color, 0.7, 1/4, 1/8, vx, vy );
        }
    }

    getPoint( y:number ){
        let d = Math.abs( BaseLineY - y );

        if( d <= 32 )  return Beat.Perfect;
        if( d <= 64 )  return Beat.Great;
        return Beat.Good;
    }
}

