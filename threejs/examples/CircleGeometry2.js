/*
 * :file description: 
 * :name: /threejs/examples/CircleGeometry2.js
 * :author:张德志
 * :copyright: (c) 2024, Xiaozhi
 * :date created: 2024-12-22 10:08:47
 * :last editor: 张德志
 * :date last edited: 2024-12-22 10:09:18
 */
import * as THREE from 'three';
import {
  OrbitControls
} from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();


const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 30000);
camera.position.set(800, 800, 800);
camera.lookAt(scene.position);


const renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);


scene.add(new THREE.AxesHelper(100));

const geometry = new THREE.CircleGeometry(50);

const material = new THREE.MeshBasicMaterial({
  color:0x00ff00,
  side:THREE.DoubleSide
});

const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);


const controls = new OrbitControls(camera, renderer.domElement);


function render() {
  controls.update();
  renderer.render(scene, camera)
  requestAnimationFrame(render);
}

render();


document.body.appendChild(renderer.domElement);