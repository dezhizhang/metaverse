/*
 * :file description: 
 * :name: /threejs/examples/setFromPoints2.js
 * :author:张德志
 * :copyright: (c) 2025, Xiaozhi
 * :date created: 2025-01-01 19:28:10
 * :last editor: 张德志
 * :date last edited: 2025-01-01 19:28:11
 */
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  3000
);
camera.position.set(200, 200, 200);
camera.lookAt(scene.position);

scene.add(new THREE.AmbientLight(0xffffff, 0.3));
scene.add(new THREE.AxesHelper(250));

const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);


const pointsArr = [
  new THREE.Vector3(0,0,0),
  new THREE.Vector3(0,100,0),
  new THREE.Vector3(0,100,100),
  new THREE.Vector3(0,0,100)
];


const geometry = new THREE.BufferGeometry();
geometry.setFromPoints(pointsArr);

const material = new THREE.PointsMaterial({
  color:0x00ff00
});

const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);



function render() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();
