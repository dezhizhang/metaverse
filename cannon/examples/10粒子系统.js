/*
 * :file description: 
 * :name: /cannon/examples/10粒子系统.js
 * :author:张德志
 * :copyright: (c) 2025, Xiaozhi
 * :date created: 2025-04-10 05:46:17
 * :last editor: 张德志
 * :date last edited: 2025-04-10 05:46:18
 */

import * as THREE from "three";
import CannonDebugger from "cannon-es-debugger";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as CANNON from "cannon-es";


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(100, 100, 100);
camera.lookAt(scene.position);

let meshes = [];
let phyMeshes = [];

scene.add(new THREE.AmbientLight(0xffffff,10));


const boxMaterialCon = new CANNON.Material("boxMaterialCon");

const world = new CANNON.World();
world.gravity.set(0, -9.82, 0);
world.allowSleep = true;




const planeBody = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Plane(),
  position: new CANNON.Vec3(0, 0, 0),
  type: CANNON.Body.STATIC,
});
planeBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
world.addBody(planeBody);



const sphSystem = new CANNON.SPHSystem();
// 流体密度
sphSystem.density = 1;
// 流体粘度
sphSystem.viscosity = 0.01;
// 流体交互距离
sphSystem.smoothingRadius = 1;
world.subsystems.push(sphSystem);

const particleShape = new CANNON.Particle();
for(let i=0;i < 400;i++) {
  const particleBody = new CANNON.Body({
    mass:0.01,
    shape:particleShape,
    material:boxMaterialCon
  });
  particleBody.position.set(Math.random() * -0.5,10 + i,Math.random() * -0.5);
  world.addBody(particleBody);
  phyMeshes.push(particleBody);
  sphSystem.add(particleBody);


  const particleMesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.1,10,10),
    new THREE.MeshBasicMaterial({
      color:0x666666,
    })
  );
  scene.add(particleMesh);
  meshes.push(particleMesh);

}


const renderer = new THREE.WebGLRenderer({});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

scene.add(new THREE.AxesHelper(100));

const cannonDebugger = CannonDebugger(scene, world, {
  color: 0xff0000,
  scale: 1.0,
});

const clock = new THREE.Clock();


function render() {
  const delta = clock.getDelta();
  world.step(1 / 60, delta);

  for (let i = 0; i < phyMeshes.length; i++) {
    meshes[i].position.copy(phyMeshes[i].position);
    meshes[i].quaternion.copy(phyMeshes[i].quaternion);
  }


  requestAnimationFrame(render);
  renderer.render(scene, camera);
  cannonDebugger.update();
}

render();
