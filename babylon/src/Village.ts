/*
 * :file description:
 * :name: /babylon/src/Village.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-07-02 20:10:04
 * :last editor: 张德志
 * :date last edited: 2023-07-02 22:02:51
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
        this.scene = this.createScene();

        this.engine.runRenderLoop(() => {
            this.scene.render();
        });
    }

    // 创建场景
    createScene():Scene {
        const scene = new Scene(this.engine);

        /**** Set camera and light *****/
        const camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 10, new Vector3(0, 0, 0));
        camera.attachControl(this.canvas, true);
        const light = new HemisphericLight("light", new Vector3(1, 1, 0),this.scene);
    
        const ground = this.buildGround();
        const box = this.buildBox();
        const roof = this.buildRoof();
        
        return scene;

    }

    buildGround = () => {
        //color
        const groundMat = new BABYLON.StandardMaterial("groundMat");
        groundMat.diffuseColor = new BABYLON.Color3(0, 1, 0);
    
        const ground = BABYLON.MeshBuilder.CreateGround("ground", {width:10, height:10});
        ground.material = groundMat;
    }
    
    
    buildBox = () => {
        //texture
        const boxMat = new BABYLON.StandardMaterial("boxMat");
        boxMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/cubehouse.png")
    
    
        //options parameter to set different images on each side
        const faceUV:any[] = [];
        faceUV[0] = new BABYLON.Vector4(0.5, 0.0, 0.75, 1.0); //rear face
        faceUV[1] = new BABYLON.Vector4(0.0, 0.0, 0.25, 1.0); //front face
        faceUV[2] = new BABYLON.Vector4(0.25, 0, 0.5, 1.0); //right side
        faceUV[3] = new BABYLON.Vector4(0.75, 0, 1.0, 1.0); //left side
        // top 4 and bottom 5 not seen so not set
    
    
        /**** World Objects *****/
        const box = BABYLON.MeshBuilder.CreateBox("box", {faceUV: faceUV, wrap: true});
        box.material = boxMat;
        box.position.y = 0.5;
    
        return box;
    }
    
    buildRoof = () => {
        //texture
        const roofMat = new BABYLON.StandardMaterial("roofMat");
        roofMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/roof.jpg");
    
        const roof = BABYLON.MeshBuilder.CreateCylinder("roof", {diameter: 1.3, height: 1.2, tessellation: 3});
        roof.material = roofMat;
        roof.scaling.x = 0.75;
        roof.rotation.z = Math.PI / 2;
        roof.position.y = 1.22;
    
        return roof;
    }
   
}
