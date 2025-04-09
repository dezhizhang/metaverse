/*
 * :file description: 
 * :name: /cannon/examples/8.添加作用力.js
 * :author:张德志
 * :copyright: (c) 2025, Xiaozhi
 * :date created: 2025-04-09 23:03:27
 * :last editor: 张德志
 * :date last edited: 2025-04-09 23:03:28
 */

import * as THREE from "three";
import CannonDebugger from "cannon-es-debugger";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
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


const sphereBody = new CANNON.Body({
  mass:1,
  shape: new CANNON.Sphere(0.5),
  position:new CANNON.Vec3(0,5,0),
  material:boxMaterialCon,
});
world.addBody(sphereBody);
phyMeshes.push(sphereBody);



const planeBody = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Plane(),
  position: new CANNON.Vec3(0, 0, 0),
  type: CANNON.Body.STATIC,
});
planeBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
world.addBody(planeBody);


const sphereGeometry = new THREE.SphereGeometry(0.5,32,32);
const sphereMaterial = new THREE.MeshBasicMaterial({
  color:0x00ff00
});
const sphereMesh = new THREE.Mesh(sphereGeometry,sphereMaterial);
scene.add(sphereMesh);
meshes.push(sphereMesh);




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


window.addEventListener('click',() => {
  sphereBody.applyForce(new CANNON.Vec3(10,0,0),
  new CANNON.Vec3(0,0,0)
)
})

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
