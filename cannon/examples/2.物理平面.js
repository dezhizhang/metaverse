/*
 * :file description: 
 * :name: /cannon/examples/2.物理平面.js
 * :author:张德志
 * :copyright: (c) 2025, Xiaozhi
 * :date created: 2025-04-02 07:07:25
 * :last editor: 张德志
 * :date last edited: 2025-04-02 07:07:26
 */
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as CANNON from "cannon-es";

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

// 创建一个球
const sphereBody = new CANNON.Body({
  mass: 1,
  shape: new CANNON.Sphere(0.5),
  position: new CANNON.Vec3(0, 5, 0),
});
world.addBody(sphereBody);

// 创建平面刚体
const planeBody = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Plane(),
  position: new CANNON.Vec3(0, 0, 0),
  type: CANNON.Body.STATIC
});

planeBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);

world.addBody(planeBody);

const geometry = new THREE.SphereGeometry(0.5, 32, 32);
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planeMaterial = new THREE.MeshBasicMaterial({
  color: 0xffff00,
  side: THREE.DoubleSide,
});
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
planeMesh.rotation.x = -Math.PI / 2;
scene.add(planeMesh);

scene.add(new THREE.AxesHelper(100));
const clock = new THREE.Clock();

function render() {
  const delte = clock.getDelta();
  world.step(1 / 60, delte);
  controls.update();
  mesh.position.copy(sphereBody.position);
  mesh.quaternion.copy(sphereBody.quaternion);

  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();
