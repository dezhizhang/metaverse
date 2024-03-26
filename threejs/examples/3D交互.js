/*
 * :file description: 
 * :name: /threejs/examples/3D交互.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-26 22:50:33
 * :last editor: 张德志
 * :date last edited: 2024-03-26 22:50:35
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
// scene.background = new THREE.Color(0xffffff);
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.set(-25, 35, 215);

camera.lookAt(0, 0, 0);

// const gridHelper = new THREE.GridHelper(30, 25, 0x004444, 0x004444);
// scene.add(gridHelper);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(100, 60, 50);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const renderer = new THREE.WebGLRenderer();
// renderer.outputEncoding = THREE.sRGBEncoding;
// renderer.outputEncoding = THREE.sea
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.domElement.style.position = 'absolute';
renderer.domElement.style.top = '0px';
renderer.domElement.style.right = '0px';
renderer.domElement.style.bottom = '0x';
renderer.domElement.style.left = '0px';


const geometry = new THREE.BoxGeometry(20,20,20);
const material = new THREE.MeshBasicMaterial({
  color:0x00ff00
});

const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);





document.body.appendChild(renderer.domElement);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

const controls = new OrbitControls(camera, renderer.domElement);

document.getElementById('red').addEventListener('click',() => {
  mesh.material.color = new THREE.Color(0xff0000);
});

document.getElementById('green').addEventListener('click',() => {
  mesh.material.color = new THREE.Color(0x00ff00)
});



function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
