/*
 * :file description:
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2024-04-15 07:04:51
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.set(0, 1.6, -5.6);
camera.lookAt(0,1.6,0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

let player = null;
let mixer = null;

const dracoLoader = new DRACOLoader();
const gltfLoader = new GLTFLoader();
dracoLoader.setDecoderPath('/draco/');
gltfLoader.setDRACOLoader(dracoLoader);

gltfLoader.load('/person.glb', (gltf) => {
  player = gltf.scene;
  scene.add(gltf.scene);
  mixer = new THREE.AnimationMixer(gltf.scene);
  console.log(gltf);

  const clipAction = mixer.clipAction(gltf.animations[10]);
  clipAction.play();

});

// const controls = new OrbitControls(camera, renderer.domElement);

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
  keyStates[key] = true
});

window.addEventListener('keyup', (event) => {
  const key = event.key.toUpperCase();
  keyStates[key] = false
});

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
});

const clock = new THREE.Clock();
const v = new THREE.Vector3(0, 0, 0);
const a = 12;
const damping = -0.04;

function render() {
  const deltaTime = clock.getDelta();
  // 向前运动
  if (keyStates.W) {
    const front = new THREE.Vector3(0, 0, 1);
    v.add(front.multiplyScalar(a * deltaTime));

    if (v.length() < 5) {
      v.add(front.multiplyScalar(a * deltaTime));
    }
    // 向后运动
  }else if(keyStates.S) {
    const front = new THREE.Vector3(0, 0, -1);
    v.add(front.multiplyScalar(a * deltaTime));

    if (v.length() < 5) {
      v.add(front.multiplyScalar(a * deltaTime));
    }
  }

  // v = v + v * damping;
  v.addScaledVector(v, damping);
  const deltaPosition = v.clone().multiplyScalar(deltaTime);
  if(player && mixer) {
    player.position.add(deltaPosition);
    mixer.update(deltaTime);
    player.add(camera);
    
  }

  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
