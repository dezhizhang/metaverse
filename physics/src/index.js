/*
 * :file description:
 * :name: /physics/src/index.js
 * :author:张德志
 * :copyright: (c) 2024, Xiaozhi
 * :date created: 2024-11-26 05:55:59
 * :last editor: 张德志
 * :date last edited: 2024-11-28 07:15:38
 */
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as CANNON from "cannon-es";


let phyMeshes = [];
let meshes = [];

// 初始化物理世界
const world = new CANNON.World();
// world.gravity.set(0, -9.82, 0);


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(0.14,2.13,6.795)


const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);


const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// 设置物理立方体材质
const boxMaterialCon = new CANNON.Material('boxMaterial');
boxMaterialCon.friction = 0;



// 创建一个立方体
const boxGeometry = new THREE.BoxGeometry(1,1,1);
const boxMaterial = new THREE.MeshBasicMaterial({
  color:0x00ff00
});
const boxMesh = new THREE.Mesh(boxGeometry,boxMaterial);
scene.add(boxMesh);

// 创建一个物理球
const sphereShape = new CANNON.Sphere(0.5);
// 创建一个刚体
const sphereBody = new CANNON.Body({
  shape:sphereShape,
  position:new CANNON.Vec3(0,10,0),
  mass:1,
  material:boxMaterial
});
world.addBody(sphereBody);

// 创建物理几何体
const boxShape = new CANNON.Box(new CANNON.Vec3(0.5,0.5,0.5));

const boxBody = new CANNON.Body({
  shape:boxShape,
  position: new CANNON.Vec3(-2,0.5,0),
  mass:1,
  material: boxMaterial,
});
world.addBody(boxBody);
phyMeshes.push(boxBody);



// 创建几何体球
const sphereGeometry = new THREE.SphereGeometry(0.5,32,32);
const sphereMaterial = new THREE.MeshBasicMaterial({
  color:0x0000ff
});
const sphereMesh = new THREE.Mesh(sphereGeometry,sphereMaterial);
scene.add(sphereMesh);
meshes.push(sphereMesh);


// 创建物理圆柱体
const cylinderShape = new CANNON.Cylinder(0.5,0.5,1,32);
const cylinderBody = new CANNON.Body({
  shape:cylinderShape,
  position:new CANNON.Vec3(0,0.5,0),
  mass:1,
  material:boxMaterial
});
world.addBody(cylinderBody);
phyMeshes.push(cylinderBody);

// 创建一个平面
const planeGeometry = new THREE.BoxGeometry(10,0.2,10);
// 创建一个平面材质
const planeMaterial = new THREE.MeshBasicMaterial({
  color:0xffff00
});
const planeMesh = new THREE.Mesh(planeGeometry,planeMaterial);
scene.add(planeMesh);

// 创建圆柱体
const cylinderGeometry = new THREE.CylinderGeometry(0.5,0.5,1,32);
const cylinderMaterial = new THREE.MeshBasicMaterial({
  color:0xff0000
});
const cylinderMesh = new THREE.Mesh(cylinderGeometry,cylinderMaterial);
scene.add(cylinderMesh);
meshes.push(cylinderMesh);

boxBody.velocity.set(2,0,0);





window.addEventListener('resize',() => {
  renderer.setSize(window.innerWidth,window.innerHeight);
})



const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);

const clock = new THREE.Clock();

function render() {
  const delta = clock.getDelta();
  world.step(1 / 60, delta);
  // 更新位置和旋转

  // for(let i=0;i < phyMeshes.length;i++) {
  //   meshes[i].position.copy(phyMeshes[i.position]);
  //   meshes[i].quaternion.copy(phyMeshes[i].quaternion);
  // }

  for(let i=0;i < phyMeshes.length;i++) {
    meshes[i].position.copy(phyMeshes[i].position);
  }

  console.log('phyMeshes',phyMeshes);
  console.log('meshes',meshes);
  

  controls.update();

  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();

document.body.appendChild(renderer.domElement);
