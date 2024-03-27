/*
 * :file description:
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-13 22:44:48
 * :last editor: 张德志
 * :date last edited: 2024-03-27 23:08:50
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
// scene.background = new THREE.Color(0xffffff);
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.set(-133, -4, 587);

camera.lookAt(0, 0, 0);

// const gridHelper = new THREE.GridHelper(30, 25, 0x004444, 0x004444);
// scene.add(gridHelper);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(100, 60, 50);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const renderer = new THREE.WebGLRenderer();
// renderer.outputEncoding = THREE.sRGBEncoding;
// renderer.outputEncoding = THREE.sea
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);


// const pointArr = [
//   new THREE.Vector2(-50,-50),
//   new THREE.Vector2(-60,0),
//   new THREE.Vector2(0,50),
//   new THREE.Vector2(60,0),
//   new THREE.Vector2(50,-50),
// ];

// const shape = new THREE.Sphere();
// const geometry = new THREE.ShapeGeometry(shape);
// const material = new THREE.MeshLambertMaterial({
//   color:0x00ffff
// });
// const mesh = new THREE.Mesh(geometry,material);
// scene.add(mesh);





document.body.appendChild(renderer.domElement);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function render() {
  requestAnimationFrame(render);

  renderer.render(scene, camera);
}

render();
