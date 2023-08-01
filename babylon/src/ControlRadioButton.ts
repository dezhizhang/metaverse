/*
 * :file description: 
 * :name: /babylon/src/ControlRadioButton.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-02 04:23:22
 * :last editor: 张德志
 * :date last edited: 2023-08-02 04:38:57
 */
/*
 * :file description: 
 * :name: /babylon/src/ControllInputText.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-07-30 10:28:37
 * :last editor: 张德志
 * :date last edited: 2023-08-01 07:51:55
 */

import {  Engine, FreeCamera, HemisphericLight, MeshBuilder, Plane, Scene,Vector3 } from "babylonjs";
import * as GUI from 'babylonjs-gui';


export default class ControlRadioButton {
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

        const camera = new FreeCamera('camera',new Vector3(0,5,-10));
        camera.setTarget(Vector3.Zero());
        camera.attachControl(this.canvas,true);

        const light = new HemisphericLight('light',new Vector3(0,1,0),scene);
        light.intensity = 0.7;


        // 网格
        const ground = MeshBuilder.CreateGround('ground',{width:6,height:6,subdivisions:2});

        const adTexture = GUI.AdvancedDynamicTexture.CreateForMesh(ground,256,256,false);

       const panel = new GUI.StackPanel();
       adTexture.addControl(panel);

       const txt = new GUI.TextBlock();
       txt.text = 'please select on';
       txt.height = '50px';
       txt.color = 'white';

       panel.addControl(txt);

       const addRadio = function(text:string,parent:GUI.StackPanel) {
        const btn = new GUI.RadioButton();
        btn.width = '20px';
        btn.height = '20px';
        btn.color = 'white';
        btn.background = 'green';

        btn.onIsCheckedChangedObservable.add((state)=> {
            if(state) {
                txt.text + 'you selected' + text
            }
        });
        const header = GUI.Control.AddHeader(btn,text,'100px',{isHorizontal:true,controlFirst:true});
        header.height = '30px';
        header.color = 'white';
        parent.addControl(header);
       }
       
        addRadio('Red',panel);
        addRadio('Green',panel);
        addRadio('Yellow',panel);
    

        window.addEventListener('resize',() => {
            this.engine.resize();
        })
        return scene;
    
     
    }
    
}