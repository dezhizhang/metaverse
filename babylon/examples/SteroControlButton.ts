/*
 * :file description: 
 * :name: /babylon/src/SteroControlButton.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-06 21:43:14
 * :last editor: 张德志
 * :date last edited: 2023-08-06 21:53:14
 */
import {  Engine, FreeCamera, HemisphericLight, MeshBuilder, Scene,Vector3 } from "babylonjs";
import * as GUI from 'babylonjs-gui';


export default class SteroControlButton {
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
        

        const manager = new GUI.GUI3DManager();
        const panel = new GUI.StackPanel3D();
        manager.addControl(panel);
        const button = new GUI.Button3D('button');
        panel.addControl(button);

        const text = new GUI.TextBlock();
        text.text = 'Button3D';
        text.color = 'white';
        text.fontSize = 36;
        button.content = text;
        
      
        window.addEventListener('resize',() => {
            this.engine.resize();
        })
        return scene;
    
     
    }
    
}