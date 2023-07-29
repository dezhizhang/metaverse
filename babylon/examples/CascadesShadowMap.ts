

import { ArcRotateCamera, CascadedShadowGenerator, Color3, DirectionalLight, Engine, LightGizmo, Mesh, MeshBuilder, Scene,StandardMaterial,Vector3 } from "babylonjs";


export default class CascadesShadowMap {
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

        const sceneSize = 2000;

        const camera = new ArcRotateCamera('camera', - Math.PI / 2, Math.PI /2.5,sceneSize * 1.1, new Vector3(0,0,0));
        camera.attachControl(this.canvas,true);

        const light = new DirectionalLight('light',new Vector3(0,-1,-1),scene);
        light.intensity = 0.8;
        light.autoCalcShadowZBounds = true;


        const lightGizmo = new LightGizmo();
        lightGizmo.light = light;

        const base = MeshBuilder.CreateTorusKnot('base',{radius:20,tube:5});
        const material = new StandardMaterial('baseMat');
        material.diffuseColor = Color3.Green();
        base.material = material;


        const objects:any[] = this.populateScene(base,200,sceneSize,scene);

        const floor = MeshBuilder.CreateGround('floor',{width:sceneSize,height:sceneSize});
        floor.receiveShadows = true;

        // 级联shadow
        const csm = new CascadedShadowGenerator(1024,light);
        for(let i=0;i < objects.length;i++) {
            csm.addShadowCaster(objects[i]);
        }


        window.addEventListener('resize',() => {
            this.engine.resize();
        })
        return scene;
        
    }

    populateScene(base:Mesh,numObjs:number,size:number,scene:Scene) {
        const created:any[] = [];
        for(let i=0;i < numObjs;i++) {
            const obj = base.createInstance(`b${i}`);
            obj.position.x = (Math.random() - 0.5) * size;
            obj.position.y = (Math.random() * size * 0.25) + 1;
            obj.position.z = (Math.random() - 0.5) * size;

            obj.rotation = Vector3.Random(0,3.14);
            created.push(obj);
        }
        return created;
    }
    
}