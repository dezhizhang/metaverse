/*
 * :file description: 
 * :name: /babylon/src/ParentChildren.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-07-07 05:39:58
 * :last editor: 张德志
 * :date last edited: 2023-07-07 06:34:46
 */
/*
 * :file description:
 * :name: /babylon/src/Village.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-07-02 20:10:04
 * :last editor: 张德志
 * :date last edited: 2023-07-07 05:37:20
 */
import {
    DynamicTexture,
    Engine,
    HemisphericLight,
    Scene,
    Vector3,
    Mesh,
    MeshBuilder,
    SceneLoader,
    StandardMaterial,
    Color3,
    DaydreamController,
} from "babylonjs";
import 'babylonjs-loaders';

export default class ParentChildren {
    engine: Engine;
    scene: Scene;
    constructor(private readonly canvas: HTMLCanvasElement) {
        this.engine = new Engine(this.canvas);
        this.scene = this.createScene();

        this.engine.runRenderLoop(() => {
            this.scene.render();
        });
    }

    // 创建场景
    createScene(): Scene {
        const scene = new Scene(this.engine);

        const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0));
        camera.attachControl(this.canvas, true);
        const light = new HemisphericLight("light", new Vector3(1, 1, 0), this.scene);

        const faceColors:any[] = [];
        faceColors[0] = BABYLON.Color3.Blue();
        faceColors[1] = BABYLON.Color3.Teal()
        faceColors[2] = BABYLON.Color3.Red();
        faceColors[3] = BABYLON.Color3.Purple();
        faceColors[4] = BABYLON.Color3.Green();
        faceColors[5] = BABYLON.Color3.Yellow();
     
        const boxParent = MeshBuilder.CreateBox("Box", {faceColors:faceColors});
        const boxChild = MeshBuilder.CreateBox("Box", {size: 0.5, faceColors:faceColors});
        boxChild.setParent(boxParent);
        
        boxChild.position.x = 0;
        boxChild.position.y = 2;
        boxChild.position.z = 0;
    
        boxChild.rotation.x = Math.PI / 4;
        boxChild.rotation.y = Math.PI / 4;
        boxChild.rotation.z = Math.PI / 4;
    
        boxParent.position.x = 2;
        boxParent.position.y = 0;
        boxParent.position.z = 0;
    
        boxParent.rotation.x = 0;
        boxParent.rotation.y = 0;
        boxParent.rotation.z = -Math.PI / 4;

        this.showAxis(6);
        
        // const boxChildAxes = this.localAxes(1, scene);
     
        return scene;
    }

    showAxis(size:number){
        
        const makeTextPlane = (text:string, color:string, size:number) => {
            const dynamicTexture = new DynamicTexture('DynamicTexture',50,this.scene,true);
            dynamicTexture.hasAlpha = true;
            dynamicTexture.drawText(text,5,40,'bold 36px Arial',color,'transparent',true);
        
            // 创建材质
            const planeMat = new StandardMaterial('TextPlaneMaterial',this.scene);
            planeMat.backFaceCulling = false;
            planeMat.specularColor = new Color3(0,0,0);
            planeMat.diffuseTexture = dynamicTexture;

            // 创建平面
            const plane = MeshBuilder.CreatePlane('TextPlane',{size:size},this.scene);
            plane.material = planeMat;
            return plane;
        };

        const axisX = MeshBuilder.CreateLines('axisX',{
            points:[
                Vector3.Zero(),
                new Vector3(size,0,0),
                new Vector3(size * 0.95,size * 0.05,0),
                new Vector3(size,0,0),
                new Vector3(size * 0.95,-0.05 * size,0)
            ],
        });
        axisX.color = new Color3(1,0,0);
        const xChar = makeTextPlane('X','red',size / 10);
        xChar.position = new Vector3(0.9 * size,-0.05 * size,0);
        
    }

   



}
