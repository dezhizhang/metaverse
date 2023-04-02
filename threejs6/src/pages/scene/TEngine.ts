/*
 * :file description:
 * :name: /threejs6/src/pages/scene/TEngine.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-01-01 21:46:05
 * :last editor: 张德志
 * :date last edited: 2023-04-02 18:34:20
 */
import { AmbientLight, BoxGeometry, Mesh, MeshStandardMaterial, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from 'three';

class TEngine {
  private scene:Scene;
  private dom:HTMLElement;
  private renderer:WebGLRenderer;
  private camera:PerspectiveCamera;

  constructor(dom:HTMLElement) {
    this.dom = dom;
    this.scene = new Scene();
    this.renderer = new WebGLRenderer();
    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight,0.1,1000);
    this.camera.position.set(20,20,20);
    this.camera.lookAt(new Vector3(0,0,0));
    this.camera.up = new Vector3(0,1,0);

    this.dom.appendChild(this.renderer.domElement);
    this.renderer.setSize(window.innerWidth,window.innerHeight);

    const box:Mesh = new Mesh(
      new BoxGeometry(10,10,10),
      new MeshStandardMaterial({
        color:'rgb(255,0,255)'
      }),
    )

    this.scene.add(box);

    // 添加灯光
    const ambientLight:AmbientLight = new AmbientLight('rgb(0,255,255)',1);
    this.scene.add(ambientLight);


    this.renderer.setClearColor('rgb(0,0,0)');

    this.renderer.render(this.scene,this.camera);


  }
  

}

export default TEngine;
