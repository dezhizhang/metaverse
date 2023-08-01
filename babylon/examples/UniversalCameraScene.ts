/*
 * :file description: 
 * :name: /babylon/src/UniversalCameraScene.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-07-02 17:49:35
 * :last editor: 张德志
 * :date last edited: 2023-07-30 10:29:06
 */

import { Engine, Scene,Vector3, HemisphericLight, UniversalCamera, MeshBuilder } from "babylonjs";


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


        const camera = new UniversalCamera('camera',new Vector3(0,-5,-10));
        camera.attachControl(this.canvas,true);
        camera.setTarget(Vector3.Zero());
        
        const light = new HemisphericLight('light',new Vector3(0,1,0),scene);

        const box = MeshBuilder.CreateBox('box')


    
        window.addEventListener('resize',() => {
            this.engine.resize();
        })
        return scene;
        
    }
    
}