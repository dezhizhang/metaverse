/*
 * :file description: 
 * :name: /babylon/src/Village.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-07-02 20:10:04
 * :last editor: 张德志
 * :date last edited: 2023-07-02 20:21:14
 */


/*
 * :file description: 
 * :name: /babylon/src/BasicScene.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-07-02 17:49:35
 * :last editor: 张德志
 * :date last edited: 2023-07-02 20:07:25
 */

import { ArcRotateCamera, Engine, HemisphericLight, MeshBuilder, Scene, Vector3, Sound } from "babylonjs";


export default class Village {
    engine: Engine;
    scene: Scene;
    constructor(private readonly canvas: HTMLCanvasElement) {
        this.engine = new Engine(this.canvas);
        this.scene = this.CreateScene();

        this.engine.runRenderLoop(() => {
            this.scene.render();
        })
    }

    // 创建场景
    CreateScene(): Scene {
        const scene = new Scene(this.engine);

        const camera = new ArcRotateCamera('camera', - Math.PI / 2, Math.PI / 2.5, 10, new Vector3(0, 0, 0));
        camera.attachControl(this.canvas, true);

        // 创建灯光
        const light = new HemisphericLight('light', new Vector3(1, 1, 0), this.scene);

        const box = MeshBuilder.CreateBox('box');
        box.position.y = 0.5;

        // 添加声音
        const bounce = new Sound('bounce','https://playground.babylonjs.com/sounds/bounce.wav',this.scene);
        setInterval(() => bounce.play(),3000);
    

        // 创建平面
        const ground = MeshBuilder.CreateGround('ground', { width: 10, height: 10 });


        return scene;
    }


}