/*
 * :file description: 
 * :name: /babylon/src/DifferentColors.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-16 07:14:49
 * :last editor: 张德志
 * :date last edited: 2023-08-16 07:44:09
 */
import {  ArcRotateCamera, Color4, Engine, HemisphericLight, MeshBuilder, PointLight, Scene,StandardMaterial,Texture,Vector3,Vector4 } from "babylonjs";
import * as GUI from 'babylonjs-gui';


export default class DifferentColors {
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
        camera.setTarget(Vector3.Zero());
        camera.attachControl(this.canvas,true);
    

        const light = new HemisphericLight('light',new Vector3(0,1,0),scene);
        light.intensity = 0.7;
        const point = new PointLight('point',Vector3.Zero(),scene);
        point.intensity = 0.5;
        
        const material = new StandardMaterial('material');
        material.diffuseTexture = new Texture('https://jerome.bousquie.fr/BJS/images/spriteAtlas.png');

        //faceUV
        const columns = 6;
        const rows = 4;

        const faaceUv = new Array<Vector4>(6);
        for(let i=0;i < 6;i++) {
            faaceUv[i] = new Vector4(i / columns,0,(i + 1) / columns,1 / rows);
        }

        const faceColors = new Array<Color4>(6);
        faceColors[1] = new Color4(0,1,0,0.25);
        faceColors[4] = new Color4(1,0,0,1);


        const box = MeshBuilder.CreateBox('box',{
            width:10,
            height:3,
            depth:5,
            faceColors
        });

        box.hasVertexAlpha = true;

        const faceColorsInner = new Array<Color4>(6);
        faceColorsInner[1] = new Color4(0,1,0,1);
        faceColorsInner[4] = new Color4(0,0,1,1);

        const boxInner = MeshBuilder.CreateBox('boxInner',{
            width:3,
            height:1,
            depth:1,
            faceColors:faceColorsInner,
        });

        box.material = material;

        scene.registerAfterRender(() => {
            point.position = camera.position;
        });

        window.addEventListener('resize',() => {
            this.engine.resize();
        })
        return scene;
    }
    
}