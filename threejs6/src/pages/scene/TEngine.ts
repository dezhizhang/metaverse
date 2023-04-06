/*
 * :file description:
 * :name: /threejs6/src/pages/scene/TEngine.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-01-01 21:46:05
 * :last editor: 张德志
 * :date last edited: 2023-04-07 06:00:11
 */
import {
  MOUSE,
  Object3D,
  PerspectiveCamera,
  Raycaster,
  Scene,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three';
import Stats from 'stats.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';

class TEngine {
  private scene: Scene;
  private mouse: Vector2;
  private raycaster:Raycaster;
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

    
    let transing = false;
    tramsformControls.addEventListener("mouseDown",()=> {
      console.log('mouseDown');
      transing = true;
    });

  

    // 初始射线发射器
    this.raycaster = new Raycaster();


     this.mouse = new Vector2();
    let x = 0;
    let y = 0;
    let width = 0;
    let height = 0;
    this.renderer.domElement.addEventListener('mousemove', (event) => {
      x = event.offsetX;
      y = event.offsetY;

      width = this.renderer.domElement.offsetWidth;
      height = this.renderer.domElement.offsetHeight;

      this.mouse.x = (x / width) * 2 - 1;
      this.mouse.y = (-y * 2) / height + 1;
      
    });

    this.renderer.domElement.addEventListener('click',(event) => {
      this.raycaster.setFromCamera(this.mouse,this.camera);
      this.scene.remove(tramsformControls);
      const intersection =  this.raycaster.intersectObjects(this.scene.children,false);
      this.scene.add(tramsformControls);
      if (intersection.length) {
        const object = intersection[0].object;
        tramsformControls.attach(object);
      }
    });
    this.scene.add(tramsformControls);
   

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
