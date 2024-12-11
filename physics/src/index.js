/*
 * :file description:
 * :name: /physics/src/index.js
 * :author:张德志
 * :copyright: (c) 2024, Xiaozhi
 * :date created: 2024-12-04 06:44:13
 * :last editor: 张德志
 * :date last edited: 2024-12-12 07:33:54
 */
import * as THREE from "three";
import * as CANNON from "cannon-es";
import CannonDebugger from 'cannon-es-debugger';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);


camera.position.set(1, 200, 200);

// 创建物理球
const world = new CANNON.World();
world.gravity.set(0, -9.82, 0);
world.allowSleep = true;

const cannonDebugger = new CannonDebugger(scene, world);

// 创建渲染器
const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);

// 创建地面
// 添加环境光
const ambientLight = new THREE.AmbientLight(0xffffff);
const directionLight = new THREE.DirectionalLight(
  0xffffff,1
);
directionLight.position.set(0,100,50);
directionLight.castShadow = true;
scene.add(ambientLight,directionLight);


const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(100,100),
  new THREE.MeshStandardMaterial({
    color:0x303030,
    side:THREE.DoubleSide
  })
);
ground.receiveShadow = true;
ground.rotation.x = -Math.PI / 2;
scene.add(ground);


// 创建可视化小球
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(10,32,32),
  new THREE.MeshStandardMaterial({
    color:0xff0000
  })
);
sphere.castShadow = true;
sphere.position.set(0,20,0);
scene.add(sphere);


// 创建物理地面
const groundBody = new CANNON.Body({
  mass:0,
  shape: new CANNON.Plane(),
});
groundBody.quaternion.setFromEuler(-Math.PI / 2,0,0);
world.addBody(groundBody);

// 创建物理小球
const sphereBody = new CANNON.Body({
  mass:1,
  shape: new CANNON.Sphere(10)
});

// sphere.position.copy(sphereBody.position);
//
sphereBody.position.copy(sphere.position);
world.addBody(sphereBody)

// sphereBody.position.copy(sh)









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
  cannonDebugger.update();
  renderer.render(scene, camera);

  const delta = clock.getDelta();
  sphere.position.copy(sphereBody.position);
  

 
  world.step(1 / 60, delta);


  requestAnimationFrame(render);
}

render();

document.body.appendChild(renderer.domElement);
