/*
 * :file description: 
 * :name: /physics/examples/17粒子系统.js
 * :author:张德志
 * :copyright: (c) 2024, Xiaozhi
 * :date created: 2024-12-11 06:34:09
 * :last editor: 张德志
 * :date last edited: 2024-12-11 06:34:10
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

// 创建物理球
const world = new CANNON.World();
world.gravity.set(0, -9.82, 0);
world.allowSleep = true;



// 创建渲染器
const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);

// 创建定的body
const fixedBody = new CANNON.Body({
  mass:0,
  position: new CANNON.Vec3(0,10,0),
});

const fixedShape = new CANNON.Box(
  new CANNON.Vec3(2.5,2.5,0.25)
);
fixedBody.addShape(fixedShape);
fixedBody.type = CANNON.Body.STATIC;
world.addBody(fixedBody);
physics.push(fixedBody);


const fixedMesh = new THREE.Mesh(
  new THREE.BoxGeometry(5,5,0.5),
  new THREE.MeshBasicMaterial({
    color:0x00ff00
  })
);
fixedMesh.position.copy(fixedBody.position);
fixedMesh.quaternion.copy(fixedBody.quaternion);

meshs.push(fixedMesh);
scene.add(fixedMesh);


// 创建移的body
const moveBody = new CANNON.Body({
  mass:1,
  position: new CANNON.Vec3(0,20,0)
});





physics.push(moveBody);

const moveMesh = new THREE.Mesh(
  new THREE.BoxGeometry(5,5,0.5),
  new THREE.MeshBasicMaterial({
    color:0x00ff00
  })
);
moveMesh.position.copy(moveBody.position);
moveMesh.quaternion.copy(moveBody.quaternion);
meshs.push(moveMesh);
scene.add(moveMesh);


// 创建铰链约束
const hingeConstriant = new CANNON.HingeConstraint(fixedBody,moveBody,{
  pivotA: new CANNON.Vec3(0,0,0),
  pivotB: new CANNON.Vec3(0,0,0),
  axisA: new CANNON.Vec3(0,1,0),
  axisB: new CANNON.Vec3(0,1,0),
  collideConnected:false
});

// 创建SPH流体系统
const sphSystem = new CANNON.SPHSystem();
sphSystem.density = 1;
sphSystem.viscosity = 0.01;
sphSystem.smoothingRadius = 1;
world.subsystems.push(sphSystem);

// 创建流体粒子
const particleShape = new CANNON.Particle();
const particleMaterial = new CANNON.Material();



for(let i=0;i < 400;i++) {
  const particleBody = new CANNON.Body({
    mass:0.01,
    shape: particleShape,
    material: particleMaterial,
  });
  particleBody.position.set(
    Math.random() * -0.5,
    10 + i,
    Math.random() * -0.5
  );
  world.addBody(particleBody);
  physics.push(particleBody);
  //  将粒子添加到物理世界中
  sphSystem.add(particleBody);

  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.1,10,10),
    new THREE.MeshBasicMaterial({
      color:0x00ff00
    })
  );

  sphere.position.copy(particleBody.position);
  scene.add(sphere);
  meshs.push(sphere)

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
