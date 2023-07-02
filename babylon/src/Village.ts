/*
 * :file description:
 * :name: /babylon/src/Village.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-07-02 20:10:04
 * :last editor: 张德志
 * :date last edited: 2023-07-02 20:41:25
 */

/*
 * :file description:
 * :name: /babylon/src/BasicScene.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-07-02 17:49:35
 * :last editor: 张德志
 * :date last edited: 2023-07-02 20:07:25
 */

import {
    ArcRotateCamera,
    Engine,
    HemisphericLight,
    MeshBuilder,
    Scene,
    Vector3,
} from "babylonjs";

export default class Village {
    engine: Engine;
    scene: Scene;
    constructor(private readonly canvas: HTMLCanvasElement) {
        this.engine = new Engine(this.canvas);
        this.scene = this.CreateScene();

        this.engine.runRenderLoop(() => {
            this.scene.render();
        });
    }

    // 创建场景
    CreateScene(): Scene {
        const scene = new Scene(this.engine);

        /**** Set camera and light *****/
        const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 10, new BABYLON.Vector3(0, 0, 0));
        camera.attachControl(this.canvas, true);
        const light = new HemisphericLight("light", new Vector3(1, 1, 0),this.scene);
    
        /**** Materials *****/
        //color
        const groundMat = new BABYLON.StandardMaterial("groundMat");
        groundMat.diffuseColor = new BABYLON.Color3(0, 1, 0)
    
        //texture
        const roofMat = new BABYLON.StandardMaterial("roofMat");
        roofMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/roof.jpg");
        const boxMat = new BABYLON.StandardMaterial("boxMat");
        boxMat.diffuseTexture = new BABYLON.Texture("https://www.babylonjs-playground.com/textures/floor.png")
    
        /**** World Objects *****/
        const box = BABYLON.MeshBuilder.CreateBox("box", {});
        box.material = boxMat;
        box.position.y = 0.5;
        const roof = BABYLON.MeshBuilder.CreateCylinder("roof", {diameter: 1.3, height: 1.2, tessellation: 3});
        roof.material = roofMat;
        roof.scaling.x = 0.75;
        roof.rotation.z = Math.PI / 2;
        roof.position.y = 1.22;
        const ground = BABYLON.MeshBuilder.CreateGround("ground", {width:10, height:10});
        ground.material = groundMat;
    

        return scene;
    }
}
