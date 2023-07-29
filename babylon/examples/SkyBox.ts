/*
 * :file description: 
 * :name: /babylon/src/SkyBox.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-07-09 14:43:24
 * :last editor: 张德志
 * :date last edited: 2023-07-09 14:51:36
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

import { CubeTexture, Engine, HemisphericLight, Scene,StandardMaterial,Vector3,MeshBuilder,SpriteManager } from "babylonjs";


export default class SkyBox {
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

        const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0));
        camera.upperBetaLimit = Math.PI / 2.2;
        camera.attachControl(this.canvas, true);
        const light = new HemisphericLight("light", new Vector3(1, 1, 0),this.scene);
    
        const spriteManagerTrees:any = new SpriteManager("treesManager", "https://playground.babylonjs.com/textures/palm.png", 2000, {width: 512, height: 1024}, this.scene);
    
        //We create trees at random positions
        for (let i = 0; i < 500; i++) {
            const tree = new BABYLON.Sprite("tree", spriteManagerTrees);
            tree.position.x = Math.random() * (-30);
            tree.position.z = Math.random() * 20 + 8;
            tree.position.y = 0.5;
        }
    
        for (let i = 0; i < 500; i++) {
            const tree = new BABYLON.Sprite("tree", spriteManagerTrees);
            tree.position.x = Math.random() * (25) + 7;
            tree.position.z = Math.random() * -35  + 8;
            tree.position.y = 0.5;
        }
        
        //Skybox
        const skybox = MeshBuilder.CreateBox("skyBox", {size:150});
          const skyboxMaterial = new StandardMaterial("skyBox", this.scene);
          skyboxMaterial.backFaceCulling = false;
          skyboxMaterial.reflectionTexture = new CubeTexture("https://playground.babylonjs.com/textures/skybox", scene);
          skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
          skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
          skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
          skybox.material = skyboxMaterial;
    
        BABYLON.SceneLoader.ImportMeshAsync("", "https://assets.babylonjs.com/meshes/", "valleyvillage.glb");
    
        return scene;
    }

 
}