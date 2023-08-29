/*
 * :file description: 
 * :name: /babylon/src/FlatTextureAsMap.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-29 07:40:25
 * :last editor: 张德志
 * :date last edited: 2023-08-29 07:59:16
 */

import {
  ArcRotateCamera,
  Color3,
  CubeTexture,
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

export default class FlatTextureAsMap {
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

    const url = 'https://playground.babylonjs.com/textures/Space/space_'
    const box = MeshBuilder.CreateBox('box',{size:1000});
    const material = new StandardMaterial('material');
    material.backFaceCulling = false;
    material.reflectionTexture = new CubeTexture(url,scene,['right.jpg','up.jpg','front.jpg','left.jpg','down.jpg','back.jpg'])
    material.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
    material.diffuseColor = new Color3(0,0,0);
    material.specularColor = new Color3(0,0,0);
    box.material = material;

    const sphere = MeshBuilder.CreateSphere('sphere');
    const material1 = new StandardMaterial('material1');
    material.backFaceCulling = true;
    material.reflectionTexture = new Texture('https://doc.babylonjs.com/img/how_to/Materials/mona_lisa_head.jpg')
    material1.diffuseColor = new Color3(0,0,0);
    material1.specularColor = new Color3(0,0,0);
    sphere.material = material1;


   

    window.addEventListener('resize', () => {
      this.engine.resize();
    });

    return scene;
  }
}
