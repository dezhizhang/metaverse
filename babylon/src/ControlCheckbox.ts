/*
 * :file description: 
 * :name: /babylon/src/ControlCheckbox.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-01 08:10:14
 * :last editor: 张德志
 * :date last edited: 2023-08-01 08:19:37
 */

import {  ArcRotateCamera, Engine, FreeCamera, HemisphericLight, Mesh, MeshBuilder, PointLight, Scene,SceneLoader,Vector3 } from "babylonjs";
import * as GUI from 'babylonjs-gui';


export default class ControlCheckbox {
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

        const camera = new ArcRotateCamera('camera', -Math.PI / 2,Math.PI / 2.5,100,new Vector3(0,0,0));
        camera.attachControl(this.canvas,true);
        
    
        const light = new PointLight('light',new Vector3(0,1,0),scene);
        light.position = camera.position;

        const url = 'https://playground.babylonjs.com/scenes/';

        let skull:Mesh;
        SceneLoader.ImportMesh('mesh',url,'skull.babylon',scene,(meshs) => {
            camera.target = meshs[0].position;
            skull = meshs[0] as Mesh;
        });


        const atd = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');

        
        const panel = new GUI.StackPanel();
        panel.width = '200px';
        atd.addControl(panel);
        


     

      
        window.addEventListener('resize',() => {
            this.engine.resize();
        })
        return scene;
    
     
    }
    
}