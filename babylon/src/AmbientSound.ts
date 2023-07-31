/*
 * :file description: 
 * :name: /babylon/src/AmbientSound.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-01 05:09:06
 * :last editor: 张德志
 * :date last edited: 2023-08-01 05:13:35
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
import { ArcRotateCamera, Engine, Scene,Vector3, HemisphericLight, ActionManager,  ExecuteCodeAction, SpriteManager, Sprite, UniversalCamera, MeshBuilder, Sound } from "babylonjs";


export default class AmbientSound {
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

        const camera = new ArcRotateCamera('camera',-Math.PI / 2, Math.PI / 2.5,8,new Vector3(0,0,0));
        camera.attachControl(this.canvas,true);

        const music = new Sound('Violons','https://playground.babylonjs.com/sounds/violons11.wav',scene,null,{loop:false,autoplay:true})
    
        window.addEventListener('resize',() => {
            this.engine.resize();
        })
        return scene;
        
    }
    
}