/*
 * :file description:
 * :name: /physics/src/index.js
 * :author:张德志
 * :copyright: (c) 2024, Xiaozhi
 * :date created: 2024-11-26 05:55:59
 * :last editor: 张德志
 * :date last edited: 2024-12-01 11:47:48
 */
import * as THREE from "three";
import * as CANNON from 'cannon-es';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


let phyMeshes = [];
let meshs = [];


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(1,2,10);


// 创建物理世界
const world = new CANNON.World();
world.gravity.set(0, -9.82, 0); // 设置重力

// 创建渲染器
const renderer = new THREE.WebGLRenderer({
  antialias:true
});
renderer.setSize(window.innerWidth,window.innerHeight);


// 创建物理平面
const planeShape = new CANNON.Plane();
// 创建物理体
const planeBody = new CANNON.Body({
  mass:0,
  type:CANNON.Body.STATIC
});

planeBody.addShape(planeShape);
world.addBody(planeBody);


// 创建一个平面
const planeGeometry = new THREE.BoxGeometry(10,0.2,10);
const planeMaterial = new THREE.MeshBasicMaterial({
  color:0xffff00
});
const planeMesh = new THREE.Mesh(planeGeometry,planeMaterial);
planeMesh.position.copy(planeBody.position);
scene.add(planeMesh);





// 设置刚体物理材质
const boxMaterialCon = new CANNON.Material('boxMaterialCon');
boxMaterialCon.friction = 0.1;
boxMaterialCon.restitution = 1;


const caspculeBody = new CANNON.Body({
  mass:1,
  position: new CANNON.Vec3(0,5,0),
  material:boxMaterialCon,
});


const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);




// 创建一个圆柱体几何体
const cylinderSphape = new CANNON.Cylinder(0.5,0.5,1.5,20);
caspculeBody.addShape(cylinderSphape,new CANNON.Vec3(0,0.75,0));
caspculeBody.addShape(cylinderSphape,new CANNON.Vec3(0,0,0));
caspculeBody.addShape(cylinderSphape,new CANNON.Vec3(0,-0.75,0));

world.addBody(caspculeBody);
phyMeshes.push(caspculeBody);

// 创建胶网格
const capsuleGeometry = new THREE.CylinderGeometry(0.5,0.5,1.5,20);
const capsuleMaterial = new THREE.MeshBasicMaterial({
  color:0x00ff00
});
const capsuleMesh = new THREE.Mesh(capsuleGeometry,capsuleMaterial);
capsuleMesh.position.copy(caspculeBody.position);
capsuleMesh.quaternion.copy(caspculeBody.quaternion);

scene.add(capsuleMesh);
meshs.push(capsuleMesh);


// 创建一个球体
const sphereGeometry = new THREE.SphereGeometry(0.5,20,20);
const sphereMaterial = new THREE.MeshBasicMaterial({
  color:0x0000ff
});
const sphereMesh = new THREE.Mesh(sphereGeometry,sphereMaterial);
sphereMesh.position.set(0,0.75,0);
capsuleMesh.add(sphereMesh);

// 创建第二个球体
const sphereMesh2 = new THREE.Mesh(sphereGeometry,sphereMaterial);
sphereMesh2.position.set(0,-0.75,0);
capsuleMesh.add(sphereMesh2);




// 添加控制器
new OrbitControls(camera,renderer.domElement);



window.addEventListener('resize',() => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth,window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
});


const clock = new THREE.Clock();


function render() {
  renderer.render(scene,camera);

  const delta = clock.getDelta();
  world.step(1/60,delta);

  for(let i=0;i < phyMeshes.length;i++) {
    meshs[i].position.copy(phyMeshes[i].position);
    meshs[i].quaternion.copy(phyMeshes[i].quaternion);
  }

  requestAnimationFrame(render);
}

render();

document.body.appendChild(renderer.domElement);










