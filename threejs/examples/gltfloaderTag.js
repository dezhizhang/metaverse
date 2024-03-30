/*
 * :file description: 
 * :name: /threejs/examples/gltfloaderTag.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-30 21:29:04
 * :last editor: 张德志
 * :date last edited: 2024-03-30 21:29:05
 */
import * as THREE from 'three';
import { CSS2DObject, CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();

const width = window.innerWidth;
const height = window.innerHeight;

const k = width / height;
const s = 1.5;

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.set(132, 132, 132);
camera.lookAt(0, 0, 0);

const directionalLight = new THREE.DirectionalLight(0xffffff,1);
directionalLight.position.set(100 * 2,60 * 2,50 * 2);
directionalLight.castShadow = true;
scene.add(directionalLight);


const ambientLight = new THREE.AmbientLight(0xffffff,1);
scene.add(ambientLight);

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


const dracoLoader = new DRACOLoader();
const gltfLoader = new GLTFLoader();
dracoLoader.setDecoderPath('/draco/');
gltfLoader.setDRACOLoader(dracoLoader);

gltfLoader.load('/factory.gltf',(gltf) => {

  scene.add(gltf.scene);

  const div = document.getElementById('tag');

  const tag = new CSS2DObject(div);

  const obj = gltf.scene.getObjectByName('存储罐');

  obj.add(tag);

});


const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth,window.innerHeight);
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = '0px';
labelRenderer.domElement.style.pointerEvents = 'none';
document.body.appendChild(labelRenderer.domElement);


window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(window.devicePixelRatio);
  labelRenderer.setSize(window.innerWidth,window.innerHeight);
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function render() {

  labelRenderer.render(scene,camera);
  renderer.render(scene, camera);
  requestAnimationFrame(render);
 
}

render();
