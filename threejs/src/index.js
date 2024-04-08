/*
 * :file description:
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2024-04-09 07:26:48
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

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(150,150,150);
scene.add(pointLight);


const width = 32;
const height = 32;

const size = width * height;
const data = new Uint8Array(size * 4);

for(let i=0;i < size * 4;i += 4) {
  data[i] = 255 * Math.random();
  data[i + 1] = 255 * Math.random();
  data[i + 2] = 255 * Math.random();
  data[i + 3] = 1.0;
}

console.log('data',data);

const texture = new THREE.DataTexture(data,width,height,THREE.RGBAFormat);
texture.needsUpdate = true;

const geometry = new THREE.PlaneGeometry(width,height);
const material = new THREE.MeshPhongMaterial({
  map:texture
});

const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);






function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
