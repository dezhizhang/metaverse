/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-13 22:44:48
 * :last editor: 张德志
 * :date last edited: 2024-03-22 05:17:50
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(4,6,10);
camera.lookAt(0,0,0);

const gridHelper = new THREE.GridHelper(30,25,0x004444,0x004444);
scene.add(gridHelper);


const directionalLight = new THREE.DirectionalLight(0xffffff,1);
directionalLight.position.set(100,60,50);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xffffff,0.4);
scene.add(ambientLight);


const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);

document.body.appendChild(renderer.domElement);

window.addEventListener('resize',() => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth,window.innerHeight);
});

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

const controls = new OrbitControls(camera,renderer.domElement);

const A = new THREE.Vector3(0,0,10);
const B = new THREE.Vector3(100,0,10);

const p1 = new THREE.Vector3(20,0,40);
const p2 = new THREE.Vector3(80,0,40);

function createMesh(color) {
  const geometry = new THREE.SphereGeometry(2);
  const material = new THREE.MeshBasicMaterial({
    color
  });
  const mesh = new THREE.Mesh(geometry,material);
  return mesh;
}


const aMesh = createMesh(0xffff00);
aMesh.position.copy(A);
scene.add(aMesh);


const bMesh = createMesh(0xffff00);
bMesh.position.copy(B);
scene.add(bMesh);

const p1Mesh = createMesh(0x00ff00);
p1Mesh.position.copy(p1);
scene.add(p1Mesh);

const p2Mesh = createMesh(0x00ff00);
p2Mesh.position.copy(p2);
scene.add(p2Mesh);


const a1 = A.clone().sub(p1);
const b1 = B.clone().sub(p1);

const arrowA1 = new THREE.ArrowHelper(a1.clone().normalize(),p1,a1.length(),0xff00ff);
scene.add(arrowA1);

const arrowB1 = new THREE.ArrowHelper(b1.clone().normalize(),p1,b1.length(),0xff00ff);
scene.add(arrowB1);


const a2 = A.clone().sub(p2);
const b2 = B.clone().sub(p2);

const arrowA2 = new THREE.ArrowHelper(a2.clone().normalize(),p2,a2.length(),0xff00ff);
scene.add(arrowA2);

const arrowB2 = new THREE.ArrowHelper(b2.clone().normalize(),p2,b2.length(),0xff00ff);
scene.add(arrowB2);







function render() {
  requestAnimationFrame(render);
  renderer.render(scene,camera);
}

render();
