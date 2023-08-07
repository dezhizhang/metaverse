/*
 * :file description: 
 * :name: /babylon/src/UsingOpacityMaps.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-08 05:19:41
 * :last editor: 张德志
 * :date last edited: 2023-08-08 05:20:16
 */
import {  ArcRotateCamera, Engine, HemisphericLight, MeshBuilder, Scene,StandardMaterial,Texture,Vector3 } from "babylonjs";
import * as GUI from 'babylonjs-gui';


export default class UsingOpacityMaps {
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

        // const camera = new FreeCamera('camera',new Vector3(0,5,-10));
        const camera = new ArcRotateCamera('camera', -Math.PI / 2,Math.PI / 2.5,5,new Vector3(0,0,0));
        camera.setTarget(Vector3.Zero());
        camera.attachControl(this.canvas,true);

        const light = new HemisphericLight('light',new Vector3(0,1,0),scene);
        light.intensity = 0.7;

        const mat = new StandardMaterial('mat');
        mat.diffuseTexture = new Texture('https://doc.babylonjs.com/img/how_to/Materials/dog.png');
        mat.diffuseTexture.hasAlpha = true;
        mat.backFaceCulling = false;
        
        const box = MeshBuilder.CreateBox('box');
        box.material = mat;


        window.addEventListener('resize',() => {
            this.engine.resize();
        })
        return scene;
    
     
    }
    
}