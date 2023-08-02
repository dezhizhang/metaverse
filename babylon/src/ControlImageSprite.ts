/*
 * :file description: 
 * :name: /babylon/src/ControlImageSprite.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-02 07:57:42
 * :last editor: 张德志
 * :date last edited: 2023-08-02 08:10:56
 */
import {  Engine, FreeCamera, HemisphericLight, MeshBuilder, Scene,SceneLoader,Vector3 } from "babylonjs";
import * as GUI from 'babylonjs-gui';


export default class ControlImageSprite {
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

        const panel = new GUI.StackPanel();
        adTexture.addControl(panel);

        let callFlag = true;

        const button = GUI.Button.CreateSimpleButton('button','click me');

        button.width = '150px';
        button.height = '32px';
        button.color = 'white';
        button.background = 'green';
        button.cornerRadius = 8;
       

        const image = new GUI.Image('image','https://playground.babylonjs.com/textures/player.png');
        image.width = '100px';
        image.height = '100px';
        image.cellHeight = 64;
        image.cellWidth = 64;

        image.sourceHeight = 64;
        image.sourceWidth = 64;

        panel.addControl(image);



        button.onPointerClickObservable.add(() => {
            callFlag = !callFlag;
            if(callFlag) {
                image.cellId = 1;
                button.textBlock!.text = 'cell Animation';
            }else {
                image.cellId = -1;
                image.sourceLeft = 0;
                button.textBlock!.text = 'Source Animation';
            }
        });
        

        adTexture.addControl(button);
        adTexture.addControl(panel);


        setInterval(() => {
            if(callFlag) {
                if(image.cellId < 10) {
                    image.cellId++;
                }else {
                    image.cellId = 1;
                }
            }else {
                image.sourceLeft += image.sourceWidth;
            }
        },50)



        window.addEventListener('resize',() => {
            this.engine.resize();
        })
        return scene;
        
    }
    
}