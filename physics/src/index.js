/*
 * :file description:
 * :name: /physics/src/index.js
 * :author:张德志
 * :copyright: (c) 2024, Xiaozhi
 * :date created: 2024-11-26 05:55:59
 * :last editor: 张德志
 * :date last edited: 2024-12-04 07:14:22
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

//------------------------------------------------------


// planeBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI / 2);
// world.addBody(planeBody);

// const boxShape = new CANNON.Box(
//   new CANNON.Vec3(0.5,0.5,0.5)
// );

// const boxMaterialCon1 = new CANNON.Material('boxMaterialCon1');
// boxMaterialCon1.friction = 0.1;
// boxMaterialCon1.restitution = 1;

// const boxBody = new CANNON.Body({
//   shape:boxShape,
//   position: new CANNON.Vec3(0,5,0),
//   mass:1,
//   material:boxMaterialCon1,
// });
// physics.push(boxBody);
// world.addBody(boxBody);



const world = new CANNON.World();
world.gravity.set(0,-9.82,0);

const boxMaterialCon = new CANNON.Material('boxMaterialCon');
boxMaterialCon.friction = 0.1;
boxMaterialCon.restitution = 1;

// 创建物理平面
const planeShape = new CANNON.Plane();
const planeBody = new CANNON.Body({
  mass:0,
  shape: planeShape,
  position:new CANNON.Vec3(0,0,0),
  material:boxMaterialCon,
});

planeBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI / 2);
world.addBody(planeBody);

// 创建物理几何体
const boxShape = new CANNON.Box(
  new CANNON.Vec3(0.5,0.5,0.5)
);
const boxMaterialCon1 = new CANNON.Material('boxMaterialCon1');
boxMaterialCon1.friction = 0.1;
boxMaterialCon1.restitution = 1;

const boxBody = new CANNON.Body({
  shape:boxShape,
  position: new CANNON.Vec3(0,5,0),
  mass:1,
  material:boxMaterialCon
});

physics.push(boxBody);
world.addBody(boxBody);


const sphereShape = new CANNON.Sphere(0.5);
// 创建一个刚体
const sphereBody = new CANNON.Body({
  shape:sphereShape,
  position: new CANNON.Vec3(0,10,0),
  mass:1,
  material:boxMaterialCon
});

world.addBody(sphereBody);
physics.push(sphereBody);


// 创建圆柱体
const cylinderShape = new CANNON.Cylinder(0.5,0.5,1,32);
const cylinderBody = new CANNON.Body({
  shape: cylinderShape,
  position: new CANNON.Vec3(0,15,0),
  mass:1,
  material: boxMaterialCon,
});
world.addBody(cylinderBody);
physics.push(cylinderBody);

//----------------------------------------------------------------------

// 创建一个渲染立方体
const boxGeometry = new THREE.BoxGeometry(1,1,1);
const boxMaterial = new THREE.MeshBasicMaterial({
  color:0x00ff00
});
const boxMesh = new THREE.Mesh(boxGeometry,boxMaterial);
scene.add(boxMesh);
meshs.push(boxMesh);

// 创建球几何体
const sphereGeometry = new THREE.SphereGeometry(0.5,32,32);
// 创建球材质
const sphereMaterial = new THREE.MeshBasicMaterial({
  color:0x0000ff
});

// 创建网格
const sphereMesh = new THREE.Mesh(sphereGeometry,sphereMaterial);
scene.add(sphereMesh);
meshs.push(sphereMesh);









// 创建第三立方体
// const boxMesh3 = new THREE.Mesh(boxGeometry,boxMaterial);
// scene.add(boxMesh3);
// meshs.push(boxMesh3);


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

  for(let i=0;i < physics.length;i++) {
    meshs[i].position.copy(physics[i].position);
    meshs[i].quaternion.copy(physics[i].quaternion);
    
  }
  

  requestAnimationFrame(render);
}

render();

document.body.appendChild(renderer.domElement);










