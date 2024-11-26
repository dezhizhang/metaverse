/*
 * :file description:
 * :name: /physics/src/index.js
 * :author:张德志
 * :copyright: (c) 2024, Xiaozhi
 * :date created: 2024-11-26 05:55:59
 * :last editor: 张德志
 * :date last edited: 2024-11-27 06:31:25
 */
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as CANNON from "cannon-es";

// 初始化物理世界
const world = new CANNON.World();
world.gravity.set(0, -9.82, 0);

let phyMeshes = [];
let meshes = [];


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);



const boxShape = new CANNON.Box(new CANNON.Vec3(0.5,0.5,0.5));
const boxMaterial = new CANNON.Material('boxMaterial');

const boxBody = new CANNON.Body({
  shape:boxShape,
  position: new CANNON.Vec3(0,5,0),
  mass:1,
  Material:boxMaterial
});

world.addBody(boxBody);
phyMeshes.push(boxBody);

// 创建第三个立方体
const boxBouncyMaterial = new CANNON.Material('boxBouncyMaterial');
boxBouncyMaterial.friction = 0.1;
boxBouncyMaterial.restitution = 1;

// 创建物理几何体
const boxBody3 = new CANNON.Body({
  shape:boxShape,
  position:new CANNON.Vec3(2,5,0),
  mass:1,
  material:boxBouncyMaterial,
});

world.addBody(boxBody3);
phyMeshes.push(boxBody3);





// 创建立方体几何体
const boxGeometry = new THREE.BoxGeometry(1,1,1);
const boxMaterial1 = new THREE.MeshBasicMaterial({
  color:0x00ff00
});
const boxMesh = new THREE.Mesh(boxGeometry,boxMaterial1);
scene.add(boxMesh);

meshes.push(boxMesh);

// 创建一个物理平面
// const planeShape = new CANNON.Plane();
const planeShape = new CANNON.Box(new CANNON.Vec3(5,0.1,5));

const planeBody = new CANNON.Body({
  mass: 0,
  shape: planeShape,
  position: new CANNON.Vec3(0, 0, 0),
  type: CANNON.Body.STATIC,
});
planeBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),0.1);


world.addBody(planeBody);


const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// 创建一个平面
// const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planeGeometry = new THREE.BoxGeometry(10,0.2,10);
const planeMaterial = new THREE.MeshBasicMaterial({
  color: 0xffff00,
});
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
// planeMesh.rotation.x = -Math.PI / 2 + 0.1;
scene.add(planeMesh);

const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);

const clock = new THREE.Clock();

function render() {
  const delta = clock.getDelta();
  world.step(1 / 60, delta);

  // // 更新位置和旋转
  // for(let i=0;i < phyMeshes.length;i++) {
  //   meshes[i].position.copy(phyMeshes[i].position);
  //   meshes[i].quaternion.copy(phyMeshes[i].quaternion);
  // }

  controls.update();

  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();

document.body.appendChild(renderer.domElement);
