/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2024-01-30 22:38:21
 */
import * as THREE from 'three';

// 创建场影
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera();
camera.position.z = 10;
camera.position.y  = 2;

// 创建立方体
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({color:0x0ff00});

const cube = new THREE.Mesh(geometry,material);
cube.position.set(0,3,0);

scene.add(cube);

// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);

document.body.appendChild(renderer.domElement);

const helper = new THREE.GridHelper(10,10);
scene.add(helper);

function animate() {
	requestAnimationFrame(animate);
	cube.rotation.x += 0.01;
	renderer.render(scene,camera);
}


animate();

