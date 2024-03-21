/*
 * :file description: 
 * :name: /threejs/examples/向量的面积.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-22 05:54:39
 * :last editor: 张德志
 * :date last edited: 2024-03-22 05:54:39
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(4,6,10);
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


const p1 = new THREE.Vector3(0,0,0);
const p2 = new THREE.Vector3(20,0,0);
const p3 = new THREE.Vector3(0,20,0);

const a = p2.clone().sub(p1);
const b = p3.clone().sub(p1);

const c = a.clone().cross(b);

const s = c.length() * 0.5;

console.log('s',s);






function render() {
  requestAnimationFrame(render);
  renderer.render(scene,camera);
}

render();

