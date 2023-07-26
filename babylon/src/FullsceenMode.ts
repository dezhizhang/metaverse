/*
 * :file description: 
 * :name: /babylon/src/FullsceenMode.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-07-02 17:49:35
 * :last editor: 张德志
 * :date last edited: 2023-07-26 23:21:50
 */

import {  Engine, FreeCamera, HemisphericLight, MeshBuilder, Scene,SceneLoader,Vector3 } from "babylonjs";
import * as GUI from 'babylonjs-gui';


export default class FullsceenMode {
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

        const light = new HemisphericLight('light',new Vector3(0,1,0),scene);
        light.intensity = 0.7;

        // 网格 
        const sphere = MeshBuilder.CreateSphere('sphere',{diameter:2,segments:16});
        sphere.position.y = 1;

        // 网格
        const ground = MeshBuilder.CreateGround('ground',{width:6,height:6,subdivisions:2});

        const adTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');

        const button = GUI.Button.CreateSimpleButton('button','click me');

        button.width = '150px';
        button.height = '32px';
        button.color = 'white';
        button.background = 'green';
        button.cornerRadius = 8;
        button.onPointerClickObservable.add(() => {
            alert('you did it');
        });

        adTexture.addControl(button);

        window.addEventListener('resize',() => {
            this.engine.resize();
        })
        return scene;
        
    }
    
}