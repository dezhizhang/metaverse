/*
 * :file description: 
 * :name: /babylon/src/GunSight.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-07-30 16:32:36
 * :last editor: 张德志
 * :date last edited: 2023-07-30 17:00:11
 */

import { Engine, Scene,Vector3, HemisphericLight, MeshBuilder, FreeCamera, Camera, Mesh, StandardMaterial, Color3 } from "babylonjs";


export default class GunSight {
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
        const camera = new FreeCamera('camera',new Vector3(0,5,-10));
        camera.setTarget(Vector3.Zero());
        camera.attachControl(this.canvas,true);

        const ligth = new HemisphericLight('light',new Vector3(0,1,0),scene);
        ligth.intensity = 0.7;

        const box = MeshBuilder.CreateBox('box');
        box.position.x = 0.5;
        
        const ground = MeshBuilder.CreateGround('ground',{width:6,height:6,subdivisions:2});
        this.addGunSight(scene);

    
        window.addEventListener('resize',() => {
            this.engine.resize();
        })
        return scene;
        
    }

    addGunSight(scene:Scene) {
        if(scene.activeCameras?.length == 0) {
            scene.activeCameras.push(scene.activeCamera!);
        }

        // 添加一个正交相机
        const camera2 = new FreeCamera('camera2',new Vector3(0,0,-50));
        camera2.mode = Camera.ORTHOGRAPHIC_CAMERA;
        camera2.layerMask = 0x2000000;
        scene.activeCameras?.push(camera2);

        // 创建十字
        const meshs:Mesh[] = [];
        const h = 250;
        const w = 250;

        const y = MeshBuilder.CreateBox('y',{size:h * 0.2});
        y.scaling = new Vector3(0.05,1,1);
        y.position = new Vector3(0,0,0);
        meshs.push(y);

        const x = MeshBuilder.CreateBox('y',{size: w * 0.2});
        x.scaling = new Vector3(1,1,1);
        x.position = new Vector3(0,0,0);
        meshs.push(x);
        

   

        const gunSight = Mesh.MergeMeshes(meshs) as Mesh;
        gunSight.name = 'gunSight';
        gunSight.layerMask = 0x2000000;

        const mat = new StandardMaterial('emissive mat');
        mat.checkReadyOnlyOnce = true;
        mat.emissiveColor = new Color3(0,1,0);

        gunSight.material = mat;
        
        
    }
    
}