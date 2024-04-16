/*
 * :file description: 
 * :name: /threejs/examples/棱锥效果.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-17 06:42:13
 * :last editor: 张德志
 * :date last edited: 2024-04-17 06:42:15
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


const size = 4;
const height = size * 4;
const geometry = new THREE.ConeGeometry(size,height,4);
geometry.rotateX(-Math.PI / 2);
geometry.translate(0,0,height / 2);
const material = new THREE.MeshLambertMaterial({
  color:0x22ffcc
});

scene.add(mesh);



// 初始化渲染器
const renderer = new THREE.WebGL1Renderer();

// 设置渲染器大小
renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, renderer.domElement);

document.body.append(renderer.domElement);

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

function render() {
  mesh.rotateZ(0.05);

  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
