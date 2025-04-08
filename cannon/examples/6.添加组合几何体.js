/*
 * :file description: 
 * :name: /cannon/examples/6.添加组合几何体.js
 * :author:张德志
 * :copyright: (c) 2025, Xiaozhi
 * :date created: 2025-04-09 07:02:02
 * :last editor: 张德志
 * :date last edited: 2025-04-09 07:07:27
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

const boxMaterialCon = new CANNON.Material("boxMaterialCon");

const world = new CANNON.World();
world.gravity.set(0, -9.82, 0);
world.allowSleep = true;

// const capsuleBody = new CANNON.Body({
//   mass: 1,
//   position: new CANNON.Vec3(0, 0, 0),
//   material: boxMaterialCon,
// });

// const shpereShape = new CANNON.Sphere(0.5);
// const cylinderShape = new CANNON.Cylinder(0.5,0.5,1.5,20);
// capsuleBody.addShape(shpereShape,new CANNON.Vec3(0,0.75,0));
// capsuleBody.addShape(cylinderShape,new CANNON.Vec3(0,0,0));
// capsuleBody.addShape(shpereShape,new CANNON.Vec3(0,-0.75,0));
// world.addBody(capsuleBody);


const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
});
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(boxMesh);
meshes.push(boxMesh);

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
    // meshes[i].position.copy(phyMeshes[i].position);
    // meshes[i].quaternion.copy(phyMeshes[i].quaternion);
  }

  requestAnimationFrame(render);
  renderer.render(scene, camera);
  cannonDebugger.update();
}

render();
