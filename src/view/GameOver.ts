// Liberapp 2020 Tahiti Katagai
// ゲームオーバー表示

class GameOver extends GameObject{

    static I:GameOver = null;

    texts:egret.TextField[] = [];
    retryButton:Button = null;
    backButton:Button = null;
    step:number = 0;
    readonly fadeInFrame:number = 64;

    constructor() {
        super();

        GameOver.I = this;
        Game.I.speed = 0;

        this.texts[0] = Util.newTextField("SCORE : " + Score.I.point.toFixed(), Util.width / 12, FONT2_COLOR, 0.5, 0.3, true, false);
        egret.Tween.get(this.texts[0],{loop:false})
            .to({alpha:0}, 0)
            .to({alpha:1}, 1000)
        GameObject.baseDisplay.addChild( this.texts[0] );
    }

    onDestroy() {
        this.texts.forEach( text =>{ GameObject.baseDisplay.removeChild( text ); });
        this.texts = null;
        GameOver.I = null;
    }
    
    update() {
        this.step++;
        if( this.step == this.fadeInFrame ){
            this.retryButton = new Button("リトライ", Util.width/16, BACK_COLOR, 0.50, 0.55, 0.4, 0.1, FONT2_COLOR, 1.0, false, this.onTapRetry );
            this.backButton = new Button("<", Util.width/16, BACK_COLOR, 0.15, 0.10, 0.2, 0.1, FONT2_COLOR, 1.0, false, this.onTapBack );
            
            if( Score.I.point > Score.I.bestScore ){
                Util.setSaveDataNumber( SaveKeyBestScore, Score.I.point );
                this.texts[1] = Util.newTextField("NEW RECORD!", Util.width / 13, FONT2_COLOR, 0.5, 0.4, true, false);
                egret.Tween.get(this.texts[1],{loop:true})
                    .to({alpha:0}, 500)
                    .to({alpha:1}, 500)
                GameObject.baseDisplay.addChild( this.texts[1] );
            }
        }
     }

    onTapRetry(){
        GameObject.transit = ScenePlay.loadScene;
    }
    onTapBack(){
        GameObject.transit = SceneTitle.loadScene;
    }
}
