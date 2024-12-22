/*
 * :file description: 
 * :name: /threejs/examples/137相机PerspectiveCamera.js
 * :author:张德志
 * :copyright: (c) 2024, Xiaozhi
 * :date created: 2024-12-22 09:53:15
 * :last editor: 张德志
 * :date last edited: 2024-12-22 09:53:45
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

const geometry = new THREE.BoxGeometry(100, 100, 100);
const material = new THREE.MeshBasicMaterial({
  color: 0x00ffff,
  transparent: true,
  opacity: 0.5,
});

for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(i * 200,j * 200,0);
    scene.add(mesh);
  }
}

const controls = new OrbitControls(camera, renderer.domElement);


function render() {
  controls.update();
  renderer.render(scene, camera)
  requestAnimationFrame(render);
}

render();


document.body.appendChild(renderer.domElement);