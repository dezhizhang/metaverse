/*
 * :file description:
 * :name: /physics/src/index.js
 * :author:张德志
 * :copyright: (c) 2024, Xiaozhi
 * :date created: 2024-11-26 05:55:59
 * :last editor: 张德志
 * :date last edited: 2024-12-02 05:23:14
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


// 设置刚体物理材质
const boxMaterialCon = new CANNON.Material('boxMaterialCon');
boxMaterialCon.friction = 0.1;


let previousBody;

for(let i=0;i < 10;i++) {
  const boxGeometry = new THREE.BoxGeometry(1,1,1);
  const boxMaterial = new THREE.MeshBasicMaterial({
    color:0x00ff00
  });
  const boxMesh = new THREE.Mesh(boxGeometry,boxMaterial);
  boxMesh.position.x = i;
  boxMesh.position.y = 1;
  meshs.push(boxMesh);
  scene.add(boxMesh);

  // 创建物理几何体
  const boxSpape = new CANNON.Box(new CANNON.Vec3(0.5,0.5,0.5));
  const boxBody = new CANNON.Body({
    mass:1,
    shape: boxSpape,
    position: new CANNON.Vec3(i,1,0),
    material: boxMaterialCon
  });
  world.addBody(boxBody);
  phyMeshes.push(boxBody);
  if(previousBody) {
    const constraint = new CANNON.LockConstraint(boxBody,previousBody);
    world.addConstraint(constraint);
  }
  previousBody = boxBody;
}

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

  for(let i=0;i < phyMeshes.length;i++) {
    meshs[i].position.copy(phyMeshes[i].position);
    meshs[i].quaternion.copy(phyMeshes[i].quaternion);
  }

  requestAnimationFrame(render);
}

render();

document.body.appendChild(renderer.domElement);










