/*
 * :file description: 
 * :name: /threejs/examples/ConeGeometry2.js
 * :author:张德志
 * :copyright: (c) 2025, Xiaozhi
 * :date created: 2025-01-16 07:22:44
 * :last editor: 张德志
 * :date last edited: 2025-01-16 07:22:45
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

scene.add(new THREE.AmbientLight(0xffffff));




const geometry = new THREE.ConeGeometry(4,12,4);
geometry.rotateX(-Math.PI/2);
geometry.translate(0,0,6);
const material = new THREE.MeshLambertMaterial({
    color:0x22ffcc
});
const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);




const controls = new OrbitControls(camera, renderer.domElement);

function render() {
  controls.update();
  renderer.render(scene, camera);
  mesh.rotateZ(0.05);
  requestAnimationFrame(render);
}

render();

scene.add(new THREE.AxesHelper(100));
