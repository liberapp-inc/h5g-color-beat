// Liberapp 2020 - Tahiti Katagai
// プレイシーン

class ScenePlay extends GameObject{

    static loadScene() {
        new ColorGround( "cyan_png" );
        new ColorGround( "purple_png" );
        new SoundEffect();
        new Game();
        new Score();
        new BaseLine();
    }

    update(){
    }
}

