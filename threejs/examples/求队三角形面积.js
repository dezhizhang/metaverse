/*
 * :file description: 
 * :name: /threejs/examples/求队三角形面积.js
 * :author:张德志
 * :copyright: (c) 2024, Xiaozhi
 * :date created: 2024-12-29 10:24:39
 * :last editor: 张德志
 * :date last edited: 2024-12-29 10:24:40
 */
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

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

const controls = new OrbitControls(camera, renderer.domElement);

scene.add(new THREE.AxesHelper(100));
scene.add(new THREE.AmbientLight(0xffffff));

const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array([
  0, 0, 0, 
  50, 0, 0,
  0, 100, 0,
  0, 0, 10,
  0, 0, 100,
  50, 0, 10,
]);

const attribute = new THREE.BufferAttribute(vertices,3);
geometry.attributes.position = attribute;

const material = new THREE.MeshBasicMaterial({
  color:0x00fff,
  side:THREE.DoubleSide
});

const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);


const p1 = new THREE.Vector3(0,0,0);
const p2 = new THREE.Vector3(10,0,0);
const p3 = new THREE.Vector3(0,10,0);

const a = p2.clone().sub(p1);
const b = p3.clone().sub(p1);

const c = a.clone().cross(b);

const S = c.length() * 0.5;

console.log('S',S);


function render() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();
