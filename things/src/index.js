/*
 * :file description:
 * :name: /things/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-24 20:16:05
 * :last editor: 张德志
 * :date last edited: 2024-04-08 20:10:58
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { baseUrl } from '../config';

const scene = new THREE.Scene();

const width = window.innerWidth;
const height = window.innerHeight;

// camera
const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
camera.position.set(200, 200, 200);
camera.lookAt(scene.position);

// render
const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setSize(width, height);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// controls
const controls = new OrbitControls(camera, renderer.domElement);

// light 
const ambientLight = new THREE.AmbientLight(0xffffff,1.0);
scene.add(ambientLight)

//loader
const dracoLoader = new DRACOLoader();
const gltfLoader = new GLTFLoader();
dracoLoader.setDecoderPath('/draco/');
gltfLoader.setDRACOLoader(dracoLoader);

gltfLoader.load(`${baseUrl}/model/factory.glb`, (gltf) => {
  scene.add(gltf.scene);
});

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
