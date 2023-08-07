/*
 * :file description: 
 * :name: /babylon/src/UsingDetailMaps.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-08 05:57:57
 * :last editor: 张德志
 * :date last edited: 2023-08-08 06:41:20
 */
/*
 * :file description: 
 * :name: /babylon/src/UVTilingOffset.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-08 05:26:20
 * :last editor: 张德志
 * :date last edited: 2023-08-08 05:46:43
 */
import {  ArcRotateCamera, Color4, Engine, HemisphericLight, MeshBuilder, PBRMaterial, PointLight, Scene,StandardMaterial,Texture,Vector3 } from "babylonjs";
import * as GUI from 'babylonjs-gui';


export default class UsingDetailMaps {
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
        scene.clearColor = new Color4(0.5,0.5,0.5,1);
    
        const camera = new ArcRotateCamera('camera', -Math.PI / 2,Math.PI / 3,8,new Vector3(0,0,0));
        camera.inertia = 0.7;
        camera.attachControl(this.canvas,true);

        const light = new HemisphericLight('light',new Vector3(0,1,0),scene);
        const light2 = new PointLight('light2',new Vector3(-1,5,3),scene);
        const light3 = new PointLight('light3',new Vector3(3,0.-5),scene);


        const sphere = MeshBuilder.CreateSphere('sphere',{diameter:2,segments:32});
        sphere.position.x = -1;
        sphere.position.y = 1;

        const box = MeshBuilder.CreateBox('box',{size:2});
        box.position = new Vector3(1.8,1,-1.5);

        const ground = MeshBuilder.CreateGround('ground',{width:6,height:6});

        const url = 'https://playground.babylonjs.com/textures/';

        const diffuseTexture = new Texture(`${url}ParallaxDiffuse.png`);
        const detailTexture = new Texture(`${url}detailmap.png`);
        const bumTexture = new Texture(`${url}ParallaxNormal.png`);



        const setDetailTexture = (mat:StandardMaterial | PBRMaterial)=> {
            mat.detailMap.isEnabled = true;
            mat.detailMap.texture = detailTexture;
            mat.detailMap.texture.uScale = mat.saveUVScale || 10;
            mat.detailMap.texture.vScale = mat.saveUVScale || 10;
        }

        const matstd = new StandardMaterial('matstd');
        matstd.diffuseTexture = diffuseTexture;
        matstd.detailMap.isEnabled = true;
        matstd.detailMap.diffuseBlendLevel = 0.1;
        


        

        
        



    


        window.addEventListener('resize',() => {
            this.engine.resize();
        })
        return scene;
    
     
    }
    
}