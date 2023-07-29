/*
 * :file description: 
 * :name: /babylon/src/ParticleSpray.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-07-02 17:49:35
 * :last editor: 张德志
 * :date last edited: 2023-07-09 15:39:07
 */

import { MeshBuilder, Engine,Texture, HemisphericLight, Scene,ParticleSystem,Vector3,ArcRotateCamera } from "babylonjs";


export default class ParticleSpray {
    engine:Engine;
    scene:Scene;
    constructor(private readonly canvas:HTMLCanvasElement) {
        this.engine = new Engine(this.canvas);
        this.scene = this.CreateScene();

        this.engine.runRenderLoop(() => {
            this.scene.render();
        }) 
    }

    // 创建场景
    CreateScene():Scene {

        const scene = new Scene(this.engine);

        const camera = new ArcRotateCamera("camera", 3 * Math.PI / 2, Math.PI / 2,70, Vector3.Zero());
        camera.attachControl(this.scene,true);

        const light = new HemisphericLight('hemi',new Vector3(0,1,0),this.scene);

        const fountainProfile:any[] = [
            new Vector3(0, 0, 0),
            new Vector3(10, 0, 0),
            new Vector3(10, 4, 0),
            new Vector3(8, 4, 0),
            new Vector3(8, 1, 0),
            new Vector3(1, 2, 0),
            new Vector3(1, 15, 0),
            new Vector3(3, 17, 0)
        ];

        const fountain = MeshBuilder.CreateLathe('fountain',{shape:fountainProfile,sideOrientation:BABYLON.Mesh.DOUBLESIDE},this.scene);
        fountain.position.y = -5;

        const particleSystem:any = new ParticleSystem('particles',5000,this.scene);
        particleSystem.particleTexture = new Texture('textures/flare.png',this.scene);


        particleSystem.emitter = new  Vector3(0,10,0);
        particleSystem.minEmitBox = new Vector3(-1,0,0);
        particleSystem.maxEmitBox = new Vector3(1,0,0);

        particleSystem.color1 = new BABYLON.Color4(0.7, 0.8, 1.0, 1.0);
        particleSystem.color2 = new BABYLON.Color4(0.2, 0.5, 1.0, 1.0);
        particleSystem.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);
    
        particleSystem.minSize = 0.1;
        particleSystem.maxSize = 0.5;

        particleSystem.minLifeTime = 2;
        particleSystem.maxLifeTime = 3.5;
        
        particleSystem.emitRate = 1500;

        particleSystem.blendMode =  BABYLON.ParticleSystem.BLENDMODE_ONEONE;
        particleSystem.gravity = new BABYLON.Vector3(0, -9.81, 0);
        
        particleSystem.direction1 =  new BABYLON.Vector3(-2, 8, 2);
        particleSystem.direction2 = new BABYLON.Vector3(2, 8, -2);
        
        particleSystem.minAngularSpeed = 0;
        particleSystem.maxAngularSpeed = Math.PI;

        particleSystem.minEmitPower = 1;
        particleSystem.maxEmitPower = 3;
        particleSystem.updateSpeed = 0.025;
    

        particleSystem.start();
    
    
        return scene;
    }

}