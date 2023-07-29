/*
 * :file description: 
 * :name: /babylon/src/StreetLights.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-07-09 15:51:59
 * :last editor: 张德志
 * :date last edited: 2023-07-09 19:34:42
 */


/*
 * :file description: 
 * :name: /babylon/src/BasicScene.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-07-02 17:49:35
 * :last editor: 张德志
 * :date last edited: 2023-07-08 20:20:35
 */

import { ArcRotateCamera, Engine, HemisphericLight, Scene,FreeCamera,Vector3,MeshBuilder } from "babylonjs";
import {AdvancedDynamicTexture,Button} from 'babylonjs-gui';


export default class StreetLights {
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

        // This creates a basic Babylon Scene object (non-mesh)
    var scene = new Scene(this.engine);

    // This creates and positions a free camera (non-mesh)
    var camera = new FreeCamera("camera1", new Vector3(0, 5, -10), this.scene);

    // This targets the camera to scene origin
    camera.setTarget(Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(this.canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new HemisphericLight("light1", new Vector3(0, 1, 0), this.scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
    var sphere = MeshBuilder.CreateSphere("sphere1");

    // Move the sphere upward 1/2 its height
    sphere.position.y = -1;

    // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
    var ground = MeshBuilder.CreateGround("ground1");

    // GUI
    var advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI");

    var button1 = Button.CreateSimpleButton("but1", "Click Me");
    button1.width = "150px"
    button1.height = "40px";
    button1.color = "white";
    button1.cornerRadius = 20;
    button1.background = "green";
    button1.onPointerUpObservable.add(function() {
        alert("you did it!");
    });
    advancedTexture.addControl(button1);    

    return scene;
    }


}