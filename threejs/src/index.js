/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2024-04-08 07:12:07
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//创建场影
const scene = new THREE.Scene();

//创建相机
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);

// 设置相机位置
camera.position.set(200,200,200);
camera.lookAt(scene.position);



const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('/earth.png')
const geometry = new THREE.PlaneGeometry(204,100);
const material = new THREE.MeshBasicMaterial({
  map:texture
});
const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);

console.log(geometry)



// 初始化渲染器
const renderer = new THREE.WebGLRenderer();

// 设置渲染器大小
renderer.setSize(window.innerWidth,window.innerHeight);

document.body.append(renderer.domElement);


const controls = new OrbitControls(camera,renderer.domElement);

function render() {
  requestAnimationFrame(render);
  renderer.render(scene,camera);
}

render();


