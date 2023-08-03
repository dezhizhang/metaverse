/*
 * :file description: 
 * :name: /babylon/src/MaterialUsed.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-04 05:44:38
 * :last editor: 张德志
 * :date last edited: 2023-08-04 06:16:42
 */
import {  ArcRotateCamera, Color3, Engine, HemisphericLight, Mesh, MeshBuilder, PointLight, Scene,SpotLight,StandardMaterial,Vector3 } from "babylonjs";
import * as GUI from 'babylonjs-gui';


export default class MaterialUsed {
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

        const camera = new ArcRotateCamera('camera', -Math.PI / 2,Math.PI / 3,10,new Vector3(0,0,0));
        camera.attachControl(this.canvas,true);

        // material
        const redMat = new StandardMaterial('redMat');
        redMat.emissiveColor = new Color3(1,0,0);
        
        const greenMat = new StandardMaterial('greenMat');
        greenMat.emissiveColor = new Color3(0,1,0);


        const blueMat = new StandardMaterial('blueMat');
        blueMat.emissiveColor = new Color3(0,0,1);

        const whiteMat = new StandardMaterial('whiteMat');
        whiteMat.emissiveColor = new Color3(1,1,1);

        //red
        const redLight = new SpotLight('redLight',new Vector3(-0.9,1,-1.8),new Vector3(0,-1,0),Math.PI / 2,1.5,scene);
        redLight.diffuse = new Color3(1,0,0);
        redLight.specular = new Color3(0,0,0);

        
        //green
        const greenLight = new SpotLight('greenLight',new Vector3(0,1,-0.5),new Vector3(0,-1,0),Math.PI / 2,1.5,scene);
        greenLight.diffuse = new Color3(0,1,0);
        greenLight.specular = new Color3(0,0,0);


        const blueLight = new SpotLight('blueLight',new Vector3(-0.9,1,-1.8),new Vector3(0,-1,0),Math.PI / 2,1.5,scene);
        blueLight.diffuse = new Color3(0,0,1);
        blueLight.specular = new Color3(0,0,0);

        const whiteLight = new SpotLight('whiteLight',new Vector3(0,1,1),new Vector3(0,-1,0),Math.PI / 2,1.5,scene);
        whiteLight.diffuse = new Color3(1,1,1);
        whiteLight.specular = new Color3(0,0,0);

        //mesh

        const redSphere = MeshBuilder.CreateSphere('redSphere',{diameter:0.25});
        redSphere.material = redMat;
        redSphere.position = redLight.position;


        const greenSphere = MeshBuilder.CreateSphere('greenSphere',{diameter:0.25});
        greenSphere.material = greenMat;
        greenSphere.position = greenLight.position;


        const blueSphere = MeshBuilder.CreateSphere('blueSphere',{diameter:0.25});
        blueSphere.material = blueMat;
        blueSphere.position = blueLight.position;
      
      
        const whiteSphere = MeshBuilder.CreateSphere('whiteSphere',{diameter:0.25});
        whiteSphere.material = whiteMat;
        whiteSphere.position = whiteLight.position;

        const mats = [
            new Color3(1,1,0),
            new Color3(1,0,1),
            new Color3(0,1,1),
            new Color3(1,1,1)
        ];

        const groundMat = new StandardMaterial('groundMat');
        groundMat.diffuseColor = mats[0];
        

        //ground
        const ground = MeshBuilder.CreateGround('ground',{width:4,height:6})

        
      
    
      
        
        window.addEventListener('resize',() => {
            this.engine.resize();
        })
        return scene;
    
     
    }
    
}