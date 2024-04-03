/*
 * :file description: 
 * :name: /threejs/examples/ConeGeometry1.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-03 22:31:42
 * :last editor: 张德志
 * :date last edited: 2024-04-03 22:31:43
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(300, 300, 200);
camera.lookAt(scene.position);


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);


const height = 100;
const radius = 25;

const geometry = new THREE.ConeGeometry(radius, height,4);
geometry.computeVertexNormals();

geometry.rotateX(-Math.PI / 2);
geometry.translate(0,0,height / 2);

const material = new THREE.MeshBasicMaterial({
  color:0x00ffff
});
const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);


const gridHelper = new THREE.GridHelper(200,25,0x004444,0x004444);
gridHelper.position.y = -0.5;
scene.add(gridHelper);




const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);



const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.update();


const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
});

function render() {
  mesh.rotateZ(0.01);
  renderer.render(scene, camera);
  // effectComposer.render();
  requestAnimationFrame(render);
}

render();
