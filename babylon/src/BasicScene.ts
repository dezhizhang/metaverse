

/*
 * :file description: 
 * :name: /babylon/src/BasicScene.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-07-02 17:49:35
 * :last editor: 张德志
 * :date last edited: 2023-07-09 19:53:40
 */

import { ArcRotateCamera, Engine, HemisphericLight, MeshBuilder, PointLight, Scene,SceneLoader,Vector3 } from "babylonjs";


export default class BasicScene {
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

        const camera = new ArcRotateCamera('camera', - Math.PI / 2, Math.PI /2.5,6, new Vector3(0,0,0));
        camera.attachControl(this.canvas,true);

        const sphere = MeshBuilder.CreateSphere('sphere',{diameter:2},this.scene);

        // 创建地面
        const ground = MeshBuilder.CreateGround('ground',{width:6,height:6},this.scene);
        ground.position.y = -1;

        //创建平面
        const plan = MeshBuilder.CreatePlane('plan',{size:6},this.scene);
        plan.rotation.z = Math.PI / 180;

        // 创建立方体
        const box = MeshBuilder.CreateBox('box',{size:2},this.scene);
        box.position.x = 2;
        box.position.z = -2;

        // 圆柱体
        const cylinder = MeshBuilder.CreateCylinder('cylinder',{height:2,diameter:2},this.scene);
        cylinder.position.x = -2;
        cylinder.position.z = -2;
        cylinder.position.y = 2;
        
        
        // 圆环
        const torus = MeshBuilder.CreateTorus('torus',{diameter:3,thickness:1},this.scene);
        
        // 创建灯光
        const light = new HemisphericLight('light',new Vector3(0,1,0),this.scene);


        // 创建点光源
        const pointLight = new PointLight('pointLight',new Vector3(-2,0,0),this.scene);
        pointLight.diffuse = new BABYLON.Color3(1,0,0);
        pointLight.specular = new BABYLON.Color3(1,1,0);
        pointLight.intensity = 0.5;





        window.addEventListener('resize',() => {
            this.engine.resize();
        })
        return scene;
        
    }
    
}