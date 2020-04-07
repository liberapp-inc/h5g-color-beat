// Liberapp 2020 - Tahiti Katagai
// 基準ライン

const LineColor = 0xff40d0;
const BaseLineY = 1024*0.7;

class BaseLine extends GameObject{

    constructor() {
        super();

        this.setShape( BaseLineY );
    }

    onDestroy(){
    }

    setShape(y:number){
        this.display = new egret.Shape();
        GameObject.gameDisplay.addChild(this.display);
        let shape = this.display as egret.Shape;
        shape.graphics.lineStyle( 10, TileColor0);
        shape.graphics.lineTo( 0, y );
        shape.graphics.lineTo( Util.w(1), y );
        shape.graphics.lineStyle( 3, 0xffffff);
        shape.graphics.lineTo( 0, y );
        shape.graphics.lineTo( Util.w(1), y );
    }

    update() {
    }

}

