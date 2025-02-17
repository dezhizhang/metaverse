/*
 * :file description: 
 * :name: /threejs/examples/setScissor.js
 * :author:张德志
 * :copyright: (c) 2025, Xiaozhi
 * :date created: 2025-02-18 07:38:32
 * :last editor: 张德志
 * :date last edited: 2025-02-18 07:38:33
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
camera.position.set(200, 200, 200);
camera.lookAt(scene.position);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

scene.add(new THREE.AxesHelper(1000));

const controls = new OrbitControls(camera, renderer.domElement);

const geometry = new THREE.BoxGeometry(10,10,10);
const material = new THREE.MeshBasicMaterial({
  antialias:true
});
const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);

renderer.setScissorTest(true);


function render() {
  renderer.render(scene, camera);

  renderer.setScissor(100,200,window.innerWidth / 3,window.innerHeight / 3);
  renderer.setViewport(100,200,window.innerWidth / 3,window.innerHeight / 3);
  
  mesh.rotateY(0.01);
  

  requestAnimationFrame(render);
}

render();
