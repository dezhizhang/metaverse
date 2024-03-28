/*
 * :file description: 
 * :name: /threejs/examples/颜色数据.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-29 05:52:20
 * :last editor: 张德志
 * :date last edited: 2024-03-29 05:52:21
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const width = window.innerWidth;
const height = window.innerHeight;

const k = width / height;
const s = 1.5;

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.set(200, 200, 200);
camera.lookAt(0, 0, 0);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(100, 60, 50);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);


const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array([
  0, 0, 0,
  50, 0, 0,
  0, 25, 0
]);
const colors = new Float32Array([
  1, 0, 0,
  0, 1, 0,
  0,0,1
]);

geometry.attributes.position = new THREE.BufferAttribute(vertices,3);
geometry.attributes.color = new THREE.BufferAttribute(colors,3);

const material = new THREE.PointsMaterial({
  color:0xffff00,
  size: 20.0,
  vertexColors:true
});

const points = new THREE.Points(geometry,material);
scene.add(points);


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

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
