

/*
 * :file description: 
 * :name: /babylon/src/FunctionScene.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-07-02 17:49:35
 * :last editor: 张德志
 * :date last edited: 2023-07-09 15:07:18
 */

import { Engine, HemisphericLight, Scene,MeshBuilder,Vector3,ArcRotateCamera } from "babylonjs";


export default class FunctionScene {
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
        const camera = new ArcRotateCamera('camera',3 * Math.PI / 2,Math.PI / 2.5,70,Vector3.Zero(),this.scene);
        camera.attachControl(this.scene,true);

        const light = new HemisphericLight('hemi',new Vector3(0,1,0),this.scene);

        const fountainProfile:any[] = [
            new Vector3(0, 0, 0),
            new Vector3(10, 0, 0),
            new Vector3(10, 4, 0),
            new Vector3(8, 4, 0),
            new Vector3(8, 1, 0),
            new Vector3(1, 2, 0),
            new Vector3(1, 15, 0),
            new Vector3(3, 17, 0)
        ];

        const fountain = MeshBuilder.CreateLathe('fountain',{shape: fountainProfile, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, this.scene);

        return scene;

    }
   

}