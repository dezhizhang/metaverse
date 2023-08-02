/*
 * :file description: 
 * :name: /babylon/src/ContainerAdaptiveClip.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-03 07:39:26
 * :last editor: 张德志
 * :date last edited: 2023-08-03 07:48:16
 */
import {  Engine, FreeCamera, HemisphericLight, MeshBuilder, Scene,Vector3 } from "babylonjs";
import * as GUI from 'babylonjs-gui';


export default class ContainerAdaptiveClip {
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

        const  rect = new GUI.Rectangle();
        rect.width = '200px';
        rect.height = '50px';
        rect.color = 'orange';
        rect.background = 'green';
        rect.cornerRadius = 20;
        rect.thickness = 4;
        rect.adaptHeightToChildren = true;
        rect.isPointerBlocker = true;
        adTexture.addControl(rect);

        const txt = new GUI.TextBlock();
        txt.text = 'hello world';
        txt.color = 'white';
        txt.width = '150px';
        txt.fontSize = 24;
        rect.addControl(txt);
                
        

        window.addEventListener('resize',() => {
            this.engine.resize();
        })
        return scene;
        
    }
    
}