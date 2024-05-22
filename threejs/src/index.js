/*
 * :file description:
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-05-22 22:36:48
 * :last editor: 张德志
 * :date last edited: 2024-05-23 05:03:11
 */

import * as THREE from 'three';
import { OSS_URL } from '../config'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//创建场影
const scene = new THREE.Scene();

//创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// 设置相机位置
camera.position.set(200, 200, 200);
scene.add(camera);

const textureLoader = new THREE.TextureLoader();

const geometry = new THREE.PlaneGeometry(60, 60);
const material = new THREE.MeshBasicMaterial({
  map: textureLoader.load(`${OSS_URL}/sungent/wave-aperture.png`),
  color: 0x00ffff,
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

let s = 1.0;

function render() {
  s += 0.01;
  mesh.scale.set(s, s, s);
  mesh.material.opacity = 1 - (s - 1) / 1.5;
  if (s > 2.5) s = 1.0;
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
