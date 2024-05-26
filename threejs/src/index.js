/*
 * :file description:
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2024-05-26 14:16:35
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
const curve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(100,0,-100),
  new THREE.Vector3(0,80,0),
  new THREE.Vector3(-100,0,100),
]);

const points = curve.getSpacedPoints(100);
geometry.setFromPoints(points);

const material = new THREE.LineBasicMaterial({
  color:0x006666,
});

const line = new THREE.Line(geometry,material);
scene.add(line);

const index = 20;
const num = 10;

const points2 = points.slice(index,index + num);
const geometry2 = new THREE.BufferGeometry();
geometry2.setFromPoints(points2);

const material2 = new THREE.LineBasicMaterial({
  color:0xffff00,
});

const line2 = new THREE.Line(geometry2,material2);
scene.add(line2);


// 设置渲染器大小
renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, renderer.domElement);

document.body.append(renderer.domElement);

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
