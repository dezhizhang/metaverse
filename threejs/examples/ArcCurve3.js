/*
 * :file description: 
 * :name: /threejs/examples/ArcCurve3.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-05-26 10:11:05
 * :last editor: 张德志
 * :date last edited: 2024-05-26 10:11:07
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

//创建场影
const scene = new THREE.Scene();

//创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);

// 设置相机位置
camera.position.set(200, 200, 200);
camera.lookAt(scene.position);

// 初始化渲染器
const renderer = new THREE.WebGLRenderer();


const geometry = new THREE.BufferGeometry();
const arc = new THREE.ArcCurve(0,0,50,0,2 * Math.PI,false);

const points = arc.getSpacedPoints(50);
geometry.setFromPoints(points);

const material = new THREE.LineBasicMaterial({
  color:0x00ffff
});

const line = new THREE.Line(geometry,material);
scene.add(line);




// 设置渲染器大小
renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, renderer.domElement);

document.body.append(renderer.domElement);

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
