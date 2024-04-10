/*
 * :file description:
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-10 22:54:35
 * :last editor: 张德志
 * :date last edited: 2024-04-11 07:20:17
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';

//创建场影
const scene = new THREE.Scene();
//创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// 设置相机位置
camera.position.set(200, 200, 200);
camera.lookAt(scene.position);

const keyStatus = {
  W: false,
  A: false,
  S: false,
  D: false,
};

window.addEventListener('keydown', (event) => {
  const uppperkey = event.key.toLocaleUpperCase();
  keyStatus[uppperkey] = !keyStatus[uppperkey];
});

window.addEventListener('keyup',(event) => {
  const uppperkey = event.key.toLocaleUpperCase();
  keyStatus[uppperkey] = !keyStatus[uppperkey];
})


const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

// 初始化渲染器
const renderer = new THREE.WebGLRenderer();

// 设置渲染器大小
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.append(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
});

const clock = new THREE.Clock();

function render() {
  if(keyStatus.W) {
    console.log('w');
  }
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
