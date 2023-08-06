/*
 * :file description: 
 * :name: /babylon/src/StereroStackPanel.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-06 20:41:41
 * :last editor: 张德志
 * :date last edited: 2023-08-06 20:59:01
 */
import {  ArcRotateCamera, Engine, HemisphericLight, MeshBuilder, Scene,Vector3 } from "babylonjs";
import * as GUI from 'babylonjs-gui';


export default class StereroStackPanel {
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
        

        const box = MeshBuilder.CreateBox('box');

        const manager = new GUI.GUI3DManager();
        const panel = new GUI.StackPanel3D();
        panel.margin = 0.05;
        manager.addControl(panel);
        panel.position.z = -1.5;

        const addButton = function() {
            const btn = new GUI.Button3D();
            panel.addControl(btn);
            btn.onPointerClickObservable.add(() => {
                panel.isVertical = !panel.isVertical
            });

            const txt = new GUI.TextBlock();
            txt.text = 'change orientation';
            txt.color = 'white';
            txt.fontSize = 24;
            btn.content = txt;
        }


        for(let i=0;i < 3;i++) {
            addButton();
        }

        window.addEventListener('resize',() => {
            this.engine.resize();
        })
        return scene;
    
     
    }
    
}