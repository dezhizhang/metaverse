/*
 * :file description: 
 * :name: /threejs/examples/线条渐变.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-29 06:18:27
 * :last editor: 张德志
 * :date last edited: 2024-03-29 06:18:27
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const width = window.innerWidth;
const height = window.innerHeight;

const k = width / height;
const s = 1.5;

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.set(200, 200, 200);
camera.lookAt(0, 0, 0);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(100, 60, 50);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);


const geometry = new THREE.BufferGeometry();

const curve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(-50,20,90),
  new THREE.Vector3(-10,40,40),
  new THREE.Vector3(0,0,0),
  new THREE.Vector3(60,-60,0),
  new THREE.Vector3(70,0,80),
]);

const pointsArr = curve.getSpacedPoints(100);
geometry.setFromPoints(pointsArr);

const position = geometry.attributes.position;

const count = position.count;

const colorsArr = [];

for(let i=0;i < count;i++) {
  const percent = i / count;
  colorsArr.push(percent,0,1 - percent);
}

geometry.attributes.color = new THREE.BufferAttribute(new Float32Array(colorsArr),3);

const material = new THREE.LineBasicMaterial({
  vertexColors:true
});

const mesh = new THREE.Line(geometry,material);
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
