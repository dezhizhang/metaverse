/*
 * :file description: 
 * :name: /babylon/src/FromDirectionLight.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-07-26 05:02:29
 * :last editor: 张德志
 * :date last edited: 2023-07-26 06:29:35
 */


/*
 * :file description: 
 * :name: /babylon/src/BasicScene.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-07-02 17:49:35
 * :last editor: 张德志
 * :date last edited: 2023-07-25 04:54:40
 */

import { ArcRotateCamera, Color3, DirectionalLight, Engine, HemisphericLight, MeshBuilder, PointLight, Scene,SceneLoader,ShadowGenerator,StandardMaterial,Vector3 } from "babylonjs";


export default class FromDirectionLight {
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
        scene.ambientColor = Color3.FromHexString('#333333');

        const camera = new ArcRotateCamera('camera', - Math.PI / 2, Math.PI /2.5,6, new Vector3(0,0,0));
        camera.attachControl(this.canvas,true);

        const light = new DirectionalLight('light',new Vector3(1,-1,0),scene);
        light.intensity = 1;
        light.position = new Vector3(-2,2,0);
        light.autoCalcShadowZBounds = true;
        light.autoUpdateExtends = true;

        const lightSpere = MeshBuilder.CreateSphere('lightSpere',{diameter:0.5,segments:16});
        lightSpere.position = light.position;
        const lightMat = new StandardMaterial('lightMat');
        lightMat.emissiveColor = Color3.Yellow();
        light.setDirectionToTarget(Vector3.Zero());
        // lightMat.disableLighting = true;
        // lightSpere.material = lightMat;

        const sphere = MeshBuilder.CreateSphere('sphere',{diameter:1,segments:32});
        const sMat = new StandardMaterial('sMat');
        sMat.diffuseColor = Color3.White();
        sMat.ambientColor = Color3.White();
        sphere.material = sMat;
        sphere.position.y = 1;

        const ground = MeshBuilder.CreateGround('ground',{width:6,height:6,subdivisions:2});
        ground.material = sMat;
        ground.receiveShadows = true;

        
        const sg = new ShadowGenerator(128,light);
        sg.useBlurExponentialShadowMap = true;
        sg.addShadowCaster(sphere);

        let t = 0;
        let reverse = false;

        scene.registerBeforeRender(() => {
            t += 0.1;
            if(light.position.x > 2) reverse = true;
            if(light.position.x <-2) reverse = false;
            if(reverse) light.position.x -= 0.05;
            else light.position.x += 0.05;
        })

        window.addEventListener('resize',() => {
            this.engine.resize();
        })
        return scene;
        
    }
    
}