/*
 * :file description:
 * :name: /physics/src/index.js
 * :author:张德志
 * :copyright: (c) 2024, Xiaozhi
 * :date created: 2024-12-04 06:44:13
 * :last editor: 张德志
 * :date last edited: 2024-12-11 06:53:34
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

// 创建物理平面
const groundShape = new CANNON.Plane();
const groundBody = new CANNON.Body({
  mass:0,
  shape: groundShape,
  material: new CANNON.Material,
});

groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0), -Math.PI / 2);
world.addBody(groundBody);
physics.push(groundBody);

const groundMesh = new THREE.Mesh(
  new THREE.PlaneGeometry(100,100),
  new THREE.MeshBasicMaterial({
    color:0x00ff00
  })
)
groundMesh.rotation.x = -Math.PI / 2;
scene.add(groundMesh);
meshs.push(groundMesh);




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
