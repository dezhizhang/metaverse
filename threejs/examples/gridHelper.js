/*
 * :file description: 
 * :name: /threejs/examples/gridHelper.js
 * :author:张德志
 * :copyright: (c) 2025, Xiaozhi
 * :date created: 2025-02-22 09:59:40
 * :last editor: 张德志
 * :date last edited: 2025-02-22 09:59:41
 */
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0x001111,1);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,10000);
camera.position.set(400,400,400);
camera.lookAt(scene.position);


const gridHelper = new THREE.GridHelper(3000,50,0x004444,0x004444);
scene.add(gridHelper);

new OrbitControls(camera,renderer.domElement);
scene.add(new THREE.AxesHelper(1000));

function render() {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();
