/*
 * :file description: 
 * :name: /threejs/src/tween.js
 * :author:张德志
 * :copyright: (c) 2025, Xiaozhi
 * :date created: 2025-01-06 07:23:26
 * :last editor: 张德志
 * :date last edited: 2025-01-06 07:23:43
 */
import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(200,200,200);
camera.lookAt(scene.position);


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);


const control = new OrbitControls(camera,renderer.domElement);



const geometry = new THREE.BoxGeometry(10,10,10);
const material = new THREE.MeshBasicMaterial({
  color:0x00ff00
});
const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);


const tween = new TWEEN.Tween(mesh.position);
tween.to({x:100,y:100},2000);
tween.start();



scene.add(new THREE.AxesHelper(500));

function render() {
  tween.update();

  renderer.render(scene,camera);
  requestAnimationFrame(render);
}

render();

