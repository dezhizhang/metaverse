/*
 * :file description: 
 * :name: /babylon/src/AnalyzingDirection.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-07-02 17:49:35
 * :last editor: 张德志
 * :date last edited: 2023-07-26 07:10:05
 */

import { ArcRotateCamera, DirectionalLight, Engine, HemisphericLight, LightGizmo, MeshBuilder, PointLight, Scene,SceneLoader,ShadowGenerator,Vector3 } from "babylonjs";


export default class AnalyzingDirection {
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

        const camera = new ArcRotateCamera('camera', - Math.PI / 5, Math.PI /3,10, new Vector3(0,0,0));
        camera.attachControl(this.canvas,true);

        const light = new DirectionalLight('light',new Vector3(-1,-1,-1),scene);
        light.intensity = 0.7;
        const g = new LightGizmo();
        g.light = light;

        const sphere =  MeshBuilder.CreateSphere('spere',{diameter:2,segments:32});
        sphere.position.y = 1;

        const ground = MeshBuilder.CreateGround('ground',{width:6,height:6});
        ground.receiveShadows = true;

        const sg = new ShadowGenerator(1024,light);
        sg.addShadowCaster(sphere);

        scene.debugLayer.show({embedMode:true}).then(() => {
            scene.debugLayer.select(light);
        });
        
        window.addEventListener('resize',() => {
            this.engine.resize();
        })
        return scene;
        
    }
    
}