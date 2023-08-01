/*
 * :file description: 
 * :name: /babylon/src/CameraCollision.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-07-30 14:34:42
 * :last editor: 张德志
 * :date last edited: 2023-07-30 14:55:57
 */


import { Engine, Scene,Vector3, HemisphericLight, MeshBuilder, FreeCamera, StandardMaterial, Color3, Texture } from "babylonjs";

export default class CameraCollision {
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
        scene.gravity = new Vector3(0,-0.98,0);
        scene.collisionsEnabled = true;

        const camera = new FreeCamera('camera',new Vector3(8,2,-10));
        camera.attachControl(this.canvas,true);
        camera.setTarget(Vector3.Zero());
        camera.minZ = 0.5;
        camera.applyGravity = true;
        camera.ellipsoid = new Vector3(1,1,1);
        camera.checkCollisions = true;

        const light = new HemisphericLight('light',new Vector3(0,1,0),scene);
        light.intensity = 0.7;

        const ground = MeshBuilder.CreateGround('ground',{width:30,height:30});
        const gMat = new StandardMaterial('gMat');
        gMat.diffuseColor = Color3.White();
        gMat.backFaceCulling = false;
        ground.material = gMat;
        ground.position.y = -0.5;
        ground.checkCollisions = true;

        const bMat = new StandardMaterial('bMat');
        bMat.diffuseTexture = new Texture('https://playground.babylonjs.com/textures/crate.png')

        const box = MeshBuilder.CreateBox('box');
        box.checkCollisions = true;
        box.material = bMat;


        const box2 = MeshBuilder.CreateBox('box2');
        box2.position = new Vector3(-2,0,0);
        
        window.addEventListener('resize',() => {
            this.engine.resize();
        })
        return scene;
        
    }
    
}