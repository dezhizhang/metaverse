/*
 * :file description:
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-13 22:44:48
 * :last editor: 张德志
 * :date last edited: 2024-05-19 21:17:56
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const keyStates = {
  W: false,
  A: false,
  S: false,
  D: false,
};

document.addEventListener('keydown', (event) => {
  if (event.code === 'KeyW') keyStates.W = true;
  if (event.code === 'KeyA') keyStates.A = true;
  if (event.code === 'KeyS') keyStates.S = true;
  if (event.code === 'KeyD') keyStates.D = true;
});

document.addEventListener('keyup', (event) => {
  if (event.code === 'KeyW') keyStates.W = false;
  if (event.code === 'KeyA') keyStates.A = false;
  if (event.code === 'KeyS') keyStates.S = false;
  if (event.code === 'KeyD') keyStates.D = false;
});

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(20, 20, 20);
camera.lookAt(scene.position);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

//ligut
const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
scene.add(ambientLight);

const gridHelper = new THREE.GridHelper(30, 25, 0x004444, 0x004444);
scene.add(gridHelper);

document.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

//gltf
const gltfLoader = new GLTFLoader();
const gltf = await gltfLoader.loadAsync('/机器人.glb');
const player = gltf.scene;

const mixer = new THREE.AnimationMixer(player);
const action = mixer.clipAction(gltf.animations[12]);
action.play();



scene.add(player);

const controls = new OrbitControls(camera, renderer.domElement);

scene.add(new THREE.AxesHelper(100));

const v3 = new THREE.Vector3(0, 0, 0);

const clock = new THREE.Clock();

const a = 12;
const vMax = 5; // 最大速度
const damping = -0.04;

function render() {
  const deltaTime = clock.getDelta();
  // z方向运动
  if (keyStates.W) {
    const front = new THREE.Vector3(0, 0, 1);

    if (v3.length() < vMax) {
      v3.add(front.multiplyScalar(a * deltaTime));
    }
  } else if (keyStates.S) {
    const front = new THREE.Vector3(0, 0, -1);
    if (v3.length() < vMax) {
      v3.add(front.multiplyScalar(a * deltaTime));
    }
  }

  v3.addScaledVector(v3, damping);
  const deltaPos = v3.clone().multiplyScalar(deltaTime);
  player.position.add(deltaPos);

  requestAnimationFrame(render);
  renderer.render(scene, camera);
  if(mixer) {
    mixer.update(deltaTime);
  }
}

render();
