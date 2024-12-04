/*
 * :file description: 
 * :name: /physics/src/index.js
 * :author:张德志
 * :copyright: (c) 2024, Xiaozhi
 * :date created: 2024-12-04 06:44:13
 * :last editor: 张德志
 * :date last edited: 2024-12-05 07:26:04
 */
import * as THREE from "three";
import * as CANNON from 'cannon-es';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


let physics = [];
let meshs = [];

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(1,2,10);


// 创建渲染器
const renderer = new THREE.WebGLRenderer({
  antialias:true
});
renderer.setSize(window.innerWidth,window.innerHeight);


// 创建物理球
// const sphere = new THREE
const world = new CANNON.World();
world.gravity.set(0,-9.82,0);
world.allowSleep = true;

const boxMaterialCon = new CANNON.Material('boxMaterialCon');
boxMaterialCon.friction = 0.1;
boxMaterialCon.restitution = 1;

// 创建物理平面
const planeShape = new CANNON.Plane();
const planeBody = new CANNON.Body({
  mass:0,
  shape:planeShape,
  position: new CANNON.Vec3(0,0,0),
  material: boxMaterialCon
});

planeBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI / 2);
world.addBody(planeBody);
const boxMaterialCon1 = new CANNON.Material('boxMaterialCon1');
boxMaterialCon.friction = 1;
boxMaterialCon1.restitution = 1;

const sphereShape = new CANNON.Sphere(0.5);
const sphereBody = new CANNON.Body({
  mass:1,
  shape: sphereShape,
  position: new CANNON.Vec3(0,0,0),
  material:boxMaterialCon1,
});
world.addBody(sphereBody);
physics.push(sphereBody);
//-------------------------------------------------


// 创建渲染平面
const planeGeometry = new THREE.PlaneGeometry(10,10);
const planeMaterial = new THREE.MeshBasicMaterial({
  color:0xffff00
});
const planeMesh = new THREE.Mesh(planeGeometry,planeMaterial);
planeMesh.rotation.x = -Math.PI / 2;
scene.add(planeMesh);


// 创建一个几何体
const shpereGeometry = new THREE.SphereGeometry(0.5,32,32);
const sphereMaterial = new THREE.MeshBasicMaterial({
  color:0x00ff00
});
const mesh = new THREE.Mesh(shpereGeometry,sphereMaterial);
scene.add(mesh);
meshs.push(mesh);



// window.addEventListener('click',() => {
//   sphereBody.applyForce(new CANNON.Vec3(0,100,0),sphereBody.position)
// })


window.addEventListener('click',() => {
  // sphereBody.applyForce(new CANNON.Vec3(0,100,0))
  sphereBody.applyImpulse(
    new CANNON.Vec3(10 * (1/60),0,0),
    new CANNON.Vec3(0,-0.5,0)
  );
  
})





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

  for(let i=0;i < physics.length;i++) {
    meshs[i].position.copy(physics[i].position);
    meshs[i].quaternion.copy(physics[i].quaternion);
    
  }
  

  requestAnimationFrame(render);
}

render();

document.body.appendChild(renderer.domElement);

