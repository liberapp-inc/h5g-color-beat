// Liberapp 2020 - Tahiti Katagai
// スコア表示

enum Beat{
    None = 0,
    Good,
    Great,
    Perfect,
}

class Score extends GameObject{

    static I:Score = null;   // singleton instance

    point:number = 0;
    bestScore:number = 0;
    text:egret.TextField = null;
    textBeat:egret.TextField = null;
    beatFrame:number = 0;

    constructor() {
        super();

        Score.I = this;
        this.point = 0;
        this.bestScore = Util.getSaveDataNumber( SaveKeyBestScore, DefaultBestScore );

        this.text = Util.newTextField("", Util.width / 22, FONT2_COLOR, 0.0, 0.0, true, true);
        GameObject.baseDisplay.addChild( this.text );

        this.textBeat = Util.newTextField("", Util.width / 18, FONT2_COLOR, 0.5, 0.9, true, true);
        GameObject.baseDisplay.addChild( this.textBeat );
    }
    
    onDestroy() {
        this.text.parent.removeChild( this.text );
        this.text = null;
        this.textBeat.parent.removeChild( this.textBeat );
        this.textBeat = null;
        Score.I = null;
    }

    update(){
        if( this.beatFrame > 0 ){
            this.beatFrame--;
            if( this.beatFrame > 6 ){
                this.textBeat.scaleX += (1 - this.textBeat.scaleX) * 0.5;
                this.textBeat.scaleY += (1 - this.textBeat.scaleY) * 0.5;
            }else{
                this.textBeat.scaleY *= 0.5;
                if( this.beatFrame == 0 ){
                    this.textBeat.text = "";
                    this.textBeat.scaleX = 1;
                    this.textBeat.scaleY = 1;
                }
            }
            this.textBeat.x = Util.w( 0.5 ) - this.textBeat.width/2;
            this.textBeat.y = Util.h( 0.9 ) - this.textBeat.height/2;
        }
    }

    addPoint( beat:Beat ){
        this.setPoint( this.point + beat );
        switch( beat ){
            case Beat.Good:    this.textBeat.text = "GOOD"; break;
            case Beat.Great:   this.textBeat.text = "Great"; break;
            case Beat.Perfect: this.textBeat.text = "Perfet"; break;
        }
        this.textBeat.scaleX = 1.5;
        this.textBeat.scaleY = 1.5;
        this.beatFrame = 30;
    }

    private setPoint( point:number ){
        const prev = this.point.toFixed();
        const next = point.toFixed();
        this.point = point;
        if( prev != next ){
            this.text.text = "" + next + "";
            // if( this.bestScore < this.point ){
            //     this.textBest.text = "BEST:" + this.point.toFixed();
            // }
        }
    }
}
