/*
 * :file description: 
 * :name: /babylon/src/ParallaxMapping.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-08 06:59:42
 * :last editor: 张德志
 * :date last edited: 2023-08-08 07:05:57
 */
import {  ArcRotateCamera, Color4, Engine, HemisphericLight, MeshBuilder, PBRMaterial, PointLight, Scene,StandardMaterial,Texture,Vector3 } from "babylonjs";
import * as GUI from 'babylonjs-gui';


export default class ParallaxMapping {
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
        scene.clearColor = new Color4(0.5,0.5,0.5,1);
    
        const camera = new ArcRotateCamera('camera', -Math.PI / 2,Math.PI / 3,100,new Vector3(0,0,0));
        camera.inertia = 0.7;
        camera.attachControl(this.canvas,true);

        const light = new HemisphericLight('light',new Vector3(0,1,0),scene);
        light.intensity = 0.7;

        const box = MeshBuilder.CreateBox('box',{size:50});
        const stoneDiffuseTexture = new Texture('https://i.imgur.com/VSbN3Fc.png');
        const stoneNormalTexture = new Texture('https://i.imgur.com/VSbN3Fc.png');

        


        

        
        



    


        window.addEventListener('resize',() => {
            this.engine.resize();
        })
        return scene;
    
     
    }
    
}