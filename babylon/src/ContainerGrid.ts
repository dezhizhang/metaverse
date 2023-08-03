/*
 * :file description: 
 * :name: /babylon/src/ContainerGrid.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-04 05:20:34
 * :last editor: 张德志
 * :date last edited: 2023-08-04 05:30:20
 */
import { FreeCamera, Engine, Scene, HemisphericLight, Vector3, MeshBuilder } from "babylonjs";
import * as GUI from 'babylonjs-gui';


export default class ContainerGrid {
    engine: Engine;
    scene: Scene;
    constructor(private readonly canvas: HTMLCanvasElement) {
        this.engine = new Engine(this.canvas);
        this.scene = this.createScene();

        this.engine.runRenderLoop(() => {
            this.scene.render();
        })
    }

    // 创建场景
    createScene(): Scene {
        const scene = new Scene(this.engine);

        const camera = new FreeCamera('camera', new Vector3(0, 5, -10));
        camera.setTarget(Vector3.Zero());
        camera.attachControl(this.canvas, true);

        // 灯光
        const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene);
        light.intensity = 0.7;

        const sphere = MeshBuilder.CreateSphere('sphere',{diameter:2,segments:16});
        sphere.position.y = 1;

        const adt = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');

        const ground = MeshBuilder.CreateGround('ground', { width: 6, height: 6, subdivisions: 2 });

        
        const grid = new GUI.Grid();
        grid.background = 'black';

      
        adt.addControl(grid);

        grid.addColumnDefinition(100,true);
        grid.addColumnDefinition(0.5);
        grid.addColumnDefinition(0.5);
        grid.addColumnDefinition(100,true);



        const rect = new GUI.Rectangle();
        rect.background = 'red';
        rect.thickness = 0;
        grid.addControl(rect,0,1)


        window.addEventListener('resize', () => {
            this.engine.resize();
        })
        return scene;


    }

}