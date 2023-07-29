/*
 * :file description: 
 * :name: /babylon/src/ShaderScene.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-07-02 17:49:35
 * :last editor: 张德志
 * :date last edited: 2023-07-23 22:43:10
 */

import { ArcRotateCamera, Color3, DirectionalLight, Engine, HemisphericLight, MeshBuilder, PointLight, Scene,SceneLoader,ShadowGenerator,SpotLight,StandardMaterial,Texture,Vector3 } from "babylonjs";


export default class ShaderScene {
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

        const camera = new ArcRotateCamera('camera',0,Math.PI / 3.5,90,new Vector3(0,0,0));
        camera.attachControl(this.canvas,true);
        camera.lowerBetaLimit = 0.1;
        camera.upperBetaLimit = (Math.PI / 2) * 0.9;
        camera.lowerRadiusLimit = 30;
        camera.upperRadiusLimit = 150;

        const light = new DirectionalLight('light',new Vector3(-1,-2,-1),scene);
        light.position = new Vector3(20,40,20);
        light.intensity = 0.5;

        const lightSphere = MeshBuilder.CreateSphere('sphere',{diameter:2,segments:10});
        lightSphere.position = light.position;
        const lightSphereMat = new StandardMaterial('lightMat');
        lightSphereMat.emissiveColor = new Color3(1,1,0);
        lightSphere.material = lightSphereMat;

        //spotLight
        const light2 = new SpotLight('spot',new Vector3(30,40,20),new Vector3(-1-2-1),1.1,16,scene);
        light2.intensity = 0.5;

        const light2Sphere2 = MeshBuilder.CreateSphere('sphere2',{diameter:2,segments:2});
        light2Sphere2.position = light2.position;
        light2Sphere2.material = lightSphereMat;

        const url = 'https://playground.babylonjs.com/textures/';
        const ground = MeshBuilder.CreateGroundFromHeightMap(
            'ground',
            `${url}heightMap.png`,
            {width:100,height:100,subdivisions:100,maxHeight:100,minHeight:100}
        );

        const gMat = new StandardMaterial('ground');
        const texture = new Texture(`${url}ground.jpg`);

        texture.uScale = 6;
        texture.vScale = 6;

        gMat.diffuseTexture = texture;
        gMat.specularColor = new Color3(0,0,0);
        ground.position.y = -2.05;
        ground.material = gMat;
        ground.receiveShadows = true;

        // torus
        const torus = MeshBuilder.CreateTorus('torus',{diameter:4,thickness:2,tessellation:30});
        const box = MeshBuilder.CreateBox('box',{size:3});
        box.parent = torus;

        // shadow
        const shadowGen = new ShadowGenerator(1024,light);
        shadowGen.addShadowCaster(torus);

        //animations
        let alpha = 0;
        scene.registerBeforeRender(() => {
            torus.rotation.x += 0.01;
            torus.rotation.z += 0.02;
            torus.position = new Vector3(Math.cos(alpha) * 30,10,Math.sin(alpha) * 30);
            alpha += 0.01;
        });

        
        window.addEventListener('resize',() => {
            this.engine.resize();
        })
        return scene;
        
    }
    
}