/*
 * :file description: 
 * :name: /threejs/examples/visible.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-24 11:55:06
 * :last editor: 张德志
 * :date last edited: 2024-03-24 11:55:07
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(200, 200, 200);
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


const geometry = new THREE.BoxGeometry(20,20,20);
const material = new THREE.MeshLambertMaterial({
  color:0x00ffff
});
const cube = new THREE.Mesh(geometry,material);
cube.visible = true;
cube.translateX(20);
scene.add(cube);



function render() {

  requestAnimationFrame(render);
  cube.rotateY(0.01);
  renderer.render(scene, camera);
}

render();