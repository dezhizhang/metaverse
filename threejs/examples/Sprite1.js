/*
 * :file description: 
 * :name: /threejs/examples/Sprite1.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-09 19:57:11
 * :last editor: 张德志
 * :date last edited: 2024-04-09 19:57:12
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

const spriteMaterial = new THREE.SpriteMaterial({
  color:0xff00ff,
  rotation:Math.PI / 4
});

const sprite = new THREE.Sprite(spriteMaterial);
sprite.scale.set(10,10,1);
scene.add(sprite);

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);



function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
