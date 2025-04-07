/*
 * :file description:
 * :name: /cannon/src/index.js
 * :author:张德志
 * :copyright: (c) 2025, Xiaozhi
 * :date created: 2025-04-02 06:25:26
 * :last editor: 张德志
 * :date last edited: 2025-04-07 22:31:26
 */
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as CANNON from "cannon-es";

let meshes = [];
let phyMeshes = [];

const world = new CANNON.World();
world.gravity.set(0, -9.82, 0);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(10, 10, 10);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const boxMaterial = new CANNON.Material('boxMaterial');
const boxBody = new CANNON.Body({
    shape: new CANNON.Box(
        new CANNON.Vec3(0.5,0.5,0.5)
    ),
    position: new CANNON.Vec3(0,5,0),
    mass:1,
    material:boxMaterial
});
world.addBody(boxBody);
phyMeshes.push(boxBody);


const planeBody = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Plane(),
  position: new CANNON.Vec3(0, 0, 0),
  type: CANNON.Body.STATIC,
});
planeBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
world.addBody(planeBody);


const boxGeometry = new THREE.BoxGeometry(1,1,1);
const boxBasicMaterial = new THREE.MeshBasicMaterial({
  color:0xff00ff
});
const box = new THREE.Mesh(boxGeometry,boxBasicMaterial);
scene.add(box);

meshes.push(box);


const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planeMaterial = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  side: THREE.DoubleSide,
});
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
planeMesh.rotateX(-Math.PI / 2);
scene.add(planeMesh);

scene.add(new THREE.AxesHelper(100));
const clock = new THREE.Clock();

function render() {
  const delte = clock.getDelta();
  world.step(1 / 60, delte);
  controls.update();

  for(let i=0;i < phyMeshes.length;i++) {
    meshes[i].position.copy(phyMeshes[i].position);
    meshes[i].quaternion.copy(phyMeshes[i].quaternion); 
  }
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();
