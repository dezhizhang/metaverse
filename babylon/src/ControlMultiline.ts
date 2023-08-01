
/*
 * :file description: 
 * :name: /babylon/src/ControlMultiline.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-02 05:08:39
 * :last editor: 张德志
 * :date last edited: 2023-08-02 05:47:27
 */

import {  ArcRotateCamera, Engine, HemisphericLight, MeshBuilder, Scene,Vector3 } from "babylonjs";
import * as GUI from 'babylonjs-gui';


export default class ControlMultiline {
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

        const camera = new ArcRotateCamera('camera', -Math.PI / 2,Math.PI / 2.5,8,new Vector3(0,0,0));
        camera.attachControl(this.canvas,true);
        

        // 灯光
        const light = new HemisphericLight('light',new Vector3(0,1,0),scene);
        light.intensity = 0.7;

        // 网格实体
        const positions = [
            new Vector3(-3,0,0),
            new Vector3(-2,0,1),
            new Vector3(-1,-3,0),
            new Vector3(0,0,0),
            new Vector3(1,1,0),
            new Vector3(2,2,4),
            new Vector3(3,2,-2),
        ];

        const spheres = positions.map((position,index) => {
            const sphere = MeshBuilder.CreateSphere(`sphere${index}`);
            sphere.position = position;
            return sphere;
        });

        // GUI
        const adt = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');

        const btn = GUI.Button.CreateSimpleButton('btn','Button');
        btn.width = '100px';
        btn.height = '50px';
        btn.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        btn.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        btn.left = '30%';
        btn.top = '30px';

        adt.addControl(btn);

        const line = new GUI.MultiLine();
        line.add(btn);
        line.add(...spheres);
        line.add({x:'50px',y:'50%'},btn);
        adt.addControl(line);


        window.addEventListener('resize',() => {
            this.engine.resize();
        })
        return scene;
    
     
    }
    
}