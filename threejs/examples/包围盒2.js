/*
 * :file description: 
 * :name: /threejs/examples/包围盒2.js
 * :author:张德志
 * :copyright: (c) 2025, Xiaozhi
 * :date created: 2025-01-01 18:41:06
 * :last editor: 张德志
 * :date last edited: 2025-01-01 18:41:07
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


const geometry = new THREE.BoxGeometry(50,50,50);
const material = new THREE.MeshBasicMaterial({
  color:0x00fff
});
const mesh = new THREE.Mesh(geometry,material);

const box3 = new THREE.Box3();
box3.expandByObject(mesh);

const scale = new THREE.Vector3();
box3.getSize(scale);

console.log('sales',scale);








function render() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();
