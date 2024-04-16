/*
 * :file description: 
 * :name: /threejs/examples/CylinderGeometry1.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-17 06:57:28
 * :last editor: 张德志
 * :date last edited: 2024-04-17 06:57:29
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//创建场影
const scene = new THREE.Scene();

//创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(200, 200, 200);

const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
scene.add(ambientLight);

const geometry = new THREE.CylinderGeometry(50,50,20,40,1,true);
geometry.translate(0,10,0);
const material = new THREE.MeshLambertMaterial({
  color:0x00fff,
  map:new THREE.TextureLoader().load('/渐变.png'),
  transparent:true,
  side:THREE.DoubleSide
});

const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);

const gridHelper = new THREE.GridHelper(500,15,0x003333,0x003333);
scene.add(gridHelper);



// 初始化渲染器
const renderer = new THREE.WebGL1Renderer();

// 设置渲染器大小
renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, renderer.domElement);

document.body.append(renderer.domElement);

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

function render() {

  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
