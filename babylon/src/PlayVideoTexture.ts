/*
 * :file description: 视频操作
 * :name: /babylon/src/PlayVideoTexture.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-29 05:55:26
 * :last editor: 张德志
 * :date last edited: 2023-08-29 06:30:13
 */
import {
  ArcRotateCamera,
  Color3,
  Engine,
  Mesh,
  MeshBuilder,
  Scene,
  StandardMaterial,
  Vector3,
  VideoTexture,
} from 'babylonjs';

export default class PlayVideoTexture {
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

    const vPlane = MeshBuilder.CreatePlane('vPlane', {
      width: 7.3967,
      height: 5.762,
      sideOrientation: Mesh.DOUBLESIDE,
    });

    vPlane.position = new Vector3(0, 0, 0.1);
    const material = new StandardMaterial('material');
    const texture = new VideoTexture(
      'texture',
      'https://playground.babylonjs.com/textures/babylonjs.mp4',
      scene,
    );
    material.diffuseTexture = texture;
    material.roughness = 1;
    material.emissiveColor = Color3.White();
    vPlane.material = material;

    VideoTexture.CreateFromWebCam(
      scene,
      function (vt) {
        material.emissiveTexture = vt;
      },
      { maxWidth: 265, maxHeight: 256, minWidth: 64, minHeight: 64, deviceId: '' },
      undefined,
      false,
    );

    window.addEventListener('resize', () => {
      this.engine.resize();
    });

    return scene;
  }
}
