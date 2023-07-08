/*
 * :file description: 
 * :name: /babylon/src/WheelAnimation2.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-07-08 21:51:44
 * :last editor: 张德志
 * :date last edited: 2023-07-08 22:12:01
 */
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
import { ArcRotateCamera, Engine, HemisphericLight, StandardMaterial, Scene,SceneLoader,Vector3, Vector4, Texture, MeshBuilder } from "babylonjs";


(window as any).earcut = earcut;

export default class WheelAnimation2 {
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

        const camera = new ArcRotateCamera('camera',-Math.PI / 2,Math.PI / 2.5,1.5,new Vector3(0,0,0));
        camera.attachControl(this.canvas,true);
        const light = new HemisphericLight('light',new Vector3(0,1,0),this.scene);

        //wheel face UVs
        const wheelUV:any[] = [];
        wheelUV[0] = new Vector4(0,0,1,1);
        wheelUV[1] = new Vector4(0,0.5,0,0.5);
        wheelUV[2] = new Vector4(0,0,1,1);

        const wheelMat = new StandardMaterial('wheelMat');
        wheelMat.diffuseTexture = new Texture('https://assets.babylonjs.com/environments/wheel.png');
        
        const wheelRB = MeshBuilder.CreateCylinder('wheelRB',{diameter:0.125,height:0.05,faceUV:wheelUV});
        wheelRB.material = wheelMat;

        const animWheel:any = new BABYLON.Animation('wheelAnimation','rotation.y',30,BABYLON.Animation.ANIMATIONTYPE_FLOAT,BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

        const wheelKeys:any[] = [];
        wheelKeys.push({
            frame:0,
            value:0,
        });

        wheelKeys.push({
            frame:30,
            value: 2 * Math.PI
        });

        animWheel.setKeys(wheelKeys);

        wheelRB.animations = [];
        wheelRB.animations.push(animWheel);
    
        scene.beginAnimation(wheelRB, 0, 30, true);
    
        return scene;


    }


   
}