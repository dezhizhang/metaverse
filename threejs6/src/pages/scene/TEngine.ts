/*
 * :file description:
 * :name: /threejs6/src/pages/scene/TEngine.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-01-01 21:46:05
 * :last editor: 张德志
 * :date last edited: 2023-01-03 23:37:31
 */
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  Vector3,
  Object3D,
  Vector2,
} from 'three';
import Stats from 'stats.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
import { basicObjectList } from './TBasicObject';
import { lightsList } from './TLights';
import { helperList } from './THelper';
import { codeModelList } from './TCodeModel';
import { framePromise } from './TLoadModel';

class TEngine {
  private dom: HTMLElement;
  private renderer: WebGLRenderer;
  private scene: Scene;
  private stats: Stats;
  private camera: PerspectiveCamera;
  constructor(dom: HTMLElement) {
    this.dom = dom;
    // 创建渲染器
    this.renderer = new WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.shadowMap.enabled = true;
    

    // 创建场影
    this.scene = new Scene();

    // 创建相机
    this.camera = new PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    this.camera.position.set(20, 20, 20);
    this.camera.lookAt(new Vector3(0, 0, 0));
    this.camera.up = new Vector3(0, 1, 0);

    this.addObject(...lightsList);
    // this.addObject(...codeModelList);
    // this.addObject(...basicObjectList);
    framePromise.then((group)=> {
      // group.position.y = 10;
      this.addObject(group as any);
    });


    // 添加坐标线
    this.addObject(...helperList);
  

    // 添加性能监控
    this.stats = new Stats();
    this.dom.appendChild(this.stats.dom);

    // 初始化
    const controls = new OrbitControls(this.camera, this.renderer.domElement);

    const transformControls = new TransformControls(this.camera,this.renderer.domElement);
    // const target = new Object3D();
    // transformControls.attach(target);
    // this.scene.add(target);
    // this.scene.add(transformControls);
    const mouse = new Vector2();
    this.renderer.domElement.addEventListener('mousemove',(event) => {
      const x = event.offsetX;
      const y = event.offsetY;
      
      const width = this.renderer.domElement.offsetWidth;
      const height = this.renderer.domElement.offsetHeight;

      mouse.x = x / width * 2 - 1;
      mouse.y = -y * 2 / height + 1;
      
      
      const vector2 = new Vector2();
    })
    


    this.dom.appendChild(this.renderer.domElement);

    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });

    const renderFn = () => {

      this.stats.update();
      controls.update();
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(renderFn);
    };
    renderFn();
  }
  // 添加几何体
  addObject(...object: Object3D[]) {
    object.forEach((element) => {
      this.scene.add(element);
    });
  }
}

export default TEngine;
