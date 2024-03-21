/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-13 22:44:48
 * :last editor: 张德志
 * :date last edited: 2024-03-21 23:15:30
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(4, 6, 10);
camera.lookAt(0, 0, 0);


// 添加一个辅助网格地面
const gridHelper = new THREE.GridHelper(30, 25, 0x004444, 0x004444);
scene.add(gridHelper);


//光源设置
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(100, 60, 50);
scene.add(directionalLight);
const ambient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambient);

const renderer = new THREE.WebGLRenderer();
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


const geometry = new THREE.BoxGeometry(0.4,0.4,0.4);
const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
});
const cube = new THREE.Mesh(geometry,material);
cube.position.set(2,0,-3);
scene.add(cube);


const person = new THREE.Group();
const gltfLoader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/draco/');
gltfLoader.setDRACOLoader(dracoLoader);



gltfLoader.load('./person.glb',(gltf) => {
  person.add(gltf.scene);
});

person.position.set(0, 0, 2);//人位置
scene.add(person);

const a = new THREE.Vector3(0,0,-5);
const arrowA = new THREE.ArrowHelper(a.clone().normalize(),person.position,a.length(),0xff00ff);
scene.add(arrowA);

// 

const b = cube.position.clone().sub(person.position);


const arrowB = new THREE.ArrowHelper(b.clone().normalize(),person.position,b.length(),0xff00ff);
scene.add(arrowB);


const ab = a.clone().cross(b);
const arrowC = new THREE.ArrowHelper(ab.normalize(),person.position,2.5,0x00ff00);
scene.add(arrowC);



function render() {
  requestAnimationFrame(render);
  renderer.render(scene,camera);
}

render();




