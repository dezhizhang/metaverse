/*
 * :file description:
 * :name: /threejs6/src/pages/scene/TEngine.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-01-01 21:46:05
 * :last editor: 张德志
 * :date last edited: 2023-04-09 14:19:12
 */
import {
  MOUSE,
  Object3D,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
} from 'three';
import Stats from 'stats.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
import { TEventManager } from './TEventManager';

class TEngine {
  private scene: Scene;
  private dom: HTMLElement;
  private renderer: WebGLRenderer;
  private camera: PerspectiveCamera;
  protected tramsformControls: TransformControls;
  constructor(dom: HTMLElement) {
    this.dom = dom;
    this.scene = new Scene();
    this.renderer = new WebGLRenderer({
      antialias: true,
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
    const stats: any = new Stats();
    const statsDom = stats.domElement;
    statsDom.style.position = 'fixed';
    statsDom.style.top = '0px';
    statsDom.style.right = '5px';
    statsDom.style.left = 'unset';

    dom.appendChild(statsDom);

    const orbitControls:OrbitControls = new OrbitControls(this.camera,this.renderer.domElement);
    orbitControls.mouseButtons = {
      LEFT:null as unknown as MOUSE,
      MIDDLE:MOUSE.DOLLY,
      RIGHT:MOUSE.ROTATE
    }

    // 初始化变换控制器
    const tramsformControls = new TransformControls(
      this.camera,
      this.renderer.domElement,
    );

    
    const eventManager = new TEventManager({
      dom:this.renderer.domElement,
      scene:this.scene,
      camera:this.camera
    });

    
  

    this.scene.add(tramsformControls);

    document.addEventListener('keyup',(event) => {
      console.log(event.key);
      if(event.key === 'e') {
        tramsformControls.mode = 'scale';
        return
      }
      if(event.key ==='r') {
        tramsformControls.mode = 'rotate';
        return
      }
      if(event.key == 't') {
        tramsformControls.mode = 'translate';
        return;
      }
    })
   

    this.renderer.setClearColor('rgb(0,0,0)');

    const renderFn = () => {
      stats.update();
      orbitControls.update();

      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(renderFn);
    };
    renderFn();
    this.tramsformControls = tramsformControls;
  }
  addObject(...object: Object3D[]) {
    object.forEach((elem) => {
      this.scene.add(elem);
    });
  }
}

export default TEngine;
