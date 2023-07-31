/*
 * :file description: 
 * :name: /babylon/src/InteractionPlaying.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-01 05:16:44
 * :last editor: 张德志
 * :date last edited: 2023-08-01 05:27:05
 */
/*
 * :file description: 
 * :name: /babylon/src/BaseScene.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-07-30 10:28:37
 * :last editor: 张德志
 * :date last edited: 2023-07-30 10:28:38
 */
import { ArcRotateCamera, Engine, Scene, Sound, Vector2, Vector3, } from "babylonjs";


export default class InteractionPlaying {
    engine:Engine;
    scene:Scene;
    constructor(private readonly canvas:HTMLCanvasElement) {
        this.engine = new Engine(this.canvas);
        this.scene = this.createScene();

        this.engine.runRenderLoop(() => {
            this.scene.render();
        }) 
    }

    // 创建场景
    createScene():Scene {
        const scene = new Scene(this.engine);

        const camera = new ArcRotateCamera('camera', - Math.PI / 2,Math.PI / 2.5,8,new Vector3(0,0,0));
        camera.attachControl(this.canvas,true);

        const volume = 0.1;

        const playbackRate = 0.5;

        const gunshot = new Sound('gunshot','https://playground.babylonjs.com/sounds/gunshot.wav',scene,null,{
            playbackRate:playbackRate,
            volume:volume
        });

        window.addEventListener('mousedown',(evt) => {
            if(evt.button === 0) {
                gunshot.play();
            }
        });

        window.addEventListener('keydown',(evt) => {
            console.log(evt)
            if(evt.code == "Space") {
                gunshot.play();
            }
        })
    
        window.addEventListener('resize',() => {
            this.engine.resize();
        })
        return scene;
        
    }
    
}