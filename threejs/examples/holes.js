/*
 * :file description: 
 * :name: /threejs/examples/holes.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-28 20:57:11
 * :last editor: 张德志
 * :date last edited: 2024-03-28 20:57:11
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import data from './data.js';


const scene = new THREE.Scene();

const width = window.innerWidth;
const height = window.innerHeight;

const k = width / height;
const s = 1.5;

const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,10000);
camera.position.set(200,200,200);
camera.lookAt(0,0,0);


const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(100, 60, 50);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const shape = new THREE.Shape();
shape.lineTo(100,0);
shape.lineTo(100,100);
shape.lineTo(0,100);

const path = new THREE.Path();
path.absarc(20,20,20);

const path1 = new THREE.Path();
path1.absarc(80,20,10);

const path3 = new THREE.Path();
path3.moveTo(50,50);
path3.lineTo(80,50);
path3.lineTo(80,80);
path3.lineTo(50,90);

shape.holes.push(path,path1,path3);

const geometry = new THREE.ShapeGeometry(shape);
const material = new THREE.MeshBasicMaterial({
  color:0x00ff00
});
const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);

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
