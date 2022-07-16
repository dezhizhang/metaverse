/*
 * :file description: 
 * :name: /threejs/examples/9.geometry.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-16 09:27:35
 * :last editor: 张德志
 * :date last edited: 2022-07-16 09:27:36
 */
import * as THREE from 'three';

// 创建场影
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);

// 设置相机
camera.position.set(0,0,10);
scene.add(camera);

// 创建几何体
const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array([
    -1.0,-1.0,1.0,
    1.0,-1.0,1.0,
    1.0,1.0,1.0
]);
geometry.setAttribute('position',new THREE.BufferAttribute(vertices,3));
const material = new THREE.MeshBasicMaterial({color:0xffff00});
const cube = new THREE.Mesh(geometry,material);


// 将几何体添加到场影中
scene.add(cube);

// 初始化渲染器
const renderer = new THREE.WebGL1Renderer();

// 设置渲染器大小
renderer.setSize(window.innerWidth,window.innerHeight);

document.body.append(renderer.domElement);

renderer.render(scene,camera);


