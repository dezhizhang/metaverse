/*
 * :file description: 
 * :name: /babylon/src/ShadowCESM.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-07-23 22:48:51
 * :last editor: 张德志
 * :date last edited: 2023-07-23 23:04:56
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

import { ArcRotateCamera, DirectionalLight, Engine, HemisphericLight, MeshBuilder, PointLight, Scene,SceneLoader,ShadowGenerator,Vector3 } from "babylonjs";


export default class ShadowCESM  {
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

        const camera = new ArcRotateCamera('camera',0,0,100,new Vector3(0,0,0));
        camera.attachControl(this.canvas,true);
        camera.setPosition(new Vector3(80,80,120));

        const light = new DirectionalLight('light',new Vector3(-1,-2,1),scene);
        light.position = new Vector3(20,40,-20);

        const shadowGen = new ShadowGenerator(1024,light);
        const url = 'https://playground.babylonjs.com/scenes/';
        SceneLoader.ImportMesh(
            '',
            url,
            'skull.babylon',
            scene,
            (mesh) => {
                
            }

        )

        // const light = new HemisphericLight('light',new Vector3(0,1,0),scene);
        // light.position = new Vector3(20,40,-20);


        window.addEventListener('resize',() => {
            this.engine.resize();
        })
        
        return scene;
        
    }
    
}