/*
 * :file description: 
 * :name: /babylon/src/StereroVolumeBasePanel.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-06 21:23:50
 * :last editor: 张德志
 * :date last edited: 2023-08-06 21:32:11
 */

import {  ArcRotateCamera, Engine, HemisphericLight, MeshBuilder, Scene,Vector3 } from "babylonjs";
import * as GUI from 'babylonjs-gui';


export default class StereroVolumeBasePanel {
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

        const camera = new ArcRotateCamera('camera',-Math.PI / 2,Math.PI / 2.5,8,new Vector3(0,0,0));
        camera.attachControl(this.canvas,true);

        const light = new HemisphericLight('light',new Vector3(0,1,0),scene);

        //3D gui
        const manager = new GUI.GUI3DManager();
        const panel = new GUI.SpherePanel();
        manager.addControl(panel);

        panel.margin = 0.2;

        const addButton = function() {
            const btn = new GUI.HolographicButton('orientation');
            panel.addControl(btn);
            btn.text = 'Button #' + panel.children.length;
        }

        panel.blockLayout = true;
        for(let i=0;i < 60;i++) {
            addButton();
        }
        panel.blockLayout = false;
        
        window.addEventListener('resize',() => {
            this.engine.resize();
        })
        return scene;
    
     
    }
    
}