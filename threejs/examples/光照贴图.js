/*
 * :file description: 
 * :name: /threejs/examples/光照贴图.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-09 06:29:33
 * :last editor: 张德志
 * :date last edited: 2024-04-09 06:29:34
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(200, 200, 200);
camera.lookAt(scene.position);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const geometry = new THREE.BoxGeometry(40, 100, 40);
const material = new THREE.MeshLambertMaterial({
  color: 0x0000ff,
});

const cube = new THREE.Mesh(geometry, material);
cube.castShadow = true;
scene.add(cube);

const textureLoader = new THREE.TextureLoader();
const lightMap = textureLoader.load('/shadow.png');

const planeGeometry = new THREE.PlaneGeometry(300, 200);
const planeMaterial = new THREE.MeshLambertMaterial({
  color: 0x999999,
  lightMap,
  lightMapIntensity: 0.5,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotateX(-Math.PI / 2);
plane.position.y = -50;
plane.receiveShadow = true;
scene.add(plane);

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
