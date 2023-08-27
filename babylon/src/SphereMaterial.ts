
import {  ArcRotateCamera, Color3, Engine, HemisphericLight, Mesh, MeshBuilder, MultiMaterial, Scene,StandardMaterial,SubMesh,Texture,Vector3 } from "babylonjs";
import * as GUI from 'babylonjs-gui';


export default class SphereMaterial {
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

        const camera = new ArcRotateCamera('camera', -Math.PI / 2,Math.PI / 2.5,8,new Vector3(0,0,0));
        camera.attachControl(this.canvas,true);



        const light = new HemisphericLight('light',new Vector3(0,1,0),scene);

        const ground = MeshBuilder.CreateGround('ground',{width:6,height:6});

        const material1 = new StandardMaterial('material1');
        material1.diffuseColor = new Color3(1,0,0);

        const material2 = new StandardMaterial('material2');
        material2.diffuseColor = new Color3(0,1,0);

        const sphere = MeshBuilder.CreateSphere('sphere',{diameter:2,segments:16});
        sphere.position.y = 1;

        const  cube = MeshBuilder.CreateBox('cube',{size:1,height:3});

        cube.position = new Vector3(1,1.5,0);

        
        // sphere.material = material1;
        // cube.material = material2;


        // const mesh = Mesh.MergeMeshes([sphere,cube],true,true,undefined,false,true);
    

        window.addEventListener('resize',() => {
            this.engine.resize();
        })

        return scene;

    }
    
}