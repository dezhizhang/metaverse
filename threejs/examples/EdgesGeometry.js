/*
 * :file description: 
 * :name: /threejs/examples/EdgesGeometry.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-28 21:15:39
 * :last editor: 张德志
 * :date last edited: 2024-03-28 21:15:40
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const width = window.innerWidth;
const height = window.innerHeight;

const k = width / height;
const s = 1.5;

const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,10000);
camera.position.set(200,200,200);
camera.lookAt(0,0,0);


const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(100, 60, 50);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);


const boxGeometry = new THREE.BoxGeometry(50,50,50);
const material = new THREE.MeshLambertMaterial({
  color:0x004444,
  transparent:true,
  opacity:0.5,
});
const box = new THREE.Mesh(boxGeometry,material);

const edges = new THREE.EdgesGeometry(boxGeometry);
const edgesMaterial = new THREE.LineBasicMaterial({
  color:0x00ffff
});
const line = new THREE.LineSegments(edges,edgesMaterial);
box.add(line);

scene.add(box);




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
