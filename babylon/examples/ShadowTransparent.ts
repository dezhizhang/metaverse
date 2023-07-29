/*
 * :file description: 
 * :name: /babylon/src/ShadowTransparent.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-07-25 05:54:08
 * :last editor: 张德志
 * :date last edited: 2023-07-25 06:27:51
 */

import { ArcRotateCamera, Color3, DirectionalLight, Engine,  FreeCamera,  HemisphericLight,  Material,  MeshBuilder,  Scene,ShadowGenerator,StandardMaterial,Texture,Vector3 } from "babylonjs";

export default class ShadowTransparent {
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

        const camera = new FreeCamera('camera',new Vector3(0,5,-10));
        camera.setTarget(Vector3.Zero());
        camera.attachControl(this.canvas,true);

        const light = new HemisphericLight('light',new Vector3(0,1,0),scene);
        light.intensity = 0.2;



        const lt = new DirectionalLight('lt',new Vector3(-1,-1,-1),scene);
        lt.intensity = 0.7;
        lt.position = new Vector3(5,5,5);
        
        const sphere = MeshBuilder.CreateSphere('sphere',{diameter:2,segments:32});
        sphere.position = new Vector3(-1,1.3,0);

        const mt = new StandardMaterial('mt');
        mt.diffuseTexture = new Texture('https://playground.babylonjs.com/texture/cloud.png');
        mt.diffuseTexture.hasAlpha = true;
        mt.transparencyMode = Material.MATERIAL_ALPHABLEND;
        mt.useAlphaFromDiffuseTexture = true;
        mt.diffuseColor = new Color3(0.9,0.7,0.6);

        sphere.material = mt;
        
        const box = MeshBuilder.CreateBox('box',{size:1.5});
        box.position = new Vector3(2,1.5,0);
        const bMat = mt.clone('bMat');
        bMat.backFaceCulling = true;
        bMat.diffuseColor = new Color3(0.9,0.7,0.9);
        box.material = bMat;

        const ground = MeshBuilder.CreateGround('ground',{width:8,height:8});
        ground.receiveShadows = true;

        const sg = new ShadowGenerator(1024,lt);
        sg.useBlurExponentialShadowMap = true;
        sg.blurBoxOffset = 4;
        
        sg.addShadowCaster(sphere);
        sg.addShadowCaster(box);

        sg.enableSoftTransparentShadow= false;
        sg.transparencyShadow = true;

        let t = 0;
        scene.onBeforeRenderObservable.add(() => {
            sphere.rotation.x = Math.cos(t);
            sphere.rotation.y = 2 * Math.sin(t);
            sphere.rotation.z = Math.sin(2 * t);

            box.rotation.x = Math.cos(t);
            box.rotation.y = 2 * Math.sin(t);
            box.rotation.z = Math.sin(2 * t);
            t += 0.01;
        });
        
        window.addEventListener('resize',() => {
            this.engine.resize();
        })
        return scene;
        
    }
    
}