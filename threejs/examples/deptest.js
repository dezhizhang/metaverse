/*
 * :file description: 
 * :name: /threejs/examples/deptest.js
 * :author:张德志
 * :copyright: (c) 2025, Xiaozhi
 * :date created: 2025-02-19 07:29:09
 * :last editor: 张德志
 * :date last edited: 2025-02-19 07:29:10
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

const controls = new OrbitControls(camera, renderer.domElement);



const geometry = new THREE.PlaneGeometry(250,250);
const material = new THREE.MeshLambertMaterial({
  color:0x00ffff,
  side:THREE.DoubleSide,
  depthTest:false,
  depthWrite:false,
});
const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);

const geometry2 = new THREE.PlaneGeometry(300,300);
const material2 = new THREE.MeshBasicMaterial({
  color:0x00ff00,
  side:THREE.DoubleSide,
  depthTest:false,
  depthWrite:false,
});
const mesh2 = new THREE.Mesh(geometry2,material2);
// mesh.position.z = 0.1;
scene.add(mesh2);


mesh.renderOrder = 1;
mesh2.renderOrder = 2;


// renderer.setScissorTest(true);

function render() {
  renderer.render(scene, camera);
  
  
  requestAnimationFrame(render);
}

render();
