/*
 * :file description: 
 * :name: /babylon/src/TranslateRotate.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-28 06:26:34
 * :last editor: 张德志
 * :date last edited: 2023-08-28 08:09:04
 */

import {  ArcRotateCamera, Color3, DynamicTexture, Engine, HemisphericLight, Mesh, MeshBuilder, MultiMaterial, Scene,StandardMaterial,SubMesh,Texture,Vector3 } from "babylonjs";



export default class TranslateRotate {
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

        camera.lowerAlphaLimit = -3;
        camera.upperAlphaLimit = -0.125;
        

        const light = new HemisphericLight('light',new Vector3(0,1,0),scene);

        const plane = MeshBuilder.CreatePlane('plane',{size:4});
        const material = new StandardMaterial('material');

        plane.material = material;

        const textSize = 512;
        const dynTex = new DynamicTexture('dynText',textSize);
        const ctx = dynTex.getContext();

        material.diffuseTexture = dynTex;
        

        let offset = 0;
        scene.onBeforeRenderObservable.add(() => {
            ctx.clearRect(0,0,textSize,textSize);
            ctx.save();
            ctx.fillStyle = 'DarkRed'
            ctx.fillRect(0,0,textSize,textSize);

            let left = 0;
            let top = textSize - (textSize * 0.25);
            let width = 0.25 * textSize;
            let height = 0.25 * textSize;

            const offsetU = ((Math.sign(offset) * 0.5) + 0.5) * (textSize - (textSize * 0.25));
            const offsetV = ((Math.sin(offset) * 0.5) + 0.5) * (-textSize + (textSize * 0.25));

            const rectangleU = width * 0.5 + left;
            const rectangleV = height * 0.5 + top;

            ctx.translate(rectangleU + offsetU, rectangleV + offsetV);

            ctx.rotate(offset);

            ctx.fillStyle = 'DarkOrange';

            ctx.fillRect(-width * 0.5, - height * 0.5,width,height);

            ctx.restore();

            dynTex.update();

            offset += 0.01;
            
        });

    

        window.addEventListener('resize',() => {
            this.engine.resize();
        })

        return scene;

    }
    
}