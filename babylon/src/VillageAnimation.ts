/*
 * :file description: 
 * :name: /babylon/src/VillageAnimation.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-07-07 06:47:07
 * :last editor: 张德志
 * :date last edited: 2023-07-07 07:22:45
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
import * as earcut from 'earcut';
import { ArcRotateCamera, Engine, HemisphericLight, MeshBuilder, Scene,SceneLoader,Vector3 } from "babylonjs";


(window as any).earcut = earcut;

export default class VillageAnimation {
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

        const camera = new ArcRotateCamera('camera',-Math.PI / 2, Math.PI / 2.5, 3, new Vector3(0, 0, 0));
        camera.attachControl(this.canvas,true);
        
        const light = new HemisphericLight('light',new Vector3(0,1,0),this.scene);

        // 
        const outline = [
            new Vector3(-0.3, 0, -0.1),
            new Vector3(0.2, 0, -0.1),
        ];

        for(let i=0;i < 20;i++) {
            outline.push(new Vector3(0.2 * Math.cos(i * Math.PI / 40), 0, 0.2 * Math.sin(i * Math.PI / 40) - 0.1));
        }

        outline.push(new Vector3(0,0,0.1));
        outline.push(new Vector3(-0.3,0,0.1));
        const car = MeshBuilder.ExtrudePolygon("car", {shape: outline, depth: 0.2});
        
        return scene;
    }


   
}