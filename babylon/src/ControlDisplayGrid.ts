/*
 * :file description: 
 * :name: /babylon/src/ControlDisplayGrid.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-03 07:28:15
 * :last editor: 张德志
 * :date last edited: 2023-08-03 07:32:13
 */

import {  ArcRotateCamera, Engine, Scene,Vector3 } from "babylonjs";
import * as GUI from 'babylonjs-gui';


export default class ControlDisplayGrid {
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

        const adt = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');
        const dg = new GUI.DisplayGrid();
        dg.minorLineColor = 'purple';
        // dg.width = '500px';
        // dg.height = '300px';

        adt.addControl(dg);
        



        window.addEventListener('resize',() => {
            this.engine.resize();
        })
        return scene;
    
     
    }
    
}