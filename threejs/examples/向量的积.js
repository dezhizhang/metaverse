/*
 * :file description: 
 * :name: /threejs/examples/向量的积.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-21 08:00:12
 * :last editor: 张德志
 * :date last edited: 2024-03-21 08:00:13
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(202,123,125);
camera.lookAt(0,0,0);


const renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

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


const ambientLight = new THREE.AmbientLight(0xfffff,3);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff,3);
scene.add(directionalLight);



const a = new THREE.Vector3(50,0,0);
const b = new THREE.Vector3(30,0,30);

const center = new THREE.Vector3(0,0,0);
const arrowA = new THREE.ArrowHelper(a.clone().normalize(),center,a.length(),0xff00ff);
scene.add(arrowA);

const arrowB = new THREE.ArrowHelper(b.clone().normalize(),center,b.length(),0x00ff00);
scene.add(arrowB);

const c = new THREE.Vector3();
c.crossVectors(a,b);

const arrowC = new THREE.ArrowHelper(c.clone().normalize(),center,c.length() / 30,0xffff00);
scene.add(arrowC);



function render() {

  requestAnimationFrame(render);
  renderer.render(scene,camera)
}

render();



