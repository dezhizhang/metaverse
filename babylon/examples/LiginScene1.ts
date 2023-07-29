/*
 * :file description: 
 * :name: /babylon/src/LiginScene1.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-07-23 17:18:27
 * :last editor: 张德志
 * :date last edited: 2023-07-23 17:23:48
 */


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


export default class LiginScene1 {
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

        const light = new HemisphericLight('light',new Vector3(0,1,0),this.scene);

        const  light1 = new HemisphericLight('light1',new Vector3(0,1,0),this.scene);

        light1.diffuse = new Color3(1,0,0);
        light1.specular =  new Color3(0,1,0);
        light1.groundColor = new Color3(0,1,0);

        const sphere = MeshBuilder.CreateSphere('sphere',{diameter:0.5});

        const s:any[] = [];
        for(let i=0;i < 25;i++) {
            s[i] = sphere.clone('sphere' + i);
            s[i].position.x = 2 - i % 5;
            s[i].position.y = 2 - Math.floor(i / 5);
        }

        light.includedOnlyMeshes.push(s[7],s[18]);
        light1.excludedMeshes.push(s[7],s[18],s[10])


        window.addEventListener('resize',() => {
            this.engine.resize();
        })
        return scene;
        
    }
    
}