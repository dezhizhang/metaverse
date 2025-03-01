/*
 * :file description: 
 * :name: /threejs/examples/TubeGeometry.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-27 07:35:12
 * :last editor: 张德志
 * :date last edited: 2024-03-27 07:35:14
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



const arr = [
  new THREE.Vector3(-50,20,90),
  new THREE.Vector3(-10,40,40),
  new THREE.Vector3(0,0,0),
  new THREE.Vector3(60,-60,0),
  new THREE.Vector3(70,0,80),
];

const path = new THREE.CatmullRomCurve3(arr);
const geometry = new THREE.TubeGeometry(path,20,2,8,false);
const material = new THREE.MeshLambertMaterial({
  color:0xff00ff,
  side:THREE.DoubleSide
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
