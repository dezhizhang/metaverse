

/*
 * :file description: 
 * :name: /babylon/src/LiginScene.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-07-02 17:49:35
 * :last editor: 张德志
 * :date last edited: 2023-07-23 16:50:48
 */

import { ArcRotateCamera, Color3, DirectionalLight, Engine, HemisphericLight, MeshBuilder, PointLight, Scene,SceneLoader,SpotLight,Vector3 } from "babylonjs";


export default class LiginScene {
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

        const camera = new ArcRotateCamera('camera',-Math.PI / 2,Math.PI / 2.5,5,new Vector3(0,0,0));
        camera.attachControl(this.canvas,true);

        // 点光源
        // const light = new PointLight('light',new Vector3(0,1,0),this.scene);
        // light.diffuse = new Color3(1,0,0);
        // light.specular = new Color3(0,1,0);

        // 平行光
        // const light = new DirectionalLight('light',new Vector3(0,-1,0),this.scene);
        // light.diffuse = new Color3(1,0,0);
        // light.specular = new Color3(0,1,0);

        // 点光源
        const light = new SpotLight('light',new Vector3(-0.6,1,-0.5),new Vector3(0,-1,0),Math.PI / 2,1.5,this.scene);
        light.diffuse = new Color3(1,0,0);

        
        const ground = MeshBuilder.CreateGround('ground',{width:4,height:4})
        
        


        // const sphere = MeshBuilder.CreateSphere('sphere');
 


        window.addEventListener('resize',() => {
            this.engine.resize();
        })
        return scene;
        
    }
    
}