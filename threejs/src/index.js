/*
 * :file description:
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-05-22 22:36:48
 * :last editor: 张德志
 * :date last edited: 2024-05-22 22:49:29
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//创建场影
const scene = new THREE.Scene();

//创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// 设置相机位置
camera.position.set(200, 200, 200);
scene.add(camera);

const geometry = new THREE.PlaneGeometry(20, 160);
const textureLoader = new THREE.TextureLoader();
const material = new THREE.MeshBasicMaterial({
  map: textureLoader.load('https://tugua.oss-cn-hangzhou.aliyuncs.com/sungent/light-injection.png'),
  color: 0x44ffaa,
  transparent: true,
  side: THREE.DoubleSide,
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// 初始化渲染器
const renderer = new THREE.WebGL1Renderer();

// 设置渲染器大小
renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, renderer.domElement);

document.body.append(renderer.domElement);

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
