/*
 * :file description: 
 * :name: /babylon/src/WaterMaterial.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-29 20:22:56
 * :last editor: 张德志
 * :date last edited: 2023-08-29 20:56:06
 */

import {  ArcRotateCamera, Color3, CreateGround, CubeTexture, Engine,HemisphericLight,MeshBuilder,Scene,StandardMaterial,Texture,Vector3 } from "babylonjs";


export default class WaterMaterial {
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
        const camera = new ArcRotateCamera('camera', 3 * Math.PI / 2,Math.PI / 4,100,Vector3.Zero(),scene);
        camera.attachControl(this.canvas,true);

        const light = new HemisphericLight('light', new Vector3(0,1,0),scene);

        const skybox =  MeshBuilder.CreateBox("skyBox", {size:1000},scene);

        const url = 'https://playground.babylonjs.com/textures/TropicalSunnyDay_py.jpg';

        // 天空盒材质
        const skyboxMaterial = new StandardMaterial('skyBox',scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new CubeTexture(url,scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new Color3(0,0,0);
        skyboxMaterial.specularColor = new Color3(0,0,0);
        skyboxMaterial.disableLighting = true;
        skybox.material = skyboxMaterial;

        //  网格材质
        const groundUrl = 'https://playground.babylonjs.com/textures/ground.jpg';
        const groundMaterial = new StandardMaterial('groundMaterial',scene);
        groundMaterial.diffuseTexture = new Texture(groundUrl,scene);
        // groundMaterial.diffuseTexture.uScale = groundMaterial.diffuseTexture.vScale = 4;

        const ground = MeshBuilder.CreateGround('ground',{width:512,height:512},scene);
        ground.position.y = -1;
        ground.material = groundMaterial;
        
        
        

    

        const box = MeshBuilder.CreateBox('box');
      
        window.addEventListener('resize',() => {
            this.engine.resize();
        })
        return scene;

    }
    
}