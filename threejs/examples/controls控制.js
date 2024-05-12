/*
 * :file description: 
 * :name: /threejs/examples/controls控制.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-05-12 21:09:52
 * :last editor: 张德志
 * :date last edited: 2024-05-12 21:09:59
 */

import dat from 'dat.gui';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

//创建场影
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(90,window.innerWidth / window.innerHeight,1,1000);
camera.position.set(200,200,200);
camera.lookAt(0,0,0);


const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

const directionalLight = new THREE.DirectionalLight(0xffffff,1);
directionalLight.position.set(100,60,50);
scene.add(directionalLight);

const ambient = new THREE.AmbientLight(0xffffff,1);
scene.add(ambient);


const gltfLoader = new GLTFLoader();
gltfLoader.load('/工厂.glb',(gltf) => {
  scene.add(gltf.scene);
});


// 初始化渲染器
const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
// 设置渲染器大小
renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.minPolarAngle = 0;
controls.maxPolarAngle = Math.PI / 2;
controls.update();



controls.addEventListener('change',() => {
  console.log(controls.getDistance());
})


window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

document.body.append(renderer.domElement);


function render() {
  requestAnimationFrame(render);  
  renderer.render(scene, camera);
}

render();
