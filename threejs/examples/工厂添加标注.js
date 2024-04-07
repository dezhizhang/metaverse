/*
 * :file description: 
 * :name: /threejs/examples/工厂添加标注.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-07 15:24:05
 * :last editor: 张德志
 * :date last edited: 2024-04-07 15:24:06
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {CSS2DRenderer,CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';

//创建场影
const scene = new THREE.Scene();

//创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// 设置相机位置
camera.position.set(200, 200, 200);
camera.lookAt(scene.position);


const ambientLight = new THREE.AmbientLight(0xffffff,1);
scene.add(ambientLight);

const directionalLight1 = new THREE.DirectionalLight(0xffffff,1);
directionalLight1.position.set(200,300,200);
scene.add(directionalLight1);

const directionalLight2 = new THREE.DirectionalLight(0xffffff,1);
directionalLight2.position.set(-200,-300,-200);
scene.add(directionalLight2);




// 初始化渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.append(renderer.domElement);


const dracoLoader = new DRACOLoader();
const gltfLoader = new GLTFLoader();
dracoLoader.setDecoderPath('/draco/');
gltfLoader.setDRACOLoader(dracoLoader);


const div = document.createElement('div');
div.innerHTML = '设置A';
div.style.padding = '10px';
div.style.fontSize = '14px';
div.style.background = '#ccc';
div.style.color = '#fff';
div.style.borderRadius = '4px';


const css2DRenderer = new CSS2DRenderer();
css2DRenderer.setSize(window.innerWidth,window.innerHeight);
css2DRenderer.domElement.style.position = 'absolute';
css2DRenderer.domElement.style.left = '0px';
css2DRenderer.domElement.style.top = '0px';
css2DRenderer.domElement.style.pointerEvents ='none';
document.body.appendChild(css2DRenderer.domElement);
 

gltfLoader.load('/工厂.glb',(gltf) => {
  const obj = gltf.scene.getObjectByName('设备A');
  const tag = new CSS2DObject(div);
  obj.add(tag);

  obj.add(new THREE.AxesHelper(30));

  scene.add(gltf.scene);
});

window.addEventListener('resize',() => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth,window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
});


const controls = new OrbitControls(camera, renderer.domElement);

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
  css2DRenderer.render(scene,camera);

}

render();
