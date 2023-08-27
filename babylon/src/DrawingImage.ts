/*
 * :file description: 
 * :name: /babylon/src/DrawingImage.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-28 07:05:57
 * :last editor: 张德志
 * :date last edited: 2023-08-28 07:16:46
 */
import {  ArcRotateCamera, Color3, DynamicTexture, Engine, HemisphericLight, Mesh, MeshBuilder, MultiMaterial, Scene,StandardMaterial,SubMesh,Texture,Vector3 } from "babylonjs";



export default class DrawingImage {
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
        camera.attachControl(this.canvas,true);


        const light = new HemisphericLight('light',new Vector3(0,1,0),scene);

        const ground = MeshBuilder.CreateGround('ground',{width:20,height:6,subdivisions:25});

        const textureGround = new DynamicTexture('dynamic texture',512);

        const material = new StandardMaterial('material');
        material.diffuseTexture = textureGround;
        ground.material = material;


        const ctx = textureGround.getContext();
        const img = new Image();
        img.src = 'https://playground.babylonjs.com/textures/grass.png';

        img.onload = function() {
            ctx.drawImage(this,0,0);
            textureGround.update();
            ctx.drawImage(this,150,100,100,50,256,256,200,220);
            textureGround.update();
        }

        window.addEventListener('resize',() => {
            this.engine.resize();
        })

        return scene;

    }
    
}