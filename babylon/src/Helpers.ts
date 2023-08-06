
import {  Engine, FreeCamera,Scene,Vector3 } from "babylonjs";
import * as GUI from 'babylonjs-gui';


export default class Helpers {
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

        const grid = new GUI.Grid();
        grid.background = 'black';
        grid.addColumnDefinition(0.25);
        grid.addColumnDefinition(0.25);
        grid.addColumnDefinition(0.25);
        grid.addColumnDefinition(0.25);

        grid.addRowDefinition(0.5);
        grid.addRowDefinition(0.5);

        const adTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');
        adTexture.addControl(grid);

    

        const colors = ['red','green','blue','yellow'];

        const ellipse = colors.map((color:string,index:number) => {
            const c = new GUI.Ellipse(`circle${index}`);
            c.background = color;
            c.width = '100px';
            c.height = '100px';
            c.thickness = 0;
            grid.addControl(c,0,index);
            return c;
        });

        const panel = new GUI.StackPanel();
        grid.addControl(panel,0,1);

        const text = new GUI.TextBlock();
        text.text = 'Radius:100';
        text.width = '200px';
        text.height = '440px';
        text.color = 'white';

        text.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        panel.addControl(text);

        const slider = new GUI.Slider();
        slider.width = '200px';
        slider.height = '30px';
        slider.background = 'gray';
        slider.color = 'magenta';
        slider.minimum = 10;
        slider.maximum = 100;
        slider.value = 100;
        slider.step = 1;
        slider.isThumbCircle = true;

        slider.onValueChangedObservable.add((value) => {
            text.text = `Radius:${value}`;
            ellipse.forEach((e) => {
                e.height = String(value) + 'px';
                e.width = String(value) + 'px'
            })
        });

        panel.addControl(slider);

        // 多选
        const panelCheck = new GUI.StackPanel();
        grid.addControl(panelCheck,1,1);

        const checks = colors.map((color:string,index:number) => {
            const check = GUI.Checkbox.AddCheckBoxWithHeader(color,(v) => {
                ellipse[index].isVisible = v;
            });
            check.children[0].color = color;
            panelCheck.addControl(check);
            return check;
        })

        window.addEventListener('resize',() => {
            this.engine.resize();
        })
        return scene;
    
     
    }
    
}