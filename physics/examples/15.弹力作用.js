/*
 * :file description: 
 * :name: /physics/examples/15.弹力作用.js
 * :author:张德志
 * :copyright: (c) 2024, Xiaozhi
 * :date created: 2024-12-09 06:05:18
 * :last editor: 张德志
 * :date last edited: 2024-12-09 06:05:19
 */

import * as THREE from "three";
import * as CANNON from "cannon-es";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

let physics = [];
let meshs = [];

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);


camera.position.set(1, 2, 10);

let GROUP1 = 1;
let GROUP2 = 2;
let GROUP3 = 4;


// 创建渲染器
const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);



// 创建物理球
// const sphere = new THREE
const world = new CANNON.World();
world.gravity.set(0, -9.82, 0);
world.allowSleep = true;

const boxMaterialCon = new CANNON.Material("boxMaterialCon");
boxMaterialCon.friction = 0.1;
boxMaterialCon.restitution = 1;


const sphereShape = new CANNON.Sphere(0.2);
const sphereBody = new CANNON.Body({
  mass:0,
  shape:sphereShape,
  position: new CANNON.Vec3(0,10,0),
  type:CANNON.Body.STATIC
});

world.addBody(sphereBody);
physics.push(sphereBody);

const sphereGeometry = new THREE.SphereGeometry(0.2,32,32);
const sphereMaterial = new THREE.MeshBasicMaterial({
  color:0x00ff00
});
const sphereMesh = new THREE.Mesh(sphereGeometry,sphereMaterial);
sphereMesh.position.copy(sphereBody.position);
meshs.push(sphereMesh);
scene.add(sphereMesh);

// 创建物理立方体
const boxShape = new CANNON.Box(new CANNON.Vec3(1,1,0.3));
const boxBody = new CANNON.Body({
  mass:1,
  shape:boxShape,
  position: new CANNON.Vec3(0,6,0)
});
world.addBody(boxBody);
physics.push(boxBody);


const boxGeometry = new THREE.BoxGeometry(2,2,0.6);
const boxMaterial = new THREE.MeshBasicMaterial({
  color:0x00ff00
});
const boxMesh = new THREE.Mesh(boxGeometry,boxMaterial);
boxMesh.position.copy(boxBody.position);
meshs.push(boxMesh);
scene.add(boxMesh);


// 创建1个弹向拉住立方体
const spring = new CANNON.Spring(sphereBody,boxBody,{
  restLength:5,
  stiffness:100,
  damping:1
});

world.addEventListener('preStep',() => {
  spring.applyForce();
})


scene.add(new THREE.AxesHelper(5));

// 添加控制器
const controls = new OrbitControls(camera, renderer.domElement);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
});

const clock = new THREE.Clock();

function render() {
  controls.update();
  renderer.render(scene, camera);

  const delta = clock.getDelta();
  world.step(1 / 60, delta);

  for (let i = 0; i < physics.length; i++) {
    meshs[i].position.copy(physics[i].position);
    meshs[i].quaternion.copy(physics[i].quaternion);
  }

  requestAnimationFrame(render);
}

render();

document.body.appendChild(renderer.domElement);
