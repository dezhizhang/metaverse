/*
 * :file description: 
 * :name: /babylon/src/FaceNumbers.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-16 05:47:47
 * :last editor: 张德志
 * :date last edited: 2023-08-16 06:08:48
 */
import {  ArcRotateCamera, Engine, HemisphericLight, MeshBuilder, Scene,StandardMaterial,Texture,Vector3,Vector4 } from "babylonjs";
import * as GUI from 'babylonjs-gui';


export default class FaceNumbers {
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
        const camera = new ArcRotateCamera('camera', -Math.PI / 2,Math.PI / 2.5,5,new Vector3(0,0,0));
        camera.setTarget(Vector3.Zero());
        camera.attachControl(this.canvas,true);

        const light = new HemisphericLight('light',new Vector3(0,1,0),scene);
        light.intensity = 0.7;

        const light1 = new HemisphericLight('light',new Vector3(0,-1,0),scene);
        light1.intensity = 0.5;


        const mat = new StandardMaterial('mat');
        const texture = new Texture('https://i.imgur.com/lXehwjZ.jpg');
        mat.diffuseTexture = texture;

        const columns = 6;
        const rows = 1;
        const faceUV = new Array<Vector4>(6);

        for(let i=0;i < 6;i++) {
            faceUV[i] = new Vector4(i / columns,0, (i + 1) / columns, 1 / rows);
        }

        const options = {
            faceUV:faceUV,
            wrap:true,
        }

        const box = MeshBuilder.CreateBox('box',options);
        box.material = mat;
    

        window.addEventListener('resize',() => {
            this.engine.resize();
        })
        return scene;
    }
    
}