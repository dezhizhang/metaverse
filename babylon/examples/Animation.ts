/*
 * :file description: 
 * :name: /babylon/examples/Animation.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-07-29 15:49:09
 * :last editor: 张德志
 * :date last edited: 2023-07-29 15:49:10
 */

import { ArcRotateCamera, Engine,  MeshBuilder, Animation, Scene,Vector3 } from "babylonjs";


export default class AnimationBase {
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

        const camera = new ArcRotateCamera('camera', - Math.PI / 2, Math.PI /2.5,6, new Vector3(0,0,0));
        camera.attachControl(this.canvas,true);

        const box = MeshBuilder.CreateBox('box');

        const frameRate = 10;
        const xSlide = new Animation('xSlide',"position.x",frameRate,
            Animation.ANIMATIONTYPE_FLOAT,
            Animation.ANIMATIONLOOPMODE_CYCLE
        );

        const keyFrames:any[] = [];
        keyFrames.push({
            frame:0,
            value:0
        });
        keyFrames.push({
            frame: frameRate,
            value:-2
        });
        keyFrames.push({
            frame: 2 * frameRate,
            value:2
        })

        xSlide.setKeys(keyFrames);
        box.animations.push(xSlide);

        scene.beginAnimation(box,0,2 * frameRate,true);

        window.addEventListener('resize',() => {
            this.engine.resize();
        })
        return scene;
        
    }
    
}