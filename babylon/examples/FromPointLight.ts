/*
 * :file description: 
 * :name: /babylon/src/FromPointLight.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-07-26 04:26:53
 * :last editor: 张德志
 * :date last edited: 2023-07-26 04:54:42
 */


/*
 * :file description: 
 * :name: /babylon/src/BasicScene.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-07-02 17:49:35
 * :last editor: 张德志
 * :date last edited: 2023-07-25 04:54:40
 */

import { ArcRotateCamera, Color3, Engine, HemisphericLight, Mesh, MeshBuilder, PointLight, Scene,SceneLoader,ShadowGenerator,StandardMaterial,Texture,Vector3 } from "babylonjs";


export default class FromPointLight {
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

        const camera = new ArcRotateCamera('camera', 3 * Math.PI / 2, Math.PI /8,10, new Vector3(0,0,0));
        camera.lowerRadiusLimit = 5;
        camera.upperRadiusLimit = 40;
        camera.maxZ = 0;
        camera.attachControl(this.canvas,true);

        // 点光源
        const light = new PointLight('light',new Vector3(0,1,0),scene);
        light.intensity = 0.7;

        // mesh
        const lightImpostor = MeshBuilder.CreateSphere('sphere',{diameter:1,segments:16});
        const lightMat = new StandardMaterial('lightMat');
        lightMat.emissiveColor = Color3.Yellow();
        lightMat.linkEmissiveWithDiffuse = true;
        lightImpostor.material = lightMat;
        lightImpostor.parent = light;

        const knot = MeshBuilder.CreateTorusKnot('knot',{radius:2,tube:0.2,radialSegments:128,tubularSegments:64,p:4,q:1});
        const torus = MeshBuilder.CreateTorus('torus',{diameter:8,thickness:1,tessellation:32});

        const kMat = new StandardMaterial('kMat');
        kMat.diffuseColor = Color3.White();
        knot.material = kMat;

        const tMat = new StandardMaterial('tMat');
        tMat.diffuseColor = Color3.Red();
        torus.material = tMat;

        const container = MeshBuilder.CreateSphere('container',{segments:16,diameter:50,updatable:false,sideOrientation:Mesh.BACKSIDE});
        const cMat = new StandardMaterial('cMat');
        const cTexture = new Texture('https://playground.babylonjs.com/textures/amiga.jpg');
        cTexture.uScale = 10;
        cTexture.vScale = 10;
        cMat.diffuseTexture = cTexture;
        container.material = cMat;

        const sg = new ShadowGenerator(1024,light);
        sg.getShadowMap()?.renderList?.push(knot,torus);
        sg.setDarkness(0.5);
        sg.usePoissonSampling = true;
        sg.bias = 0;

        container.receiveShadows = true;
        torus.receiveShadows = true;
        


        
        
        
        
        
        





        window.addEventListener('resize',() => {
            this.engine.resize();
        })
        return scene;
        
    }
    
}