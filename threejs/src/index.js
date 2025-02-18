/*
 * :file description:
 * :name: /threejs/src/index.js
 * :author:张德志
 * :copyright: (c) 2025, Xiaozhi
 * :date created: 2024-07-27 12:32:40
 * :last editor: 张德志
 * :date last edited: 2025-02-18 08:02:55
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

const geometry = new THREE.PlaneGeometry(100,100);
const material = new THREE.MeshBasicMaterial({
  stencilWrite:true,
  colorWrite:false,
  depthWrite:false,
  depthTest:false,
  stencilRef:0,
  stencilFunc:THREE.AlwaysStencilFunc,
  stencilZPass:THREE.IncrementStencilOp,
});

const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);



// renderer.setScissorTest(true);

function render() {
  renderer.render(scene, camera);
  
  
  requestAnimationFrame(render);
}

render();
