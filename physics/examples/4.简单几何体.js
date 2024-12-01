/*
 * :file description: 
 * :name: /physics/examples/4.简单几何体.js
 * :author:张德志
 * :copyright: (c) 2024, Xiaozhi
 * :date created: 2024-12-01 10:22:17
 * :last editor: 张德志
 * :date last edited: 2024-12-01 10:22:18
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

// 创建物理世界
const world = new CANNON.World();
world.gravity.set(0, -9.82, 0); // 设置重力


const sphereBody = new CANNON.Body({
  mass: 1, // 设置质量
  shape: new CANNON.Sphere(1), // 球体形状，半径为1
  position: new CANNON.Vec3(0, 5, 0), // 初始位置
});
world.addBody(sphereBody);
phyMeshes.push(sphereBody);



const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({
  color:0x00ff00
});
const box = new THREE.Mesh(geometry,material);
scene.add(box);
meshs.push(box);



// 创建一个平面
const groundBody = new CANNON.Body({
  mass: 0, // 平面是静止的，质量为0
  shape: new CANNON.Plane(),
});
groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2); // 平面朝上
world.addBody(groundBody);


const planeGeometry = new THREE.PlaneGeometry();
const planeMaterial = new THREE.MeshBasicMaterial({
  color:0x00f000
});
const planeMesh = new THREE.Mesh(planeGeometry,planeMaterial);
planeMesh.position.copy(groundBody.position);
planeMesh.quaternion.copy(groundBody.quaternion);
scene.add(planeMesh);







sphereBody.addEventListener('collide', (event) => {
  console.log('Sphere collided with:', event.body);
  console.log('Contact point:', event.contact);
});


// 创建材质
const groundMaterial = new CANNON.Material('ground');
const sphereMaterial = new CANNON.Material('sphere');

// 创建接触材质
const contactMaterial = new CANNON.ContactMaterial(groundMaterial, sphereMaterial, {
  friction: 0.4,      // 摩擦系数
  restitution: 0.6,   // 弹性系数
});

// 应用材质
world.addContactMaterial(contactMaterial);
groundBody.material = groundMaterial;
sphereBody.material = sphereMaterial;


const controls = new OrbitControls(camera,renderer.domElement);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);


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






