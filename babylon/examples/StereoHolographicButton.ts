/*
 * :file description: 
 * :name: /babylon/src/StereoHolographicButton.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-06 21:56:42
 * :last editor: 张德志
 * :date last edited: 2023-08-06 22:06:50
 */
import {  ArcRotateCamera, Engine, HemisphericLight, MeshBuilder, Scene,Vector3 } from "babylonjs";
import * as GUI from 'babylonjs-gui';


export default class StereoHolographicButton {
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
        camera.setTarget(Vector3.Zero());
        camera.attachControl(this.canvas,true);

        const light = new HemisphericLight('light',new Vector3(0,1,0),scene);

        const box = MeshBuilder.CreateBox('box');

        //3D GUI
        const manager = new GUI.GUI3DManager();

        const btn = new GUI.HolographicButton('down');
        btn.position.z = -3;
        btn.text =  'Rotate';
        btn.imageUrl = 'https://playground.babylonjs.com/textures/down.png';
        btn.onPointerClickObservable.add(() => {
            box.position.x -= 0.05;
        })
        manager.addControl(btn);

        
        
      
        window.addEventListener('resize',() => {
            this.engine.resize();
        })
        return scene;
    
     
    }
    
}