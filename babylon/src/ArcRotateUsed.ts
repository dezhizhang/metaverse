/*
 * :file description: 
 * :name: /babylon/src/ArcRotateUsed.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-07-30 10:32:32
 * :last editor: 张德志
 * :date last edited: 2023-07-30 10:50:13
 */
/*
 * :file description: 
 * :name: /babylon/src/BaseScene.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-07-30 10:28:37
 * :last editor: 张德志
 * :date last edited: 2023-07-30 10:28:38
 */
import { ArcRotateCamera, Engine, Scene,Vector3, HemisphericLight, ActionManager,  ExecuteCodeAction, SpriteManager, Sprite, UniversalCamera, MeshBuilder, StandardMaterial, Color3, Mesh } from "babylonjs";


export default class UniversalCameraScene {
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

        const camera = new ArcRotateCamera('camera', -Math.PI / 2,Math.PI / 2.5,24,new Vector3(0,0,0));
        camera.attachControl(this.canvas,true);

        const light = new HemisphericLight('light',new Vector3(0,1,0),scene);

        // 材料
        const redMat = new StandardMaterial('red');
        redMat.diffuseColor = Color3.Red();
        redMat.emissiveColor = Color3.Red();
        redMat.specularColor = Color3.Red();

        const greenMat = new StandardMaterial('green');
        greenMat.diffuseColor = Color3.Green();
        greenMat.emissiveColor = Color3.Green();
        greenMat.specularColor = Color3.Green();
        
        const blueMat = new StandardMaterial('blue');
        blueMat.diffuseColor = Color3.Blue();
        blueMat.emissiveColor = Color3.Blue();
        blueMat.specularColor = Color3.Blue();

        const planRed = MeshBuilder.CreatePlane('planRed',{size:2,sideOrientation:Mesh.DOUBLESIDE});
        planRed.position.x = -3;
        planRed.position.z = 0;
        planRed.material = redMat;

        const planGreen = MeshBuilder.CreatePlane('planRed',{size:2,sideOrientation:Mesh.DOUBLESIDE});
        planGreen.position.x = 3;
        planGreen.position.z = -1.5;
        planGreen.material = greenMat;


        const planBlue = MeshBuilder.CreatePlane('planRed',{size:2,sideOrientation:Mesh.DOUBLESIDE});
        planBlue.position.x = 3;
        planBlue.position.z = 1.5;
        planBlue.material = blueMat;

        const ground =  MeshBuilder.CreateGround('ground',{height:6,width:6})
        
        window.addEventListener('resize',() => {
            this.engine.resize();
        })
        return scene;
        
    }
    
}