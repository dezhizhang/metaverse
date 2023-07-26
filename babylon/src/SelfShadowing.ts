/*
 * :file description: 
 * :name: /babylon/src/SelfShadowing.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-07-26 08:01:25
 * :last editor: 张德志
 * :date last edited: 2023-07-26 08:18:48
 */
import { ArcRotateCamera, Color3, Engine, HemisphericLight, MeshBuilder, PointLight, Scene,SceneLoader,ShadowGenerator,SpotLight,StandardMaterial,Vector3 } from "babylonjs";


export default class SelfShadowing {
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

        const camera = new ArcRotateCamera('camera', 0, 0.8,90, new Vector3(0,0,0));
        camera.lowerBetaLimit = 0.1;
        camera.upperBetaLimit = (Math.PI / 2) * 0.9;
        camera.lowerRadiusLimit = 1;
        camera.upperRadiusLimit = 150;
        camera.attachControl(this.canvas,true);

        const light = new SpotLight('light',new Vector3(-40,40,-40),new Vector3(1,-1,1),Math.PI / 5,30,scene);

        const b1 = MeshBuilder.CreateBox('b1');
        b1.scaling.y = 10;
        b1.position.y = 5;
        b1.position.x = 0;
        b1.position.z = -10;

        const b2 = MeshBuilder.CreateBox('b2');
        b2.scaling.y = 10;
        b2.position.y = 5;
        b2.position.x = -10;
        b2.position.z = 0; 

        const s = MeshBuilder.CreateSphere('s',{diameter:3});
        s.position.y =  5;
        s.position.x = -7;
        s.position.z = -1;

        const tk = MeshBuilder.CreateTorusKnot('tk',{radius:2.7,tube:0.5,radialSegments:128,tubularSegments:64,p:2,q:3});
        tk.position.y = 5;
        tk.position.x = -1.5;
        tk.position.z = -5;

        // 地面
        const ground = MeshBuilder.CreateGround('ground',{width:200,height:200,subdivisions:100});
        const gMat = new StandardMaterial('gMat');
        gMat.specularColor = new Color3(0,0,0);
        ground.material = gMat;


        const sg = new ShadowGenerator(1023,light);
        sg.addShadowCaster(b1);
        sg.addShadowCaster(b2);
        sg.addShadowCaster(s);
        sg.addShadowCaster(tk);

        b1.receiveShadows = true;
        b2.receiveShadows = true;
        s.receiveShadows = true;
        tk.receiveShadows = true;
        ground.receiveShadows = true;

        

        window.addEventListener('resize',() => {
            this.engine.resize();
        })
        return scene;
        
    }
    
}