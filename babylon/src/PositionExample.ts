/*
 * :file description: 
 * :name: /babylon/src/PositionExample.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-07-27 08:20:22
 * :last editor: 张德志
 * :date last edited: 2023-07-29 13:49:56
 */
import {  Engine, FreeCamera, HemisphericLight, MeshBuilder, Scene,SceneLoader,Vector3 } from "babylonjs";
import * as GUI from 'babylonjs-gui';


export default class PositionExample {
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

        const rect = new GUI.Rectangle();
        rect.width = 0.2;
        rect.height = '40px';
        rect.cornerRadius = 20;
        rect.color = 'Orange';
        rect.thickness = 4;
        rect.background = 'green';
        adTexture.addControl(rect);

        const label = new GUI.TextBlock();
        label.text = 'Sphere';
        rect.addControl(label);

        rect.linkWithMesh(sphere);
        rect.linkOffsetY = -180;

        const target = new GUI.Ellipse();
        target.width = '20px';
        target.height = '20px';
        target.color = 'orange';
        target.background = 'green';
        target.thickness = 4;
        adTexture.addControl(target);
        target.linkWithMesh(sphere);

        const line = new GUI.Line();
        line.lineWidth = 4;
        line.color = 'orange';
        line.y2= 20;
        line.linkOffsetY = -10;
        adTexture.addControl(line);
        line.linkWithMesh(sphere);
     
        line.connectedControl = rect;
        
      




        window.addEventListener('resize',() => {
            this.engine.resize();
        })
        return scene;
        
    }
    
}