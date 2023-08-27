/*
 * :file description: 
 * :name: /babylon/src/MultiMaterialMesh.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-28 06:05:53
 * :last editor: 张德志
 * :date last edited: 2023-08-28 06:06:32
 */

import {  ArcRotateCamera, Color3, Engine, HemisphericLight, MeshBuilder, MultiMaterial, Scene,StandardMaterial,SubMesh,Texture,Vector3 } from "babylonjs";
import * as GUI from 'babylonjs-gui';


export default class MultiMaterialMesh {
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

        const camera = new ArcRotateCamera('camera', -Math.PI / 2,Math.PI / 2.5,6,new Vector3(0,0,0));
        camera.attachControl(this.canvas,true);

        const light = new HemisphericLight('light',new Vector3(0,1,0),scene);

        // const box = MeshBuilder.CreateBox('box');

        const material = new StandardMaterial('material');
        material.diffuseColor = new Color3(1,0,0);
        material.diffuseTexture = new Texture('https://playground.babylonjs.com/textures/normalMap.jpg');

        const material1 = new StandardMaterial('material1');
        material1.diffuseColor = new Color3(0,0,1);

        const material2 = new StandardMaterial('material2');
        material2.diffuseColor = new Color3(0.4,0,0.4);

        const multMat = new MultiMaterial('multMat');
        multMat.subMaterials.push(material);
        multMat.subMaterials.push(material1);
        multMat.subMaterials.push(material2);

        const sphere = MeshBuilder.CreateSphere('sphere',{diameter:3,segments:16});
        sphere.material  = multMat;


        const verticesCount = sphere.getTotalIndices();

        new SubMesh(0,0,verticesCount,0,900,sphere);
        new SubMesh(1,0,verticesCount,900,900,sphere);
        new SubMesh(2,0,verticesCount,1800,2088,sphere);

        scene.registerBeforeRender(() => {
            sphere.rotation.y += 0.01;
        });

        window.addEventListener('resize',() => {
            this.engine.resize();
        })

        return scene;

    
     
    }
    
}