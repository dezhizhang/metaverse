/*
 * :file description:
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2024-04-06 22:34:53
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//创建场影
const scene = new THREE.Scene();

//创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.001, 5000);
camera.position.set(200,200,200);
camera.lookAt(0,0,0);


const shape1 = new THREE.Shape([
  new THREE.Vector2(0,0),
  new THREE.Vector2(60,0),
  new THREE.Vector2(60,80),
  new THREE.Vector2(40,120),
  new THREE.Vector2(-20,80),
]);

const shape2 = new THREE.Shape([
  new THREE.Vector2(100,0),
  new THREE.Vector2(160,0),
  new THREE.Vector2(160,80),
  new THREE.Vector2(140,120),
]);

const ambientLight = new THREE.AmbientLight(0xffffff,1);
scene.add(ambientLight);


const geometry = new THREE.ShapeGeometry([shape1,shape2]);

const material = new THREE.MeshLambertMaterial({
  color:0x00ffff,
  side:THREE.DoubleSide
});

const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);


// 初始化渲染器
const renderer = new THREE.WebGLRenderer();

// 设置渲染器大小
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.append(renderer.domElement);

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

const control = new OrbitControls(camera, renderer.domElement);

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
