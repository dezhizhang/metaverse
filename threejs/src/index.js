/*
 * :file description:
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-04 22:01:21
 * :last editor: 张德志
 * :date last edited: 2024-03-12 23:01:25
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.set(2, 10, 2);

const renderer = new THREE.WebGL1Renderer({
  antialias: true,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
document.body.appendChild(renderer.domElement);

const rgbeLoader = new RGBELoader();
rgbeLoader.load('/Alex_Hart-Nature_Lab_Bones_2k.hdr', (envMap) => {
  envMap.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = envMap;
  scene.background = envMap;
});

// const DRACOLoader

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/draco/');

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

gltfLoader.load('/cup.glb', (gltf) => {
  console.log(gltf);

  const cup = gltf.scene.getObjectByName('copo_low_01_vidro_0');
  const water = gltf.scene.getObjectByName('copo_low_02_agua_0');
  const ice = gltf.scene.getObjectByName('copo_low_04_vidro_0');

  ice.scale.set(0.86,0.86,0.86);
  water.position.z = -1;
  ice.renderOrder = 1;
  water.renderOrder = 2;
  cup.renderOrder = 3;

  cup.visible = false;
  
  

  console.log(cup);
  

  scene.add(gltf.scene);


});

const controls = new OrbitControls(camera, renderer.domElement);

window.addEventListener('resize',() => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth,window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
})

function render() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();
