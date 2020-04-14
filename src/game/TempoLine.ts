// Liberapp 2020 - Tahiti Katagai
// テンポライン

const TempoLineColor = 0xff40d0;

class TempoLine extends GameObject{

    constructor( y:number ) {
        super();
        this.setShape();
        this.Y = y;
    }

    onDestroy(){
    }

    setShape(){
        this.display = new egret.Shape();
        GameObject.gameDisplay.addChild(this.display);
        let shape = this.display as egret.Shape;
        shape.graphics.lineStyle( 3, 0x00a0a0);
        shape.graphics.lineTo( 0, 0 );
        shape.graphics.lineTo( Util.w(1), 0 );
    }

    update() {
        this.Y += Game.I.speed;

        if( this.Y > Util.height ){
            this.destroy();
        }
    }
}

