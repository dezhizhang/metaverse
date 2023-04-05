/*
 * :file description:
 * :name: /threejs6/src/pages/scene/TEngine.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-01-01 21:46:05
 * :last editor: 张德志
 * :date last edited: 2023-04-06 05:08:43
 */
import {
  Object3D,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
} from 'three';
import Stats from 'stats.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'

class TEngine {
  private scene: Scene;
  private dom: HTMLElement;
  private renderer: WebGLRenderer;
  private camera: PerspectiveCamera;
  protected tramsformControls:TransformControls;
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
    this.camera.position.set(200, 200, 200);
    this.camera.lookAt(new Vector3(0, 0, 0));
    this.camera.up = new Vector3(0, 1, 0);

    this.dom.appendChild(this.renderer.domElement);
    this.renderer.shadowMap.enabled = true;
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  

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



    const tramsformControls = new TransformControls(this.camera,this.renderer.domElement);
    this.scene.add(tramsformControls);
    
    

    this.renderer.setClearColor('rgb(0,0,0)');

    const renderFn = () => {
      stats.update();
      // orbitControls.update();

      this.renderer.render(this.scene,this.camera);
      requestAnimationFrame(renderFn);
    }
    renderFn();

    this.tramsformControls = tramsformControls;
  }
  addObject(...object:Object3D[]) {
    object.forEach(elem => {
      this.scene.add(elem)
    })
  }
}

export default TEngine;
