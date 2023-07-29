/*
 * :file description: 
 * :name: /babylon/src/WheelAnimation.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-07-08 20:38:43
 * :last editor: 张德志
 * :date last edited: 2023-07-08 21:46:34
 */
import * as earcut from 'earcut';
import { ArcRotateCamera, Engine, HemisphericLight, Scene,SceneLoader,Vector3 } from "babylonjs";


(window as any).earcut = earcut;

export default class WheelAnimation {
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

        const camera = new ArcRotateCamera('camera', -Math.PI / 2,Math.PI / 2.5,2,new Vector3(0,0,0));
        camera.attachControl(this.canvas,true);
        const light = new HemisphericLight('light',new Vector3(1,1,0),this.scene);

        SceneLoader.ImportMeshAsync('','https://assets.babylonjs.com/meshes/','car.babylon').then(() => {
            const wheelRB = scene.getMeshByName('wheelRB');
            const wheelRF = scene.getMeshByName('wheelRF');
            const wheelLB = scene.getMeshByName('wheelLB');
            const wheelLF = scene.getMeshByName('wheelLF');

            scene.beginAnimation(wheelRB, 0, 30, true);
            scene.beginAnimation(wheelRF, 0, 30, true);
            scene.beginAnimation(wheelLB, 0, 30, true);
            scene.beginAnimation(wheelLF, 0, 30, true);
        });

        return scene;
    }


   
}