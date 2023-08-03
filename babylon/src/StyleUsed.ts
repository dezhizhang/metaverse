/*
 * :file description: 
 * :name: /babylon/src/StyleUsed.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-04 05:33:34
 * :last editor: 张德志
 * :date last edited: 2023-08-04 05:38:20
 */
import {  Engine, FreeCamera, HemisphericLight, MeshBuilder, Scene,Vector3 } from "babylonjs";
import * as GUI from 'babylonjs-gui';


export default class StyleUsed {
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

        const style = adTexture.createStyle();
        style.fontSize = 24;
        style.fontStyle = 'blod';


        const panel = new GUI.StackPanel();
        adTexture.addControl(panel);

        const text1 = new GUI.TextBlock();
        text1.text = 'hello world';
        text1.color = 'white';
        text1.height = '30px';
        text1.fontSize = 24;

        panel.addControl(text1);


        

        const button = GUI.Button.CreateSimpleButton('button','click me');

        button.width = '150px';
        button.height = '32px';
        button.color = 'white';
        button.background = 'green';
        button.cornerRadius = 8;
        button.onPointerClickObservable.add(() => {
           style.fontSize = 32;
           
        });

        adTexture.addControl(button);

        window.addEventListener('resize',() => {
            this.engine.resize();
        })
        return scene;
        
    }
    
}