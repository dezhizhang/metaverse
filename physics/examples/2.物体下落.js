/*
 * :file description:
 * :name: /physics/src/index.js
 * :author:张德志
 * :copyright: (c) 2024, Xiaozhi
 * :date created: 2024-11-26 05:55:59
 * :last editor: 张德志
 * :date last edited: 2024-11-27 05:45:49
 */
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as CANNON from "cannon-es";

// 初始化物理世界
const world = new CANNON.World();
world.gravity.set(0, -9.82, 0);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);

const sphereShape = new CANNON.Sphere(0.5);
//创建一个刚体
const sphereBody = new CANNON.Body({
  mass: 1,
  shape: sphereShape,
  position: new CANNON.Vec3(0, 5, 0),
});

world.addBody(sphereBody);

// 创建一个物理平面
// const planeShape = new CANNON.Plane();
const planeShape = new CANNON.Box(new CANNON.Vec3(5,0.1,5));

const planeBody = new CANNON.Body({
  mass: 0,
  shape: planeShape,
  position: new CANNON.Vec3(0, 0, 0),
  type: CANNON.Body.STATIC,
});
planeBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),0.1);



// planeBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2 + 0.1);
world.addBody(planeBody);

const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const sphereMaterial = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
});

const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphereMesh);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// 创建一个平面
// const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planeGeometry = new THREE.BoxGeometry(10,0.2,10);
const planeMaterial = new THREE.MeshBasicMaterial({
  color: 0xffff00,
});
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
// planeMesh.rotation.x = -Math.PI / 2 + 0.1;
scene.add(planeMesh);

const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);

const clock = new THREE.Clock();

function render() {
  const delta = clock.getDelta();
  world.step(1 / 60, delta);
  // 更新位置和旋转


  sphereMesh.position.copy(sphereBody.position);
  sphereMesh.quaternion.copy(sphereBody.quaternion);

  planeMesh.position.copy(planeBody.position);
  planeMesh.quaternion.copy(planeBody.quaternion);

  controls.update();

  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();

document.body.appendChild(renderer.domElement);
