/*
 * :file description: 
 * :name: /threejs/examples/CSS3DRenderer.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-07 17:35:00
 * :last editor: 张德志
 * :date last edited: 2024-04-07 17:35:01
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {CSS3DRenderer,CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';

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



const div = document.createElement('div');
div.innerHTML = '设置';
div.style.padding = '4px';
div.style.background = '#00ff00';
div.style.color = '#fff';
div.style.zIndex = 99;
div.style.fontSize = '14px';
div.style.borderRadius = '4px';
div.style.border = '1px solid #ccc';

document.body.appendChild(div);


const css3DRenderer = new CSS3DRenderer();
css3DRenderer.setSize(window.innerWidth,window.innerHeight);
css3DRenderer.domElement.style.position ='absolute';
css3DRenderer.domElement.style.left = '0px';
css3DRenderer.domElement.style.top = '0px';
css3DRenderer.domElement.style.pointerEvents = 'none';
document.body.appendChild(css3DRenderer.domElement);


const geometry = new THREE.ConeGeometry(25,80);
geometry.translate(0,40,0);
const material = new THREE.MeshLambertMaterial({
  color:0x00ffff
});
const mesh = new THREE.Mesh(geometry,material);
mesh.position.set(50,0,50);
scene.add(mesh);

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

const tag = new CSS3DObject(div);
tag.position.y += 80;
tag.scale.set(0.5,0.5,0.5);
mesh.add(tag);





window.addEventListener('resize',() => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth,window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  css3DRenderer.setSize(window.innerWidth,window.innerHeight);
});


const controls = new OrbitControls(camera, renderer.domElement);

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
  css3DRenderer.render(scene,camera);

}

render();
