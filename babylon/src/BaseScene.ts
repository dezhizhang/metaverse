/*
 * :file description: 
 * :name: /babylon/src/BaseScene.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-07-30 10:28:37
 * :last editor: 张德志
 * :date last edited: 2023-07-30 10:28:38
 */
import { ArcRotateCamera, Engine, Scene,Vector3, HemisphericLight, ActionManager,  ExecuteCodeAction, SpriteManager, Sprite, UniversalCamera, MeshBuilder } from "babylonjs";


export default class UniversalCameraScene {
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


    
        window.addEventListener('resize',() => {
            this.engine.resize();
        })
        return scene;
        
    }
    
}