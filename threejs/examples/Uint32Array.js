/*
 * :file description: 
 * :name: /threejs/examples/Uint32Array.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-23 19:14:47
 * :last editor: 张德志
 * :date last edited: 2024-03-23 19:14:49
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(200,200,200);
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

const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array([
  0,0,0,
  80,0,0,
  80,80,0,
  0,80,0
]);

const attributes = new THREE.BufferAttribute(vertices,3);
geometry.attributes.position = attributes;

const indexs = new Uint32Array([
  0,1,2,0,2,3
]);

geometry.index = new THREE.BufferAttribute(indexs,1);
const material = new THREE.MeshBasicMaterial({
  color:0xffff00,
  side:THREE.DoubleSide,
});

const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);



function render() {
  requestAnimationFrame(render);
  renderer.render(scene,camera);
}

render();
