// Liberapp 2020 - Tahiti Katagai
// タイルロング

const TileLongLength = 3;

class TileLong extends Tile{

    sizeH:number;
    length:number = TileLongLength;

    constructor( x:number, y:number ) {
        super( x, y, false );

        this.setShape();
        this.sizeH = this.size * this.length;
        this.Y += this.size*0.5;    // top
        this.Y -= this.sizeH*0.5;   // to center

        // this.display.scaleX = 0.8;
        // this.display.scaleY = this.length;
        // this.display.rotation = 0;
    }

    setShape(){
        this.display = new egret.Shape();
        GameObject.gameDisplay.addChild(this.display);
        let shape = this.display as egret.Shape;
        shape.graphics.lineStyle( 10, this.color );
        // shape.graphics.beginFill(TileColor);
        const s = this.size;
        shape.graphics.drawRect(-0.5*s, -0.5*s, s, s );
        shape.graphics.lineStyle( 3, 0xffffff);
        shape.graphics.drawRect(-0.5*s, -0.5*s, s, s );
        // shape.graphics.endFill();
        shape.rotation = 45;
    }
    
    update() {
        if( GameOver.I ) return;
        
        this.display.anchorOffsetX *= 0.5;
        this.display.anchorOffsetY *= 0.5;

        if( this.checkTouching() ) {
            this.sizeH -= Game.I.speed;
            this.display.scaleY -= Game.I.speed / Util.h(TilePerW);
            this.Y -= Game.I.speed / 2;
            if( this.sizeH <= Util.h(TilePerW*1.5) ){
                this.defeated();
                return;
            }
            if( Game.I.counter % 3 == 0 ){
                Score.I.addPoint(1);
        SoundEffect.I.play( randI( 0, 6 ) );
                this.display.anchorOffsetX = randF(-6,+6);
                this.display.anchorOffsetY = randF(-5,+5);
            }
            new Debris( this.X + randF(-this.size*0.5, this.size*0.5), this.Y + this.sizeH*0.5 );
        }

        this.Y += Game.I.speed;

        // 通過みのがし
        if( this.checkFall() ){
            new GameOver();
            // this.destroy();
        }
    }

    checkTouching():boolean {
        if( Game.I.touch ){
            if( (Game.I.tapX - this.X ) ** 2 < (this.size*0.6) ** 2 &&
                (Game.I.tapY - this.Y ) ** 2 < (this.sizeH*0.6) ** 2 ){
                return true;
            }
        }
    }
}

