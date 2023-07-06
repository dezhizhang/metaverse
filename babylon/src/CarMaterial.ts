/*
 * :file description: 
 * :name: /babylon/src/CarMaterial.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-07-07 07:24:49
 * :last editor: 张德志
 * :date last edited: 2023-07-07 07:28:56
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
import * as earcut from 'earcut';
import { ArcRotateCamera, Engine, HemisphericLight, MeshBuilder, Scene,SceneLoader,Vector3 } from "babylonjs";

(window as any).earcut = earcut;

export default class CarMaterial {
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

        const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 100, new BABYLON.Vector3(0, 0, 0));
        camera.attachControl(this.canvas, true);
        const light = new HemisphericLight("light", new Vector3(0, 1, 0),this.scene);
        
        const car = this.buildCar();
        car.rotation.x = -Math.PI / 2;
    
        return scene;
    }

    buildCar () {
    
        //base
        const outline = [
            new BABYLON.Vector3(-0.3, 0, -0.1),
            new BABYLON.Vector3(0.2, 0, -0.1),
        ]
    
        //curved front
        for (let i = 0; i < 20; i++) {
            outline.push(new BABYLON.Vector3(0.2 * Math.cos(i * Math.PI / 40), 0, 0.2 * Math.sin(i * Math.PI / 40) - 0.1));
        }
    
        //top
        outline.push(new BABYLON.Vector3(0, 0, 0.1));
        outline.push(new BABYLON.Vector3(-0.3, 0, 0.1));
    
        //back formed automatically
    
        //car face UVs
        const faceUV:any[] = [];
        faceUV[0] = new BABYLON.Vector4(0, 0.5, 0.38, 1);
        faceUV[1] = new BABYLON.Vector4(0, 0, 1, 0.5);
        faceUV[2] = new BABYLON.Vector4(0.38, 1, 0, 0.5);
    
        //car material
        const carMat = new BABYLON.StandardMaterial("carMat");
        carMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/car.png");
    
        const car = BABYLON.MeshBuilder.ExtrudePolygon("car", {shape: outline, depth: 0.2, faceUV: faceUV, wrap: true});
        car.material = carMat;
    
        //wheel face UVs
        const wheelUV:any[] = [];
        wheelUV[0] = new BABYLON.Vector4(0, 0, 1, 1);
        wheelUV[1] = new BABYLON.Vector4(0, 0.5, 0, 0.5);
        wheelUV[2] = new BABYLON.Vector4(0, 0, 1, 1);
        
        //car material
        const wheelMat = new BABYLON.StandardMaterial("wheelMat");
        wheelMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/wheel.png");
    
        const wheelRB = BABYLON.MeshBuilder.CreateCylinder("wheelRB", {diameter: 0.125, height: 0.05, faceUV: wheelUV})
        wheelRB.material = wheelMat;
        wheelRB.parent = car;
        wheelRB.position.z = -0.1;
        wheelRB.position.x = -0.2;
        wheelRB.position.y = 0.035;
    
        const wheelRF = wheelRB.clone("wheelRF");
        wheelRF.position.x = 0.1;
    
        const wheelLB = wheelRB.clone("wheelLB");
        wheelLB.position.y = -0.2 - 0.035;
    
        const wheelLF = wheelRF.clone("wheelLF");
        wheelLF.position.y = -0.2 - 0.035;
    
        return car;
    }
}