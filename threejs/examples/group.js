/*
 * :file description: 
 * :name: /threejs/examples/group.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-24 10:25:44
 * :last editor: 张德志
 * :date last edited: 2024-03-24 10:25:45
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);

const gridHelper = new THREE.GridHelper(30, 25, 0x004444, 0x004444);
scene.add(gridHelper);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(100, 60, 50);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

const controls = new OrbitControls(camera,renderer.domElement);

// const boxGeometry = new THREE.BoxGeometry(1,1,1);
// const material = new THREE.MeshBasicMaterial({
//   color:0xff00ff,
// });

// const cube = new THREE.Mesh(boxGeometry,material);
// const cube1 = new THREE.Mesh(boxGeometry,material);
// cube1.translateX(5);


// const group = new THREE.Group();
// group.add(cube);
// group.add(cube1);

// scene.add(group);

// console.log('scene',scene);







function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
