/*
 * :file description: 
 * :name: /babylon/src/LightTexure.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-07-23 17:42:00
 * :last editor: 张德志
 * :date last edited: 2023-07-23 17:58:00
 */


import { ArcRotateCamera, Engine, HemisphericLight, MeshBuilder, PointLight, Scene,SceneLoader,ShadowGenerator,StandardMaterial,Texture,Vector3 } from "babylonjs";


export default class LightTexure {
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

        const camera = new ArcRotateCamera('camera', - Math.PI / 2, Math.PI /2.5,25, new Vector3(0,0,0));
        camera.attachControl(this.canvas,true);



        const light = new PointLight('light',new Vector3(3,3,2),scene);
        light.intensity = 0.7;

        const lightMap = new Texture('https://t7.baidu.com/it/u=2511982910,2454873241&fm=193&f=GIF');
        const gMat = new StandardMaterial('gMat');
        gMat.lightmapTexture = lightMap;


        const ground = MeshBuilder.CreateGround('ground',{width:20,height:20,subdivisions:4});
        ground.material = gMat;
        ground.receiveShadows = true;


        const sphere = MeshBuilder.CreateSphere('sphere',{diameter:2},scene);
        sphere.position.z = -1;
        sphere.position.y = 2;
        const shadowGen = new ShadowGenerator(1024,light);
        shadowGen.addShadowCaster(sphere);


        let curTime = 0;
        scene.onBeforeRenderObservable.add(() => {
            curTime += this.engine.getDeltaTime();
            light.position.x = Math.sin(curTime / 1000) * 5;
        })

        

        window.addEventListener('resize',() => {
            this.engine.resize();
        })
        return scene;
        
    }
    
}