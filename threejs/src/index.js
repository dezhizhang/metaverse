/*
 * :file description:
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2024-04-15 06:14:27
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.set(10, 10, 10);
camera.lookAt(scene.position);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);


const ambientLight = new THREE.AmbientLight(0xffffff,1);
scene.add(ambientLight);


let player = null;

const dracoLoader = new DRACOLoader();
const gltfLoader = new GLTFLoader();
dracoLoader.setDecoderPath('/draco/');
gltfLoader.setDRACOLoader(dracoLoader);

gltfLoader.load('/person.glb',(gltf) => {
  player = gltf.scene;
  scene.add(gltf.scene);
});





const controls = new OrbitControls(camera,renderer.domElement);


const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);



// 键盘事件
const keyStates = {
  W: false,
  A: false,
  S: false,
  D: false,
};

window.addEventListener('keydown', (event) => {
  const key = event.key.toUpperCase();
  console.log('ke', key);
  keyStates[key] = !keyStates[key];
});

window.addEventListener('keyup', (event) => {
  const key = event.key.toUpperCase();
  keyStates[key] = !keyStates[key];
});

const clock = new THREE.Clock();
const v = new THREE.Vector3(0,0,3);

function render() {

  const deltaTime = clock.getDelta();
  if(keyStates.W) {
    const deltaPosition = v.clone().multiplyScalar(deltaTime);
    player.position.add(deltaPosition);
  }

  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
