/*
 * :file description: 
 * :name: /babylon/src/DrawingText.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-28 06:26:34
 * :last editor: 张德志
 * :date last edited: 2023-08-28 06:40:09
 */

import {  ArcRotateCamera, Color3, DynamicTexture, Engine, HemisphericLight, Mesh, MeshBuilder, MultiMaterial, Scene,StandardMaterial,SubMesh,Texture,Vector3 } from "babylonjs";



export default class DrawingText {
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

        const camera = new ArcRotateCamera('camera', -Math.PI / 2,Math.PI / 2.5,20,new Vector3(0,0,0));
        camera.attachControl(this.canvas,true);


        const light = new HemisphericLight('light',new Vector3(0,1,0),scene);

        const ground = MeshBuilder.CreateGround('ground',{width:20,height:6,subdivisions:25});

        const textureGround = new DynamicTexture('dynamic texture',{width:512,height:512});

        const material = new StandardMaterial('material');
        material.diffuseTexture = textureGround;
        ground.material = material;

        const font = 'bold 44px 微软雅黑';
        textureGround.drawText('Grass',50,75,font,'green','white',true,true);


        window.addEventListener('resize',() => {
            this.engine.resize();
        })

        return scene;

    }
    
}