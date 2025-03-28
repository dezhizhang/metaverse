/*
 * :file description: 
 * :name: /babylon/src/WrapSprite.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-16 07:06:38
 * :last editor: 张德志
 * :date last edited: 2023-08-16 07:06:39
 */
/*
 * :file description: 
 * :name: /babylon/src/UVTilingOffset.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-08 05:26:20
 * :last editor: 张德志
 * :date last edited: 2023-08-08 05:46:43
 */
import {  ArcRotateCamera, Engine, HemisphericLight, MeshBuilder, Scene,StandardMaterial,Texture,Vector3 } from "babylonjs";
import * as GUI from 'babylonjs-gui';


export default class WrapSprite {
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

        // const camera = new FreeCamera('camera',new Vector3(0,5,-10));
        const camera = new ArcRotateCamera('camera', -Math.PI / 2,Math.PI / 2.5,5,new Vector3(0,0,0));
        camera.setTarget(Vector3.Zero());
        camera.attachControl(this.canvas,true);

        const light = new HemisphericLight('light',new Vector3(0,1,0),scene);
        light.intensity = 0.7;

        const plan = MeshBuilder.CreatePlane('plan');
        const material = new StandardMaterial('material');
        material.diffuseTexture = new Texture('box.png');

        plan.material = material;
        plan.position.x = -1.5;
        


        window.addEventListener('resize',() => {
            this.engine.resize();
        })
        return scene;
    
     
    }
    
}