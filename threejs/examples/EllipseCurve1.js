/*
 * :file description: 
 * :name: /threejs/examples/EllipseCurve1.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-27 05:07:22
 * :last editor: 张德志
 * :date last edited: 2024-03-27 05:08:27
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


const scene = new THREE.Scene();
// scene.background = new THREE.Color(0xffffff);
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.set(348, 348, 348);

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



const arc = new THREE.EllipseCurve(0,0,120,50);
const pointsArr = arc.getPoints(50);

const geometry = new THREE.BufferGeometry();
geometry.setFromPoints(pointsArr);

const material = new THREE.PointsMaterial({
  color:0xffff00,
  size:10.0
});

const points = new THREE.Points(geometry,material);
scene.add(points);



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
  // console.log(camera.position);

  renderer.render(scene, camera);
}

render();