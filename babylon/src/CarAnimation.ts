/*
 * :file description: 
 * :name: /babylon/src/CarAnimation.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-07-08 22:13:15
 * :last editor: 张德志
 * :date last edited: 2023-07-08 22:33:03
 */


/*
 * :file description: 
 * :name: /babylon/src/BasicScene.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-07-02 17:49:35
 * :last editor: 张德志
 * :date last edited: 2023-07-08 20:20:35
 */

import { ArcRotateCamera, Engine, HemisphericLight, Scene,SceneLoader,Vector3 } from "babylonjs";
import * as loader from 'babylonjs-loaders'

export default class CarAnimation {
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

        const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0));
        camera.attachControl(this.canvas, true);
        const light = new HemisphericLight("light", new Vector3(1, 1, 0),this.scene);
        
        //Create Village ground
        const groundMat = new BABYLON.StandardMaterial("groundMat");
        groundMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/villagegreen.png");
        groundMat.diffuseTexture.hasAlpha = true;
    
        const ground = BABYLON.MeshBuilder.CreateGround("ground", {width:24, height:24});
        ground.material = groundMat;
    
        //large ground
        const largeGroundMat = new BABYLON.StandardMaterial("largeGroundMat");
        largeGroundMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/valleygrass.png");
        
        const largeGround = BABYLON.MeshBuilder.CreateGroundFromHeightMap("largeGround", "https://assets.babylonjs.com/environments/villageheightmap.png", {width:150, height:150, subdivisions: 20, minHeight:0, maxHeight: 10});
        largeGround.material = largeGroundMat;
        largeGround.position.y = -0.01;
        
        return scene;
    }

}