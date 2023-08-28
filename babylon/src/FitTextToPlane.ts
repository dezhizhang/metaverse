/*
 * :file description: 
 * :name: /babylon/src/FitTextToPlane.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-28 22:44:19
 * :last editor: 张德志
 * :date last edited: 2023-08-28 23:08:27
 */
import {
  ArcRotateCamera,
  Color3,
  DynamicTexture,
  Engine,
  HemisphericLight,
  Mesh,
  MeshBuilder,
  MultiMaterial,
  Scene,
  StandardMaterial,
  SubMesh,
  Texture,
  Vector3,
} from 'babylonjs';

export default class FitTextToPlane {
  engine: Engine;
  scene: Scene;
  constructor(private readonly canvas: HTMLCanvasElement) {
    this.engine = new Engine(this.canvas);
    this.scene = this.createScene();

    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  // 创建场景
  createScene(): Scene {
    const scene = new Scene(this.engine);

    const camera = new ArcRotateCamera(
      'camera',
      -Math.PI / 2,
      Math.PI / 2.5,
      20,
      new Vector3(0, 0, 0),
    );
    camera.attachControl(this.canvas, true);

    const light = new HemisphericLight('light', new Vector3(0, 0, -1), scene);
    light.intensity = 0.7;

    const planeWidth = 10;
    const planeHeight = 3;

    const plane = MeshBuilder.CreatePlane('plane', { width: planeWidth, height: planeHeight });

    const text = '中文 Some Words to Fit Plan 文字';

    const fontFamily = '微软雅黑';

    const DTWidth = planeWidth * 60;
    const DTHeight = planeHeight * 60;

    const dynTex = new DynamicTexture('dynTex', { width: DTWidth, height: DTHeight });

    const ctx = dynTex.getContext();

    ctx.font = 12 + 'px ' + fontFamily;

    const textWidth = ctx.measureText(text).width;
    const ratio = textWidth / 12;
    
    const fontSize = Math.floor(DTWidth / ratio);

    const font = fontSize + 'px ' + fontFamily;

    dynTex.drawText(text,null,null,font,'#000000','#ffffff',true);
    
    const material = new StandardMaterial('material');
    material.diffuseTexture = dynTex;
    plane.material = material;
    

    


    window.addEventListener('resize', () => {
      this.engine.resize();
    });

    return scene;
  }
}
