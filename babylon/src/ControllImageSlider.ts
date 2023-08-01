/*
 * :file description: 
 * :name: /babylon/src/ControllImageSlider.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-02 04:50:03
 * :last editor: 张德志
 * :date last edited: 2023-08-02 05:07:01
 */
import {  ArcRotateCamera, Engine, FreeCamera, HemisphericLight, Mesh, MeshBuilder, PointLight, Scene,SceneLoader,Vector3 } from "babylonjs";
import * as GUI from 'babylonjs-gui';


export default class ControllImageSlider {
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

        const adt = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');

        const grid = new GUI.Grid();
        adt.addControl(grid);

        grid.addColumnDefinition(0.25);
        grid.addColumnDefinition(0.25);
        grid.addColumnDefinition(0.25);
        grid.addColumnDefinition(0.25);
        grid.addRowDefinition(0.25);
        grid.addRowDefinition(0.25);
        grid.addRowDefinition(0.25);
        grid.addRowDefinition(0.25);

        const addSlider = function(isVertical:boolean) {

        }
        
    
    

      
        window.addEventListener('resize',() => {
            this.engine.resize();
        })
        return scene;
    
     
    }
    
}