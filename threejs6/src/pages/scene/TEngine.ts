/*
 * :file description:
 * :name: /threejs6/src/pages/scene/TEngine.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-01-01 21:46:05
 * :last editor: 张德志
 * :date last edited: 2023-01-01 23:14:44
 */
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  Mesh,
  BoxGeometry,
  MeshBasicMaterial,
  Vector3,
  AmbientLight,
  AxesHelper,
  GridHelper,
} from 'three';
import Stats from 'stats.js';

class TEngine {
  private dom: HTMLElement;
  private renderer: WebGLRenderer;
  private scene: Scene;
  private stats:Stats;
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
      new MeshBasicMaterial({color:'rgb(255,255,0)'}),
    );

    const ambientLight:AmbientLight = new AmbientLight('rgb(255,255,255)',1);
    this.scene.add(ambientLight);

    this.scene.add(box);
    
    // 添加坐标线
    const axesHelper:AxesHelper = new AxesHelper(500);
    this.scene.add(axesHelper);
    
    // 添加网格
    const gridHelper:GridHelper = new GridHelper(500,10,'rgb(200,200,200)','rgb(100,100,100)');
    this.scene.add(gridHelper);

    // 添加性能监控
    this.stats = new Stats();
    this.dom.appendChild(this.stats.dom);



    this.dom.appendChild(this.renderer.domElement);
    // this.render();
  
    window.addEventListener('resize',this.onWindowResize);

    const renderFn = () => {
        box.rotation.x += 0.001;
        this.stats.update();
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(renderFn);
    }
    renderFn();
  }
  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
	this.camera.updateProjectionMatrix();
	this.renderer.setSize( window.innerWidth, window.innerHeight );
  }
//   render() {
   
//     this.renderer.render(this.scene, this.camera);
//     requestAnimationFrame(this.render);
//   }
}

export default TEngine;
