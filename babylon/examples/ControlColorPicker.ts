/*
 * :file description: 
 * :name: /babylon/src/ControlColorPicker.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-03 06:54:09
 * :last editor: 张德志
 * :date last edited: 2023-08-03 07:34:19
 */


import {  ArcRotateCamera, Engine, Mesh, PointLight, Scene,SceneLoader,StandardMaterial,Vector3 } from "babylonjs";
import * as GUI from 'babylonjs-gui';


export default class ControlColorPicker {
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
        const skullMat = new StandardMaterial('skullMat');
        SceneLoader.ImportMesh('skull',url,'skull.babylon',scene,(meshs) => {
            camera.target = meshs[0].position;
            skull = meshs[0] as Mesh;
            skull.material = skullMat;
        });


        const adt = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');

        const panel = new GUI.StackPanel();
        panel.width = '200px';
        panel.isVertical = true;
        panel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        panel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;

        const text = new GUI.TextBlock();
        text.text = 'Diffuse Color';
        text.height = '30px';
        text.color = 'white';
        panel.addControl(text);

        const picker = new GUI.ColorPicker();
        picker.value = skullMat.diffuseColor;
        picker.height = '150px';
        picker.width = '150px';
        picker.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        picker.onValueChangedObservable.add((value) => {
            skullMat.diffuseColor.copyFrom(value);
            text.text = value.toHexString();
        })

        panel.addControl(picker);
        
        window.addEventListener('resize',() => {
            this.engine.resize();
        })
        return scene;
    
     
    }
    
}