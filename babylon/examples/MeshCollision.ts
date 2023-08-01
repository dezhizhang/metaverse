/*
 * :file description: 
 * :name: /babylon/src/MeshCollision.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-07-30 15:00:55
 * :last editor: 张德志
 * :date last edited: 2023-07-30 15:30:35
 */

import { ArcRotateCamera, Engine, Scene,Vector3, HemisphericLight, StandardMaterial,  Color3, Texture,MeshBuilder } from "babylonjs";


export default class MeshCollision {
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

        const camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2.5,8,new Vector3(0,0,0));
        camera.attachControl(this.canvas,true);
        

        const light = new HemisphericLight('light',new Vector3(0,1,0),scene);
        light.intensity = 0.7;

        const ground = MeshBuilder.CreateGround('ground',{width:30,height:30});
        const gMat = new StandardMaterial('gMat');
        gMat.diffuseColor = Color3.White();
        gMat.backFaceCulling = false;
        ground.material = gMat;

        ground.checkCollisions = true;

        const bMat = new StandardMaterial('bMat');
        bMat.diffuseTexture = new Texture('https://playground.babylonjs.com/textures/crate.png');
        const box = MeshBuilder.CreateBox('box',{size:2});
        box.material = bMat;
        box.checkCollisions = true;


        // 复制场景
        const randNum = function(min:number,max:number) {
            return min + (max - min) * Math.random();
        }

        let theta = 0;
        const boxNum = 6;
        const radius = 6;

        const x = (radius + randNum(-radius / 2,radius / 2)) * Math.cos(theta + randNum(-theta / 10,theta / 1));
        const y = (radius + randNum(-radius / 2,radius / 2)) * Math.cos(theta + randNum(-theta / 10,theta / 10))

        box.position = new Vector3(x,y,0);

        const boxes = [box];
        
        for(let i=1; i< boxNum;i++) {
            theta += 2 * Math.PI / boxNum;
            const newBox = box.clone('box' + i);
            boxes.push(newBox);
            newBox.position =  new Vector3(x,y,0);
        }
        
    
        window.addEventListener('resize',() => {
            this.engine.resize();
        })
        return scene;
        
    }
    
}