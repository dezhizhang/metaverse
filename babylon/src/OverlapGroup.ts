/*
 * :file description: 
 * :name: /babylon/src/OverlapGroup.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-07-02 17:49:35
 * :last editor: 张德志
 * :date last edited: 2023-07-29 15:00:15
 */

import { ArcRotateCamera, Engine, HemisphericLight, MeshBuilder, PointLight, Scene,SceneLoader,Vector3 } from "babylonjs";
import { AdvancedDynamicTexture, Button, Line } from "babylonjs-gui";


export default class OverlapGroup {
    engine:Engine;
    scene:Scene;
    _buttons:Button[] = [];
    _adt:AdvancedDynamicTexture
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

        const camera = new ArcRotateCamera('camera', - Math.PI / 2, Math.PI /2.5,6, new Vector3(0,0,0));
        camera.attachControl(this.canvas,true);

        const light = new HemisphericLight('light',new Vector3(0,1,0),scene);
        this._adt = AdvancedDynamicTexture.CreateFullscreenUI('UI');


        for(let i=0;i < 100;i++) {
            this.createMesh(i * 0.2,i * 0.2,i,1);
        }

        window.addEventListener('resize',() => {
            this.engine.resize();
        })
        return scene;
        
    }

    createMesh(x:number,y:number,i:number,overlapGroup:number,overlapDeltaMultiplier:number = 1) {
        const sphere = MeshBuilder.CreateSphere(`sphere${i}`);
        sphere.position.x = x;
        sphere.position.y = y;

        const btn = Button.CreateSimpleButton(`btn${i}`,`button-${i}`);
        btn.widthInPixels = 60;
        btn.heightInPixels = 24;
        btn.color = '#fff';
        btn.background = '#000';
        btn.fontWeight = '300';
        btn.fontSizeInPixels = 12;
        btn.alpha = 0.9;
        btn.cornerRadius = 4;
        btn.thickness = 0;
        btn.linkOffsetXInPixels = -60;
        this._adt.addControl(btn);
        btn.linkWithMesh(sphere);

        // 重叠分组
        btn.overlapGroup = overlapGroup;
        btn.overlapDeltaMultiplier = overlapDeltaMultiplier;

        // 引线
        const line = new Line(`line_${i}`);
        line.lineWidth = 4;
        line.color = '#444';
        line.connectedControl = btn;
        this._adt.addControl(line);

        line.linkWithMesh(sphere);
        line.y2 = 0;
        line.dash = [3,3];

        
        
    }
    
}