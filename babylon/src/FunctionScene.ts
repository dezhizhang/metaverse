

/*
 * :file description: 
 * :name: /babylon/src/FunctionScene.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-07-02 17:49:35
 * :last editor: 张德志
 * :date last edited: 2023-07-09 14:57:52
 */

import { Engine, HemisphericLight, Scene,MeshBuilder,Vector3 } from "babylonjs";


export default class FunctionScene {
    engine:Engine;
    scene:Scene;
    constructor(private readonly canvas:HTMLCanvasElement) {
        this.engine = new Engine(this.canvas);
        this.scene = this.CreateScene();

        this.engine.runRenderLoop(() => {
            this.scene.render();
        }) 
    }

    // 创建场景
    CreateScene():Scene {
        const scene = new Scene(this.engine);

        const camera = new BABYLON.ArcRotateCamera("Camera", 3 * Math.PI / 2, Math.PI / 2.5, 70, BABYLON.Vector3.Zero());
        camera.attachControl(this.canvas, true);
    
        const light = new HemisphericLight("hemi", new Vector3(0, 1, 0),this.scene);
    
        const fountainProfile:any[] = [
            new BABYLON.Vector3(0, 0, 0),
            new BABYLON.Vector3(10, 0, 0),
            new BABYLON.Vector3(10, 4, 0),
            new BABYLON.Vector3(8, 4, 0),
            new BABYLON.Vector3(8, 1, 0),
            new BABYLON.Vector3(1, 2, 0),
            new BABYLON.Vector3(1, 15, 0),
            new BABYLON.Vector3(3, 17, 0)
        ];
        
        //Create lathe
        const fountain = MeshBuilder.CreateLathe("fountain", {shape: fountainProfile, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, this.scene);
        
        return scene;
    }

}