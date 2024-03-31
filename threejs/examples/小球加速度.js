/*
 * :file description: 
 * :name: /threejs/examples/小球加速度.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-31 11:40:59
 * :last editor: 张德志
 * :date last edited: 2024-03-31 11:41:00
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as CANNON from 'cannon-es';

const scene = new THREE.Scene();


const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(200,200,200);
camera.lookAt(scene.position);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);


const geometry = new THREE.SphereGeometry(1);
const material = new THREE.MeshBasicMaterial({
  color:0x00ffff
});

const sphere = new THREE.Mesh(geometry,material);
sphere.position.set(0,10,0);
scene.add(sphere);

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);


const controls = new OrbitControls(camera,renderer.domElement);

// 创建物理世界
const world = new CANNON.World();
world.gravity.set(0,-9.8,0);

// 物理小球
const body = new CANNON.Body({
  mass:0.5,
  shape:new CANNON.Sphere(1),
});
body.position.y = 100;
world.addBody(body);


window.addEventListener('resize',() => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth,window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
});

function render() {;
  world.step(1 / 60);
  // 周步物理小球与网格小球
  sphere.position.copy(body.position);
  renderer.render(scene,camera);
  requestAnimationFrame(render);
}

render();