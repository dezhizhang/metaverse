/*
 * :file description: 
 * :name: /babylon/src/GltfScene.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-07-09 19:53:43
 * :last editor: 张德志
 * :date last edited: 2023-07-09 19:56:45
 */


/*
 * :file description: 
 * :name: /babylon/src/BasicScene.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-07-02 17:49:35
 * :last editor: 张德志
 * :date last edited: 2023-07-09 19:53:40
 */

import { ArcRotateCamera, Engine, HemisphericLight, MeshBuilder, PointLight, Scene,SceneLoader,Vector3 } from "babylonjs";
import 'babylonjs-loaders';

export default class GltfScene {
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

        SceneLoader.Append('model','brain.glb',this.scene,(gltf) => {
            console.log(gltf);
        })


        window.addEventListener('resize',() => {
            this.engine.resize();
        })
        return scene;
        
    }
    
}