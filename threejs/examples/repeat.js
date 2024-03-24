/*
 * :file description: 
 * :name: /threejs/examples/repeat.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-24 15:00:49
 * :last editor: 张德志
 * :date last edited: 2024-03-24 15:00:50
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.set(200, 200, 200);
camera.lookAt(0, 0, 0);

const gridHelper = new THREE.GridHelper(30, 25, 0x004444, 0x004444);
scene.add(gridHelper);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(100, 60, 50);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

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


const geometry = new THREE.PlaneGeometry(2000,2000);
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('/瓷砖.jpg');
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;

texture.repeat.set(12,12);

const material = new THREE.MeshLambertMaterial({
  map:texture,
  side:THREE.DoubleSide
});

const mesh = new THREE.Mesh(geometry,material);
mesh.rotateX(Math.PI / 2);
scene.add(mesh);


function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
