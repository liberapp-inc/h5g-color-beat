// Liberapp 2020 - Tahiti Katagai
// タイル大

const tileBigScale = 2;

class TileBig extends Tile{

    hp:number = 7;

    constructor( x:number, y:number ) {
        super( x, y );

        this.sizeW *= tileBigScale;
        this.sizeH *= tileBigScale;
        this.display.scaleX = this.display.scaleY = tileBigScale;
    }

    onDestroy(){
        Tile.tiles = Tile.tiles.filter( obj => obj != this );
    }

    update() {
        if( GameOver.I ) return;
        
        this.display.rotation *= 0.75;

        if( this.checkTouch() ) {
            if( (--this.hp) <= 0 ){
                this.defeated();
                return;
            }
            Score.I.addPoint(2);
            SoundEffect.I.play( randI( 0, 6 ) );
            Game.I.speed = 0;
            this.display.rotation = randI(-5,+5);
            for( let i=0 ; i<4 ; i++ ){
                new Debris( Game.I.tapX, Game.I.tapY );
            }
        }

        this.Y += Game.I.speed;

        // 通過みのがし
        if( this.checkFall() ){
            new GameOver();
            // this.destroy();
        }
    }
}

