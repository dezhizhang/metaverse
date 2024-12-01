/*
 * :file description: 
 * :name: /physics/examples/7.物体平面处理.js
 * :author:张德志
 * :copyright: (c) 2024, Xiaozhi
 * :date created: 2024-12-02 06:28:44
 * :last editor: 张德志
 * :date last edited: 2024-12-02 06:28:44
 */
/*
 * :file description:
 * :name: /physics/src/index.js
 * :author:张德志
 * :copyright: (c) 2024, Xiaozhi
 * :date created: 2024-11-26 05:55:59
 * :last editor: 张德志
 * :date last edited: 2024-12-02 06:28:27
 */
import * as THREE from "three";
import * as CANNON from 'cannon-es';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(1,2,10);


// 创建渲染器
const renderer = new THREE.WebGLRenderer({
  antialias:true
});
renderer.setSize(window.innerWidth,window.innerHeight);

//------------------------------------------------------

// 创建物理世界
const world = new CANNON.World();
world.gravity.set(0,-9.82,0);

// 创建物理球
const sphereSphape = new CANNON.Sphere(0.5);
const sphereBody = new CANNON.Body({
  mass:1,
  shape:sphereSphape,
  position: new CANNON.Vec3(0,5,0)
});
world.addBody(sphereBody);

// 创建物理世界的平面
const planeShape = new CANNON.Plane();
const planeBody = new CANNON.Body({
  mass:0,
  shape:planeShape,
  position: new CANNON.Vec3(0,0,0)
});
planeBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI / 2);

world.addBody(planeBody);


//------------------------------------------------------
// 创建一个渲染球体
const sphereGeometry = new THREE.SphereGeometry(0.5,32,32);
const sphereMaterial = new THREE.MeshBasicMaterial({
  color:0x00ff00
});
const sphereMesh = new THREE.Mesh(sphereGeometry,sphereMaterial);
scene.add(sphereMesh);

// 创建渲染平面
const planeGeometry = new THREE.PlaneGeometry(10,10);
const planeMaterial = new THREE.MeshBasicMaterial({
  color:0xffff00
});
const planeMesh = new THREE.Mesh(planeGeometry,planeMaterial);
planeMesh.rotation.x = -Math.PI / 2;
scene.add(planeMesh);



scene.add(new THREE.AxesHelper(5));

// 添加控制器
const controls = new OrbitControls(camera,renderer.domElement);



window.addEventListener('resize',() => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth,window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
});

const clock = new THREE.Clock();


function render() {
  controls.update();
  renderer.render(scene,camera);

  const delta = clock.getDelta();
  world.step(1/60,delta);
  
  sphereMesh.position.copy(sphereBody.position);
  sphereMesh.quaternion.copy(sphereBody.quaternion);


  requestAnimationFrame(render);
}

render();

document.body.appendChild(renderer.domElement);

