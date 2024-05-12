/*
 * :file description: 
 * :name: /threejs/examples/perspectiveCamera.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-05-12 14:17:42
 * :last editor: 张德志
 * :date last edited: 2024-05-12 14:22:24
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//创建场影
const scene = new THREE.Scene();

//创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);

// 设置相机位置
camera.position.set(200, 200, 400);
scene.add(camera);

const group = new THREE.Group();
const geometry = new THREE.BoxGeometry(100, 100, 100);
geometry.translate(0, 50, 0);

const material = new THREE.MeshBasicMaterial({
  color: 0x00ffff,
});

for (let i = -9; i < 10; i++) {
  for (let j = -9; j < 10; j++) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(i * 200, 0, j * 200);
    group.add(mesh);
  }
}

scene.add(group);

const gridHelper = new THREE.GridHelper(5000,50,0x004444,0x004444);
scene.add(gridHelper);


// 初始化渲染器
const renderer = new THREE.WebGL1Renderer();
const controls = new OrbitControls(camera,renderer.domElement);


// 设置渲染器大小
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.append(renderer.domElement);

function render() {
  requestAnimationFrame(render);
  renderer.render(scene,camera);
}

render();
