/*
 * :file description:
 * :name: /threejs6/src/pages/scene/TEngine.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-01-01 21:46:05
 * :last editor: 张德志
 * :date last edited: 2023-04-02 20:43:12
 */
import {
  AmbientLight,
  AxesHelper,
  BoxGeometry,
  GridHelper,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
} from 'three';
import Stats from 'stats.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

class TEngine {
  private scene: Scene;
  private dom: HTMLElement;
  private renderer: WebGLRenderer;
  private camera: PerspectiveCamera;

  constructor(dom: HTMLElement) {
    this.dom = dom;
    this.scene = new Scene();
    this.renderer = new WebGLRenderer({
      antialias:true
    });
    this.camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    this.camera.position.set(20, 20, 20);
    this.camera.lookAt(new Vector3(0, 0, 0));
    this.camera.up = new Vector3(0, 1, 0);

    this.dom.appendChild(this.renderer.domElement);
    this.renderer.setSize(window.innerWidth, window.innerHeight);

  
    // 添加坐标
    const axesHelper:AxesHelper = new AxesHelper(500);
    this.scene.add(axesHelper);

    // 添加网格
    const gridHelper:GridHelper = new GridHelper(
      500,
      20,
      'rgb(200,200,200)',
      'rgb(100,100,100)'
    )
    this.scene.add(gridHelper);

    // 添加性能监控
    const stats:any = new Stats();
    const statsDom = stats.domElement;
    statsDom.style.position = 'fixed';
    statsDom.style.top = '0px';
    statsDom.style.right = '5px';
    statsDom.style.left = 'unset';

    dom.appendChild(statsDom);

    const orbitControls:OrbitControls = new OrbitControls(this.camera,this.renderer.domElement);
    orbitControls.autoRotate = true;
    orbitControls.enableDamping = true;

    


    this.renderer.setClearColor('rgb(0,0,0)');

    const renderFn = () => {
      stats.update();
      // orbitControls.update();

      this.renderer.render(this.scene,this.camera);
      requestAnimationFrame(renderFn);
    }
    renderFn();
  }
  addObject(...object:Object3D[]) {
    object.forEach(elem => {
      this.scene.add(elem)
    })
  }
}

export default TEngine;
