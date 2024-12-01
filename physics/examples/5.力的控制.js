/*
 * :file description: 
 * :name: /physics/examples/5.力的控制.js
 * :author:张德志
 * :copyright: (c) 2024, Xiaozhi
 * :date created: 2024-12-02 05:07:34
 * :last editor: 张德志
 * :date last edited: 2024-12-02 05:07:52
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


// 创建一个平面
// const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planeGeometry = new THREE.BoxGeometry(10,0.2,10);
const planeMaterial = new THREE.MeshBasicMaterial({
  color: 0xffff00,
});
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
// planeMesh.rotation.x = -Math.PI / 2 + 0.1;
scene.add(planeMesh);


// 设置刚体物理材质
const boxMaterialCon = new CANNON.Material('boxMaterialCon');
boxMaterialCon.friction = 0.1;

const sphereShape = new CANNON.Sphere(0.5);
const sphereBody = new CANNON.Body({
  mass:1,
  shape: sphereShape,
  position: new CANNON.Vec3(0,5,0),
  material:boxMaterialCon,
  
});

world.addBody(sphereBody);
phyMeshes.push(sphereBody);


// 创建3d场景球
const sphereGeometry = new THREE.SphereGeometry(0.5,32,32);
const sphereMaterial = new THREE.MeshBasicMaterial({
  color:0x00ff00
});
const sphereMesh = new THREE.Mesh(sphereGeometry,sphereMaterial);
sphereMesh.position.y = 5;
meshs.push(sphereMesh);
scene.add(sphereMesh);



scene.add(new THREE.AxesHelper(5));

// 添加控制器
const controls = new OrbitControls(camera,renderer.domElement);



window.addEventListener('resize',() => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth,window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
});


window.addEventListener('click',() => {
  console.log(sphereBody.position);

  sphereBody.applyForce(new CANNON.Vec3(10,0,0),new CANNON.Vec3(0,0,0));
})


const clock = new THREE.Clock();


function render() {
  controls.update();
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










