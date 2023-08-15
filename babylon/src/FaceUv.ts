/*
 * :file description: 
 * :name: /babylon/src/FaceUv.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-16 06:09:22
 * :last editor: 张德志
 * :date last edited: 2023-08-16 06:21:52
 */
import {  ArcRotateCamera, Engine, HemisphericLight, MeshBuilder, PointLight, Scene,StandardMaterial,Texture,Vector3,Vector4 } from "babylonjs";
import * as GUI from 'babylonjs-gui';


export default class FaceUv {
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
        const camera = new ArcRotateCamera('camera', -Math.PI / 2,Math.PI / 2.5,20,new Vector3(0,0,0));
        // camera.setTarget(Vector3.Zero());
        camera.attachControl(this.canvas,true);


        const light = new HemisphericLight('light',new Vector3(0,1,0),scene);
        light.intensity = 0.7;
        const point = new PointLight('point',Vector3.Zero(),scene);
        point.intensity = 0.5;

        const material = new StandardMaterial('material');
        material.diffuseTexture = new Texture('https://jerome.bousquie.fr/BJS/images/spriteAtlas.png');
        

        //faaceUv
        const columns = 6;
        const rows = 4;
        const faceUV = new Array<Vector4>(6);
        for(let i=0;i < 6;i++) {
            faceUV[i] = new Vector4(i / columns,0,(i + 1) / columns, 1 / rows);
        }

        const box = MeshBuilder.CreateBox('box',{
            width:10,
            height:3,
            depth:5,
            faceUV:faceUV
        });

        box.material = material;

        scene.registerBeforeRender(() => {
            point.position = camera.position;
        })


        window.addEventListener('resize',() => {
            this.engine.resize();
        })
        return scene;
    }
    
}