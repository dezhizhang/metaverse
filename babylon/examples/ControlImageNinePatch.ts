/*
 * :file description: 
 * :name: /babylon/src/ControlImageNinePatch.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-02 05:56:00
 * :last editor: 张德志
 * :date last edited: 2023-08-02 06:12:40
 */

import {  Engine, FreeCamera, HemisphericLight, MeshBuilder, Scene,Vector3 } from "babylonjs";
import * as GUI from 'babylonjs-gui';


export default class ControlImageNinePatch {
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

        const grid = new GUI.Grid();
        grid.addColumnDefinition(1/3);
        grid.addColumnDefinition(1/3);
        grid.addColumnDefinition(1/3);
        
        const url = 'https://playground.babylonjs.com/textures/';
        const image = new GUI.Image('image',`${url}panel_blue2x.9.png`);

        image.width = '200px';
        image.height = '300px';
        image.populateNinePatchSlicesFromImage = true;
        image.stretch = GUI.Image.STRETCH_NINE_PATCH;
        grid.addControl(image,0,0);

        adTexture.addControl(grid);

        const image1 = new GUI.Image('image',`${url}panel_blue2x.9.inv.png`);

        image1.width = '200px';
        image1.height = '300px';
        image1.populateNinePatchSlicesFromImage = true;
        image1.stretch = GUI.Image.STRETCH_NINE_PATCH;
        grid.addControl(image1,0,1);

        adTexture.addControl(grid);

        const image2 = new GUI.Image('image',`${url}panel_blue2x.9.direct.png`);

        image2.width = '200px';
        image2.height = '300px';
        image2.sliceLeft = 10;
        image2.sliceRight = 75;
        image2.sliceTop = 10;
        image2.sliceBottom = 50;
        
        // image2.populateNinePatchSlicesFromImage = true;
        image2.stretch = GUI.Image.STRETCH_NINE_PATCH;
        grid.addControl(image2,0,2);

        adTexture.addControl(grid);
        
        
    

        window.addEventListener('resize',() => {
            this.engine.resize();
        })
        return scene;
        
    }
    
}