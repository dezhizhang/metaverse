/*
 * :file description: 
 * :name: /physics/examples/3.物理组设置.js
 * :author:张德志
 * :copyright: (c) 2024, Xiaozhi
 * :date created: 2024-12-01 09:52:01
 * :last editor: 张德志
 * :date last edited: 2024-12-01 09:52:01
 */
import * as THREE from "three";
import * as CANNON from 'cannon-es';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


let meshs = [];
let phyMeshes = [];

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(3,2,10)

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

// 设置刚体物理材质
const boxMaterialCon = new CANNON.Material('boxMaterialCon');
boxMaterialCon.friction = 0.1;

// 初始化物理世界
const world = new CANNON.World();
world.gravity.set(0, -9.82, 0);


const boxGeometry = new THREE.BoxGeometry(1,1,1);
const boxMaterial = new THREE.MeshBasicMaterial({
  color:0x00ff00
});
const boxMesh = new THREE.Mesh(boxGeometry,boxMaterial);
scene.add(boxMesh);
meshs.push(boxMesh);


// 创建球几何体
const boxShape = new CANNON.Box(
  new CANNON.Vec3(0.5,0.5,0.5)
);

const boxBody = new CANNON.Body({
  shape:boxShape,
  position: new CANNON.Vec3(1,0.5,2),
  mass:1,
  material: boxMaterialCon,
});
world.addBody(boxBody);
phyMeshes.push(boxBody);


// 创建一个物理球
const sphereShape = new CANNON.Sphere(0.5);
const sphereBody = new CANNON.Body({
  shape:sphereShape,
  position: new CANNON.Vec3(-2,0.5,0),
  mass:1,
  material:boxMaterialCon
});

world.addBody(sphereBody);
phyMeshes.push(sphereBody);


// 创建球几何体
const sphereGeometry = new THREE.SphereGeometry(0.5,32,32);
const sphereMaterial = new THREE.MeshBasicMaterial({
  color:0x0000ff
});
const sphereMesh = new THREE.Mesh(sphereGeometry,sphereMaterial);

scene.add(sphereMesh);
meshs.push(sphereMesh);

// 创建物理圆柱体
const cylinderShape = new CANNON.Cylinder(0.5,0.5,1,32);
const cylinderBody = new CANNON.Body({
  shape:cylinderShape,
  position: new CANNON.Vec3(2,0.5,0),
  mass:1,
  material: boxMaterialCon
});
world.addBody(cylinderBody);
phyMeshes.push(cylinderBody);


// 创建圆柱体
const cylinderGeometry = new THREE.CylinderGeometry(0.5,0.5,1,32);
const cylinderMaterial = new THREE.MeshBasicMaterial({
  color:0xff0000
});
const cylinderMesh = new THREE.Mesh(cylinderGeometry,cylinderMaterial);
scene.add(cylinderMesh);
meshs.push(cylinderMesh);

// 创建一个平面
// const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planeGeometry = new THREE.BoxGeometry(10,0.2,10);
const planeMaterial = new THREE.MeshBasicMaterial({
  color: 0xffff00,
});
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
// planeMesh.rotation.x = -Math.PI / 2 + 0.1;
scene.add(planeMesh);



const controls = new OrbitControls(camera,renderer.domElement);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);


const light = new THREE.AmbientLight();
scene.add(light);



window.addEventListener('resize',() => {
  // camera.aspect = window.innerWidth / window.innerHeight;
  renderer.setSize(window.innerWidth,window.innerHeight);
});

const clock = new THREE.Clock();


function render() {
  const delta = clock.getDelta();
  world.step(1/60,delta);

  for(let i=0;i < phyMeshes.length;i++) {
    meshs[i].position.copy(phyMeshes[i].position);
    meshs[i].quaternion.copy(phyMeshes[i].quaternion);
  }

  renderer.render(scene,camera);
  requestAnimationFrame(render);
}

render();

document.body.appendChild(renderer.domElement);






