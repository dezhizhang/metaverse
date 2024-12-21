/*
 * :file description: 
 * :name: /threejs/examples/132基本几何体.js
 * :author:张德志
 * :copyright: (c) 2024, Xiaozhi
 * :date created: 2024-12-22 06:11:03
 * :last editor: 张德志
 * :date last edited: 2024-12-22 06:11:04
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(200,200,200);
camera.lookAt(scene.position);

const geometry = new THREE.BoxGeometry(50,50,50);
const material = new THREE.MeshBasicMaterial({
  color:0x00ff00
});
const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);

const renderer = new THREE.WebGLRenderer({
  antialias:true
});
renderer.setSize(window.innerWidth,window.innerHeight);

const controls = new OrbitControls(camera,renderer.domElement);

scene.add(new THREE.AxesHelper(100));

function render() {
  renderer.render(scene,camera);
  requestAnimationFrame(render);
}

render();


document.body.appendChild(renderer.domElement);