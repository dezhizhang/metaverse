/*
 * :file description: 
 * :name: /babylon/src/ControlLine.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-02 05:08:39
 * :last editor: 张德志
 * :date last edited: 2023-08-02 05:15:50
 */

import {  ArcRotateCamera, Engine, FreeCamera, HemisphericLight, Mesh, MeshBuilder, PointLight, Scene,SceneLoader,Vector3 } from "babylonjs";
import * as GUI from 'babylonjs-gui';


export default class ControlLine {
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

        // 灯光
        const light = new HemisphericLight('light',new Vector3(0,1,0),scene);
        light.intensity = 0.7;

        const adt = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');

        const line = new GUI.Line();
        line.x1 = 20;
        line.y1 = 10;

        line.x2 = 800;
        line.y2 = 350;

        line.lineWidth = 5;
        line.color = 'yellow';
        line.dash = [5,10];

        adt.addControl(line);

        window.addEventListener('resize',() => {
            this.engine.resize();
        })
        return scene;
    
     
    }
    
}