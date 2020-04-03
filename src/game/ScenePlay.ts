// Liberapp 2020 - Tahiti Katagai
// プレイシーン

class ScenePlay extends GameObject{

    static loadScene() {
        new SoundEffect();
        new Game();
        new Score();
        new BaseLine();
    }

    update(){
    }
}

