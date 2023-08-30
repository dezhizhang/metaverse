/*
 * :file description: 
 * :name: /babylon/src/BaseMaterials.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-30 09:12:13
 * :last editor: 张德志
 * :date last edited: 2023-08-30 09:24:08
 */
import {  ArcRotateCamera, Color3, DynamicTexture, Engine, FreeCamera, HemisphericLight, Mesh, MeshBuilder, MultiMaterial, Scene,StandardMaterial,SubMesh,Texture,Vector3 } from "babylonjs";



export default class BaseMaterilas {
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

        const camera = new ArcRotateCamera('camera', -Math.PI / 2,Math.PI / 2.5,20,new Vector3(0,0,0),scene);
        camera.attachControl(this.canvas,true);

        const light = new HemisphericLight('light',new Vector3(0,1,0),scene);

        const sphere = MeshBuilder.CreateSphere('sphere',{segments:15,diameter:20},scene);
        
        const normalMaterial = new StandardMaterial('normalMaterial',scene);
        sphere.material = normalMaterial;
        

        window.addEventListener('resize',() => {
            this.engine.resize();
        })

        return scene;
    }
}