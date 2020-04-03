// http://developer.egret.com/en/apidoc/index/name/egret.Sound#example

/**
 * 以下示例加载一个 MP3 文件，进行播放，并输出播放该 MP3 文件时所发生的声音事件的相关信息。
 */

// 効果音：魔王魂　https://maoudamashii.jokersounds.com/archives/se_maoudamashii_system18.html

class SoundEffect extends egret.DisplayObjectContainer {

    public static I:SoundEffect = null;

    files:string[] = [ "se_m1.mp3", "se_p0.mp3", "se_p2.mp3", "se_p4.mp3", "se_p5.mp3", "se_p10.mp3" ];

    sounds:egret.Sound[] = [];

    public constructor() {
        super();
        SoundEffect.I = this;
        this.startLoad();
    }
    private startLoad() {
        for( let i=0 ; i<this.files.length ; i++ ){
            this.sounds[i] = new egret.Sound();
            var url:string = "resource/assets/" + this.files[ i ];
            this.sounds[i].addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
            this.sounds[i].load(url);
        }
    }
    private onLoadComplete(event:egret.Event):void {
        //获取加载到的 Sound 对象
        // this.sounds[ix] = <egret.Sound>event.target;
    }

    // private startLoad():void {
    //     //创建 Sound 对象
    //     var sound = new egret.Sound();
    //     var url:string = "resource/assets/se_maoudamashii_system18.mp3";
    //     //添加加载完成侦听
    //     sound.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
    //     //开始加载
    //     sound.load(url);
    // }

    // private onLoadComplete(event:egret.Event):void {
    //     //获取加载到的 Sound 对象
    //     this.sound = <egret.Sound>event.target;
    // }

    play( ix:number ){
        //播放音乐
        // egret.log("play");
        var channel:egret.SoundChannel = this.sounds[ix].play(0.0, 1);
        // channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
    }

    // private onSoundComplete(event:egret.Event):void {
    //     egret.log("onSoundComplete");
    // }

}
