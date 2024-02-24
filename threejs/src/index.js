/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2024-02-24 13:13:00
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

//创建场影
const scene = new THREE.Scene();

//创建相机
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);

// 设置相机位置
camera.position.set(0,0,10);
scene.add(camera);

// 创建几何体
const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array([
  -1.0,-1.0,1.0,
  1.0,-1.0,1.0,
  1.0,1.0,1.0,
  1.0,1.0,1.0,
  -1.0,1.0,1.0,
  -1.0,-1.0,1.0
]);

geometry.setAttribute('position',new THREE.BufferAttribute(vertices,3));


const material = new THREE.MeshBasicMaterial({
  color:0xffff00,
  side:THREE.DoubleSide
});
const mesh = new THREE.Mesh(geometry,material);

console.log(mesh);


// 将几何体添加到场景中
scene.add(mesh);

// 初始化渲染器
const renderer = new THREE.WebGL1Renderer();

// 设置渲染器大小
renderer.setSize(window.innerWidth,window.innerHeight);

const controls = new OrbitControls(camera,renderer.domElement);



function render() {
  requestAnimationFrame(render);
  renderer.render(scene,camera);
}

render();

document.body.append(renderer.domElement);

// renderer.render(scene,camera);

