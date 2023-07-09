/*
 * :file description: 
 * :name: /babylon/src/ParticleSpray.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-07-09 15:12:50
 * :last editor: 张德志
 * :date last edited: 2023-07-09 15:14:32
 */


/*
 * :file description: 
 * :name: /babylon/src/BasicScene.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-07-02 17:49:35
 * :last editor: 张德志
 * :date last edited: 2023-07-08 20:20:35
 */

import { MeshBuilder, Engine,Texture, HemisphericLight, Scene,ParticleSystem,Vector3 } from "babylonjs";


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

        const camera = new BABYLON.ArcRotateCamera("Camera", 3 * Math.PI / 2, Math.PI / 2, 70, BABYLON.Vector3.Zero());
        camera.attachControl(this.canvas, true);
    
        const light = new HemisphericLight("hemi", new Vector3(0, 1, 0),this.scene);
    
        const fountainProfile:any = [
            new BABYLON.Vector3(0, 0, 0),
            new BABYLON.Vector3(10, 0, 0),
            new BABYLON.Vector3(10, 4, 0),
            new BABYLON.Vector3(8, 4, 0),
            new BABYLON.Vector3(8, 1, 0),
            new BABYLON.Vector3(1, 2, 0),
            new BABYLON.Vector3(1, 15, 0),
            new BABYLON.Vector3(3, 17, 0)
        ];
        
        //Create lathe
        const fountain = MeshBuilder.CreateLathe("fountain", {shape: fountainProfile, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, this.scene);
        fountain.position.y = -5;
        
        // Create a particle system
        var particleSystem:any = new ParticleSystem("particles", 5000, scene);
    
        //Texture of each particle
        particleSystem.particleTexture = new Texture("textures/flare.png", this.scene);
    
        // Where the particles come from
        particleSystem.emitter = new BABYLON.Vector3(0, 10, 0); // the starting object, the emitter
        particleSystem.minEmitBox = new BABYLON.Vector3(-1, 0, 0); // Starting all from
        particleSystem.maxEmitBox = new BABYLON.Vector3(1, 0, 0); // To...
    
        // Colors of all particles
        particleSystem.color1 = new BABYLON.Color4(0.7, 0.8, 1.0, 1.0);
        particleSystem.color2 = new BABYLON.Color4(0.2, 0.5, 1.0, 1.0);
        particleSystem.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);
    
        // Size of each particle (random between...
        particleSystem.minSize = 0.1;
        particleSystem.maxSize = 0.5;
    
        // Life time of each particle (random between...
        particleSystem.minLifeTime = 2;
        particleSystem.maxLifeTime = 3.5;
    
        // Emission rate
        particleSystem.emitRate = 1500;
    
        // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
        particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
    
        // Set the gravity of all particles
        particleSystem.gravity = new BABYLON.Vector3(0, -9.81, 0);
    
        // Direction of each particle after it has been emitted
        particleSystem.direction1 = new BABYLON.Vector3(-2, 8, 2);
        particleSystem.direction2 = new BABYLON.Vector3(2, 8, -2);
    
        // Angular speed, in radians
        particleSystem.minAngularSpeed = 0;
        particleSystem.maxAngularSpeed = Math.PI;
    
        // Speed
        particleSystem.minEmitPower = 1;
        particleSystem.maxEmitPower = 3;
        particleSystem.updateSpeed = 0.025;
    
        // Start the particle system
        particleSystem.start();
    
    
        return scene;
    }

}