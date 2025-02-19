/*
 * :file description: 
 * :name: /threejs/examples/camera.js
 * :author:张德志
 * :copyright: (c) 2025, Xiaozhi
 * :date created: 2025-02-20 06:36:21
 * :last editor: 张德志
 * :date last edited: 2025-02-20 06:36:22
 */
/*
 * :file description:
 * :name: /threejs/src/index.js
 * :author:张德志
 * :copyright: (c) 2025, Xiaozhi
 * :date created: 2024-07-27 12:32:40
 * :last editor: 张德志
 * :date last edited: 2025-02-20 06:36:06
 */

import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(300, 300, 300);
camera.lookAt(scene.position);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.localClippingEnabled = true;
document.body.appendChild(renderer.domElement);

scene.add(new THREE.AxesHelper(1000));



const box = new THREE.BoxGeometry(5,5,5);
const material = new THREE.MeshBasicMaterial({
  color:0x00ff00
});
const mesh = new THREE.Mesh(box,material);
scene.add(mesh);


new OrbitControls(camera,renderer.domElement);


let angle = 0;
function render() {
  renderer.render(scene,camera);
  requestAnimationFrame(render);
  angle+=0.012;
  camera.position.x = 800 * Math.sin(angle);
  camera.position.z = 800 * Math.cos(angle);
  camera.lookAt(scene.position);

}

render();


