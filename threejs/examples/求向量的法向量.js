/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-13 22:44:48
 * :last editor: 张德志
 * :date last edited: 2024-03-22 05:37:22
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

const geometry = new THREE.BufferGeometry();

const vertices = new Float32Array([
  0,0,0,
  50,0,0,
  0,100,0,
  0,0,10,
  0,0,100,
  50,0,10
]);

const position = new THREE.BufferAttribute(vertices,3);
geometry.attributes.position = position;

const material = new THREE.MeshBasicMaterial({
  color:0x00ffff,
  side:THREE.DoubleSide
});

const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);

const p1 = new THREE.Vector3(0,0,0);
const p2 = new THREE.Vector3(50,0,0);
const p3 = new THREE.Vector3(0,100,0);

const a = p2.clone().sub(p1);

const b = p3.clone().sub(p2);

const c = a.clone().cross(b);

const arrow = new THREE.ArrowHelper(c.clone().normalize(),p3,50,0xff00ff);
scene.add(arrow);



function render() {
  requestAnimationFrame(render);
  renderer.render(scene,camera);
}

render();
