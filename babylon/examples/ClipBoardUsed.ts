/*
 * :file description: 
 * :name: /babylon/src/ClipBoardUsed.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-07-27 06:14:14
 * :last editor: 张德志
 * :date last edited: 2023-07-27 06:50:33
 */


import { ClipboardEventTypes, Engine, FreeCamera, HemisphericLight, MeshBuilder, Scene,SceneLoader,SceneSerializer,Vector3 } from "babylonjs";
import * as GUI from 'babylonjs-gui';

export default class ClipBoardUsed {
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

        // const camera = new ArcRotateCamera('camera', - Math.PI / 2, Math.PI /2.5,6, new Vector3(0,0,0));
        // camera.attachControl(this.canvas,true);

        const camera = new FreeCamera('camera',new Vector3(0,5,-20));
        camera.setTarget(Vector3.Zero());
        camera.attachControl(this.canvas,true);

        const light = new HemisphericLight('light',new Vector3(0,1,0),scene);
        light.intensity = 0.7;

        const box = MeshBuilder.CreateBox('box',{size:3});
        box.position.x = 3;

        const sphere = MeshBuilder.CreateSphere('sphere',{diameter:2,segments:16});
        sphere.position.x = -3;

        const adTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');
        const textblock = new GUI.TextBlock('tb');
        textblock.text = '移动鼠标到球体或盒子上\n然后按下ctr/cmd+c键';
        textblock.fontSize = 24;
        textblock.color = 'white';
        textblock.top = -100;
        adTexture.addControl(textblock);


        adTexture.registerClipboardEvents();

        adTexture.onClipboardObservable.add((evt) => {
            if(evt.type === ClipboardEventTypes.COPY) {
                let pick = scene.pick(scene.pointerX,scene.pointerY);
                if(pick.hit) {
                    const seriaizeData = SceneSerializer.SerializeMesh(pick.pickedMesh);
                    const blob = new Blob([JSON.stringify(seriaizeData)],{type:'application/json;charset=utf-8'});
                    const url = URL.createObjectURL(blob);
                    evt.event.clipboardData?.setData('text/url-list',url);
                    textblock.text = '现在可以按 ctrl/cmd + v\n创建一个新的' + pick.pickedMesh?.name
                }
            }
            if(evt.type === ClipboardEventTypes.PASTE) {
                if(evt.event.clipboardData!?.types.indexOf('text/url-list') > -1) {
                    const blobURL = evt.event.clipboardData?.getData('text/url-list');
                    SceneLoader.ImportMesh('','',blobURL,scene,(meshes) => {
                        const position = new Vector3(Math.random() * 10 + Math.random() * -10,Math.random() * 10 + Math.random() * -10,Math.random() * 10);
                        meshes[0].position = position;
                    })
                }
            };
        })

        window.addEventListener('resize',() => {
            this.engine.resize();
        })
        return scene;
        
    }
    
}