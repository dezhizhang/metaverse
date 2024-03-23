/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-13 22:44:48
 * :last editor: 张德志
 * :date last edited: 2024-03-23 14:31:35
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(40,40,40);
camera.lookAt(0,0,0);

const gridHelper = new THREE.GridHelper(30,25,0x004444,0x004444);
scene.add(gridHelper);


const directionalLight = new THREE.DirectionalLight(0xffffff,1);
directionalLight.position.set(100,60,50);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xffffff,0.4);
scene.add(ambientLight);


const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);

document.body.appendChild(renderer.domElement);

window.addEventListener('resize',() => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth,window.innerHeight);
});

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

const controls = new OrbitControls(camera,renderer.domElement);

const gltfLoader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/draco/');
gltfLoader.setDRACOLoader(dracoLoader);

gltfLoader.load('/fly.glb',(gltf) => {
  const fly = new THREE.Group();
  fly.add(gltf.scene);
  scene.add(fly);

  fly.position.set(10,10,0);
  const axesHelper = new THREE.AxesHelper(10);
  fly.add(axesHelper);

  const q1 = new THREE.Quaternion();
  q1.setFromAxisAngle(new THREE.Vector3(1,0,0),Math.PI / 2);
  fly.quaternion.multiply(q1);


  const q2 = new THREE.Quaternion();
  q2.setFromAxisAngle(new THREE.Vector3(0,1,0),Math.PI / 2);
  fly.quaternion.multiply(q2);

  const q3 = new THREE.Quaternion();
  q3.setFromAxisAngle(new THREE.Vector3(0,0,1),Math.PI / 2);
  fly.quaternion.multiply(q3);
  

})




function render() {
  requestAnimationFrame(render);
  renderer.render(scene,camera);
}

render();
