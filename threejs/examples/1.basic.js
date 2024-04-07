/*
 * :file description: 
 * :name: /threejs/examples/1.basic.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2024-04-08 06:11:07
 */

import * as THREE from 'three';

//创建场影
const scene = new THREE.Scene();

//创建相机
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);

// 设置相机位置
camera.position.set(0,0,10);
scene.add(camera);

// 创建几何体
// const cubeGeometry = new THREE.BoxGeometry(1,1,1);
// const cubeMaterial = new THREE.MeshBasicMaterial({color:0xffff00});
// const cube = new THREE.Mesh(cubeGeometry,cubeMaterial);

const geometry = new THREE.PlaneGeometry();
const material = new THREE.MeshBasicMaterial({
    color:'#00ff00',
});
const floor = new THREE.Mesh(geometry,material);
scene.add(floor);

// 将几何体添加到场景中
scene.add(cube);

// 初始化渲染器
const renderer = new THREE.WebGL1Renderer();

// 设置渲染器大小
renderer.setSize(window.innerWidth,window.innerHeight);

document.body.append(renderer.domElement);

renderer.render(scene,camera);

