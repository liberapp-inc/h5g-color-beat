// Liberapp 2020 - Tahiti Katagai
// 破片

const DebrisPerW = 0.1;
const DebrisPerH = 0.1;
const DebrisColor = 0x000000;
const DebrisVPerW = 0.06;
const DebrisVR = 20;

class Debris extends GameObject{

    vx:number;
    vy:number;
    vr:number;

    constructor( x:number, y:number ) {
        super();

        let range = Util.w(DebrisVPerW);
        this.vx = randF( -range, +range );
        this.vy = randF( -range, +range );
        this.vr = randF( -DebrisVR, DebrisVR );
        this.setShape(x, y);
    }

    onDestroy(){
    }

    setShape(x:number, y:number){
        this.display = new egret.Shape();
        GameObject.gameDisplay.addChild(this.display);
        let shape = this.display as egret.Shape;
        shape.x = x;
        shape.y = y;
        shape.graphics.beginFill(TileColor0);
        const w = Util.w( randF(DebrisPerW/4, DebrisPerW) );
        const h = Util.h( randF(DebrisPerH/4, DebrisPerH) );
        shape.graphics.drawRect(-0.5*w, -0.5*h, w, h );
        shape.graphics.endFill();
    }

    update() {
        this.vy += Util.h(0.001);
        this.X += this.vx;
        this.Y += this.vy;
        this.display.rotation += this.vr;

        if( this.Y > Util.height ){
            this.destroy();
        }
    }
}
