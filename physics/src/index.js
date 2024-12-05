/*
 * :file description:
 * :name: /physics/src/index.js
 * :author:张德志
 * :copyright: (c) 2024, Xiaozhi
 * :date created: 2024-12-04 06:44:13
 * :last editor: 张德志
 * :date last edited: 2024-12-06 07:50:45
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


const boxMaterial = new THREE.MeshBasicMaterial({
  color:0xff0000,
})

// 创建物理球
// const sphere = new THREE
const world = new CANNON.World();
world.gravity.set(0, -9.82, 0);
world.allowSleep = true;

const boxMaterialCon = new CANNON.Material("boxMaterialCon");
boxMaterialCon.friction = 0.1;
boxMaterialCon.restitution = 1;


// 创建物理球体
const sphereShape = new CANNON.Sphere(5);
const sphereBody = new CANNON.Body({
  mass:0,
  shape:sphereShape,
  position: new CANNON.Vec3(0,0,0),
  material:boxMaterial,
  collisionFilterGroup:GROUP2,
  collisionFilterMask: GROUP1 | GROUP2 | GROUP3
});
world.addBody(sphereBody);
physics.push(sphereBody);

const sphereGeometry = new THREE.SphereGeometry(5,32,32);
const sphereMaterial = new THREE.MeshBasicMaterial({
  color:0x000ff00
});
const sphereMesh = new THREE.Mesh(sphereGeometry,sphereMaterial);
sphereMesh.position.set(0,0,0);
meshs.push(sphereMesh);
scene.add(sphereMesh);





// 创建物理平面
// const planeShape = new CANNON.Box(new CANNON.Vec3(5, 0.1, 5));
// const planeBody = new CANNON.Body({
//   mass: 0,
//   shape: planeShape,
//   position: new CANNON.Vec3(0, -0.1, 0),
//   material: boxMaterialCon,
// });

// planeBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
// world.addBody(planeBody);
// const boxMaterialCon1 = new CANNON.Material("boxMaterialCon1");
// boxMaterialCon.friction = 1;
// boxMaterialCon1.restitution = 1;

// 创建渲染平面
// const planeGeometry = new THREE.PlaneGeometry(10, 10);
// const planeMaterial = new THREE.MeshBasicMaterial({
//   color: 0xffff00,
// });
// const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
// planeMesh.rotation.x = -Math.PI / 2;
// scene.add(planeMesh);

//-------------------------------------------------



// 创建篇平立方体
const boxShape = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.05));

let cols = 15;
let rows = 15;
let bodies = {};
const boxGeometry = new THREE.SphereGeometry(0.1,32,32);

const particleShape = new CANNON.Particle();

for (let i = 0; i < cols; i++) {
  for (let j = 0; j < rows; j++) {

    const boxBody = new CANNON.Body({
      mass: 0.5,
      shape: particleShape,
      position: new CANNON.Vec3(i - cols * 0.5, 10, j - rows * 0.5),
    });
    world.addBody(boxBody);
    bodies[`${i}-${j}`] = boxBody;
    physics.push(boxBody);

    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    boxMesh.position.set(i - cols * 0.5, 10, j - rows * 0.5);
    meshs.push(boxMesh);
    scene.add(boxMesh);
  }
}


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
