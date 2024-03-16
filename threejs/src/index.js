/*
 * :file description:
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-13 22:44:48
 * :last editor: 张德志
 * :date last edited: 2024-03-16 23:01:43
 */

import * as THREE from 'three';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const clock = new THREE.Clock();
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 10);

const renderer = new THREE.WebGL1Renderer({
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 3);
scene.add(ambientLight);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial = new THREE.MeshBasicMaterial({
  color: 0xff33ff,
});
const cube = new THREE.Mesh(boxGeometry, boxMaterial);
cube.name = 'cube';
scene.add(cube);

const controls = new OrbitControls(camera, renderer.domElement);

const positionKF = new THREE.VectorKeyframeTrack(
  'cube.position',
  [0, 1, 2],
  [0, 0, 0, 2, 0, 0, 4, 0, 0],
);

const colorKF = new THREE.ColorKeyframeTrack(
  'cube.material.color',
  [0, 2, 4],
  [1, 0, 1, 1, 1, 0, 1, 0, 1],
);

const mixer = new THREE.AnimationMixer(cube);
const clip = new THREE.AnimationClip('move', 4, [positionKF, colorKF]);
const action = mixer.clipAction(clip);

const dracoLoader = new DRACOLoader();
const gltfLoader = new GLTFLoader();
dracoLoader.setDecoderPath('/draco/');
gltfLoader.setDRACOLoader(gltfLoader);

gltfLoader.load('/moon.glb', (gltf) => {
  scene.add(gltf.scene);
});

const quaternion = new THREE.Quaternion();
quaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), 0);
action.play();

function render() {
  const delta = clock.getDelta();
  if (mixer) {
    mixer.update(delta);
  }
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
