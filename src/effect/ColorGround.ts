// Liberapp 2019 - Tahiti Katagai
// サイケ背景

class ColorGround extends GameObject{

    tex:egret.Bitmap;

    tweens:egret.Tween[] = [];

    constructor( tex:string ) {
        super();

        this.tex = Util.newBitmap( tex, Util.w(rand01()), Util.h(rand01()*0.6), 700 );
        GameObject.gameDisplay.addChild( this.tex );


        this.setMoveX();
        this.setMoveY();
       this.setAlpha();
    }

    onDestroy(){
        if( this.tex ) this.tex.parent.removeChild( this.tex );
    }

    setMoveX(){
        this.tweens[0] = egret.Tween.get(this.tex, {loop:false})
            .to({x:Util.w( randF( 0.1, 0.9 ) )}, 5000 )
            .call( ()=>{ this.setMoveX() } )
    }
    setMoveY(){
        this.tweens[1] = egret.Tween.get(this.tex,{loop:false})
            .to({y:Util.h( randF( 0.0, 0.6 ) )}, 5000 )
            .call( ()=>{ this.setMoveY() } )
    }

    setAlpha(){
        egret.Tween.get(this.tex,{loop:true})
            .set({alpha:0.2}, 0)
            .to({alpha:0.7}, randF( 3000, 8000 ))
            .to({alpha:0.2}, randF( 3000, 8000 ))
    }

    update() {

    }
}
