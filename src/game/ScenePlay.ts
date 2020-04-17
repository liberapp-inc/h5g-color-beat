// Liberapp 2020 - Tahiti Katagai
// プレイシーン

class ScenePlay extends GameObject{

    static loadScene() {
        if( randBool() )
            new ColorGround( "cyan_png", 1.5 );
        else
            new ColorGround( "purple_png", 1.0 );

        new SoundEffect();
        new Game();
        new Score();
        new BaseLine();
    }

    update(){
    }
}

