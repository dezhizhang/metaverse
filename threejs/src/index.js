/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-13 22:44:48
 * :last editor: 张德志
 * :date last edited: 2024-03-21 09:21:09
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(202,123,125);
camera.lookAt(0,0,0);


const renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

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


const ambientLight = new THREE.AmbientLight(0xfffff,3);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff,3);
scene.add(directionalLight);



const a = new THREE.Vector3(50,0,0);
const b = new THREE.Vector3(50,0,30);

const c = new THREE.Vector3();
const arrowA = new THREE.ArrowHelper(a.clone().normalize(),c,a.length(),0xff00ff);
scene.add(arrowA);

const arrowB = new THREE.ArrowHelper(b.clone().normalize(),c,b.length(),0x00ff00);
scene.add(arrowB);


const d = new THREE.Vector3();
d.crossVectors(a,b);



const arrowC = new THREE.ArrowHelper(c.clone().normalize(),c,d.length() / 30,0xffff00);
scene.add(arrowC);


function render() {

  requestAnimationFrame(render);
  renderer.render(scene,camera)
}

render();



