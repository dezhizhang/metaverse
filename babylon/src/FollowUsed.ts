/*
 * :file description: 
 * :name: /babylon/src/BaseScene.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-07-30 10:28:37
 * :last editor: 张德志
 * :date last edited: 2023-07-30 10:28:38
 */
import { Engine, Scene,Vector3, HemisphericLight, MeshBuilder, FollowCamera, StandardMaterial, Color3 } from "babylonjs";


export default class FollowUsed {
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
        const camera = new FollowCamera('camera',new Vector3(0,2,-10));
        camera.attachControl(true);

        camera.radius = 10;
        camera.heightOffset = 0;
        camera.rotationOffset = 0;
        camera.cameraAcceleration = 0.005;
        camera.maxCameraSpeed = 10;

        const light = new HemisphericLight('light',new Vector3(0,1,0),scene);
        
        const mat = new StandardMaterial('mat');
        mat.diffuseColor = Color3.Red();
        const box = MeshBuilder.CreateBox('box');
        box.material = mat;


        const boxX = MeshBuilder.CreateBox('boxX');
        boxX.position = new Vector3(5,0,0);

        const boxY = MeshBuilder.CreateBox('boxY');
        boxY.position = new Vector3(0,5,0);

        camera.lockedTarget = box;
        
        
    
        window.addEventListener('resize',() => {
            this.engine.resize();
        })
        return scene;
        
    }
    
}