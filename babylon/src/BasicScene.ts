

/*
 * :file description: 
 * :name: /babylon/src/BasicScene.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-07-02 17:49:35
 * :last editor: 张德志
 * :date last edited: 2023-07-02 19:45:15
 */

import { ArcRotateCamera, Engine, HemisphericLight, MeshBuilder, Scene,Vector3 } from "babylonjs";


export default class BasicScene {
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

        const camera = new ArcRotateCamera('camera', - Math.PI / 2, Math.PI / 2.5,3, new Vector3(0,0,0));
        camera.attachControl(this.canvas,true);

        // 创建灯光
        const light = new  HemisphericLight('light',new Vector3(0,1,0),this.scene);

        const box = MeshBuilder.CreateBox('box');

        
        return scene;
    }
}