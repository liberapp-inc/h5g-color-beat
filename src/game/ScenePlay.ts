// Liberapp 2020 - Tahiti Katagai
// プレイシーン

class ScenePlay extends GameObject{

    static loadScene() {
        new ColorGround( "cyan_png", 1.5 );
        new ColorGround( "purple_png", 1.0 );
        new SoundEffect();
        new Game();
        new Score();
        new BaseLine();
    }

    update(){
    }
}

