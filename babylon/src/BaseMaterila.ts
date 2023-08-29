/*
 * :file description: 
 * :name: /babylon/src/BaseMaterila.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-29 20:10:00
 * :last editor: 张德志
 * :date last edited: 2023-08-29 20:21:13
 */
import {  ArcRotateCamera, Color3, DynamicTexture, Engine, FreeCamera, HemisphericLight, Mesh, MeshBuilder, MultiMaterial, Scene,StandardMaterial,SubMesh,Texture,Vector3 } from "babylonjs";



export default class BaseMaterila {
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

        const camera = new FreeCamera('camera',new Vector3(0,0,-2),scene);
        camera.setTarget(new Vector3(0,0,0));
        camera.attachControl(this.canvas,true);


        const light = new HemisphericLight('light',new Vector3(0,1,0),scene);
        light.groundColor = new Color3(1,1,1);
        light.intensity = 1;

        const box = MeshBuilder.CreatePlane('plane',{size:1},scene);
        box.position.y = 0;
        
        const material = new StandardMaterial('material');
 

        

        window.addEventListener('resize',() => {
            this.engine.resize();
        })

        return scene;

    }
    
}