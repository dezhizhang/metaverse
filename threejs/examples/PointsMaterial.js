/*
 * :file description: 
 * :name: /threejs/examples/PointsMaterial.js
 * :author:张德志
 * :copyright: (c) 2025, Xiaozhi
 * :date created: 2025-02-18 07:19:00
 * :last editor: 张德志
 * :date last edited: 2025-02-18 07:19:01
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

const geometry = new THREE.CylinderGeometry(80,80,200,10);
const material = new THREE.MeshBasicMaterial({
  color:0x666666,
});
const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);

const mesh1 = mesh.clone();
mesh1.material = new THREE.MeshBasicMaterial({
  color:0xfffff,
  wireframe:true
});
scene.add(mesh1);

const material1 = new THREE.PointsMaterial({
  color:0xffffff
});
const point = new THREE.Points(geometry,material1);
scene.add(point);

function render() {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();
