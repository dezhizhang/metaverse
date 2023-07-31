/*
 * :file description: 
 * :name: /babylon/src/FromArrayBuffer.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-01 06:12:56
 * :last editor: 张德志
 * :date last edited: 2023-08-01 06:19:49
 */

import { ArcRotateCamera, Engine, Scene, Sound, Vector3 } from "babylonjs";


export default class FromArrayBuffer {
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

        const camera = new ArcRotateCamera('camera',-Math.PI / 2,Math.PI / 2.5,8, new Vector3(0,0,0));
        camera.attachControl(this.canvas,true);

        let gunshot:Sound;

        function soundReady() {
            gunshot.play();
        }
        loadArrayBufferFromURL('https://playground.babylonjs.com/sounds/gunshot.wav')
        function loadArrayBufferFromURL(url:string) {
            const xhr = new XMLHttpRequest();
            xhr.open('GET',url,true);
            xhr.responseType = 'arraybuffer';
            xhr.onreadystatechange = function() {
                if(xhr.readyState ===4 ) {
                    if(xhr.status === 200) {
                        gunshot = new Sound('FromArrayBuffer',xhr.response,scene,soundReady)
                    }
                }
            }
        }
        
        window.addEventListener('resize',() => {
            this.engine.resize();
        })
        return scene;
        
    }
    
}