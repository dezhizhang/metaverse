/*
 * :file description: 
 * :name: /babylon/src/TransparentColor.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-07 06:51:04
 * :last editor: 张德志
 * :date last edited: 2023-08-07 06:52:37
 */

import {  ArcRotateCamera, Color3, Engine, HemisphericLight, MeshBuilder, Scene,StandardMaterial,Vector3 } from "babylonjs";
import * as GUI from 'babylonjs-gui';


export default class TransparentColor {
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
    

        const camera = new ArcRotateCamera('camera', -Math.PI / 2,3 * Math.PI / 8,8,new Vector3(0,0,0));
        camera.attachControl(this.canvas,true);

        const light = new HemisphericLight('light',new Vector3(-1,1,0),scene);
        light.diffuse = new Color3(1,0,0);
        light.specular = new Color3(0,1,0);
        light.groundColor = new Color3(0,1,0);

        const redMat = new StandardMaterial('redMat');
        redMat.ambientColor = new Color3(1,0,0);
        
        const greenMat = new StandardMaterial('greenMat');
        greenMat.ambientColor = new Color3(0,1,0);


        //spher
        const sphere0 = MeshBuilder.CreateSphere('sphere0');
        sphere0.position.x = -1.5;
        
        const sphere1 = MeshBuilder.CreateSphere('sphere1');
        sphere1.material = redMat;

        const sphere2 = MeshBuilder.CreateSphere('sphere2');
        sphere2.material = greenMat;
        sphere2.position.x = 1.5;
        greenMat.alpha = 0.1;
        

        window.addEventListener('resize',() => {
            this.engine.resize();
        })
        return scene;
    
     
    }
    
}