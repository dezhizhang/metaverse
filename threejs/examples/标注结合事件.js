/*
 * :file description: 
 * :name: /threejs/examples/标注结合事件.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-07 16:50:54
 * :last editor: 张德志
 * :date last edited: 2024-04-07 16:50:55
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
div.innerHTML = '设置';
div.style.padding = '4px';
div.style.background = '#ccc';
div.style.position = 'absolute';
div.style.color = '#fff';
div.style.fontSize = '14px';
div.style.borderRadius = '4px';




const css2DRenderer = new CSS2DRenderer();
css2DRenderer.setSize(window.innerWidth,window.innerHeight);
css2DRenderer.domElement.style.position = 'absolute';
css2DRenderer.domElement.style.left = '0px';
css2DRenderer.domElement.style.top = '0px';
css2DRenderer.domElement.style.pointerEvents = 'none';
document.body.appendChild(css2DRenderer.domElement);

gltfLoader.load('/工厂.glb',(gltf) => {
  console.log('gltf',gltf);

  scene.add(gltf.scene);
});

window.addEventListener('click',(event) => {
  const px = event.offsetX;
  const py = event.offsetY;
  const x = (px / window.innerWidth) * 2 - 1;
  const y = - (py / window.innerHeight) * 2 + 1;

  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(new THREE.Vector2(x,y),camera);
  const intersects = raycaster.intersectObjects(scene.children[scene.children.length - 1].children);
  if(intersects.length > 0) {
   
    div.innerHTML = intersects[0].object.name;
    const tag = new CSS2DObject(div);
    intersects[0].object.add(tag)
  }
})

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
