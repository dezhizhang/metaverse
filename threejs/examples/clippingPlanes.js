/*
 * :file description: 
 * :name: /threejs/examples/clippingPlanes.js
 * :author:张德志
 * :copyright: (c) 2025, Xiaozhi
 * :date created: 2025-02-19 07:03:36
 * :last editor: 张德志
 * :date last edited: 2025-02-19 07:03:37
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
renderer.localClippingEnabled = true;
document.body.appendChild(renderer.domElement);

scene.add(new THREE.AxesHelper(1000));

const controls = new OrbitControls(camera, renderer.domElement);



const geometry = new THREE.BoxGeometry(100,100,100);
const planeArr = [
  new THREE.Plane(new THREE.Vector3(-1,0,0),20),
  new THREE.Plane(new THREE.Vector3(0,0,-1),0)
];

const material = new THREE.MeshBasicMaterial({
  color:0x0000ff,
  side:THREE.DoubleSide,
  clippingPlanes:planeArr,
  clipIntersection:true
});

const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);

// renderer.setScissorTest(true);

function render() {
  renderer.render(scene, camera);
  
  
  requestAnimationFrame(render);
}

render();
