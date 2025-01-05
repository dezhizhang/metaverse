/*
 * :file description: 
 * :name: /threejs/examples/流动效果.js
 * :author:张德志
 * :copyright: (c) 2025, Xiaozhi
 * :date created: 2024-07-27 12:32:40
 * :last editor: 张德志
 * :date last edited: 2025-01-06 07:16:15
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

const pos = {
    x:0,
    y:0,
}

const tween = new TWEEN.Tween(pos);
console.log('tween',tween);




scene.add(new THREE.AxesHelper(500));

function render() {
  renderer.render(scene,camera);
  texture.offset.y -= 0.02;
  requestAnimationFrame(render);
}

render();





uvs.push(0,0,1,0,1,1);
uvs.push(0,0,1,1,0,1);