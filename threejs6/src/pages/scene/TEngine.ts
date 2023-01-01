/*
 * :file description:
 * :name: /threejs6/src/pages/scene/TEngine.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-01-01 21:46:05
 * :last editor: 张德志
 * :date last edited: 2023-01-01 22:04:26
 */
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  Mesh,
  BoxGeometry,
  MeshBasicMaterial,
  Vector3,
} from 'three';

class TEngine {
  private dom: HTMLElement;
  private renderer: WebGLRenderer;
  private scene: Scene;
  private camera: PerspectiveCamera;
  constructor(dom: HTMLElement) {
    this.dom = dom;
    // 创建渲染器
    this.renderer = new WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    // 创建场影
    this.scene = new Scene();

    // 创建相机
    this.camera = new PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    this.camera.position.set(20,20,20);
    this.camera.lookAt(new Vector3(0,0,0));
    this.camera.up = new Vector3(0,1,0);
    

    const box: Mesh = new Mesh(
      new BoxGeometry(10, 10, 10),
      new MeshBasicMaterial(),
    );

    this.scene.add(box);

    this.dom.appendChild(this.renderer.domElement);
    this.render();
  }
  render() {
    // requestAnimationFrame(this.render);
    this.renderer.render(this.scene, this.camera);
  }
}

export default TEngine;
