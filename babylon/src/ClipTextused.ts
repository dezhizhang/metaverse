/*
 * :file description: 
 * :name: /babylon/src/ClipTextused.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-07-27 06:48:23
 * :last editor: 张德志
 * :date last edited: 2023-07-27 06:57:30
 */

import { ClipboardEventTypes, Color3, Engine, FreeCamera, HemisphericLight, MeshBuilder, Scene,SceneLoader,SceneSerializer,Vector3 } from "babylonjs";
import * as GUI from 'babylonjs-gui';

export default class ClipTextused {
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
                const textData = evt.event.clipboardData?.getData('text/plain');
                if(textData) {
                    const text = new GUI.TextBlock();
                    text.text = textData;
                    text.color = 'pink';
                    text.fontSize = Math.random() * 25 + 5;
                    text.rotation = Math.random() * 10;
                    text.top = Math.random() * 10 + Math.random() * -100;
                    text.left = Math.random() * 10 + Math.random() * -100;
                    adTexture.addControl(text);
                    
                }else {
                    const msg = new GUI.TextBlock();
                    msg.text = '请复制一些纯文本';
                    msg.color = 'red';
                    adTexture.addControl(msg);
                    
                }
              

            }
        })

        window.addEventListener('resize',() => {
            this.engine.resize();
        })
        return scene;
        
    }
    
}