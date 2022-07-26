/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-12 07:44:44
 * :last editor: 张德志
 * :date last edited: 2022-07-26 23:14:17
 */

import * as THREE from 'three';

// 设置场影
const scene = new THREE.Scene();

//设置渲染器
const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);

// 创建渲染器
const renderer = new THREE.WebGL1Renderer();
renderer.setClearColor(new THREE.Color(0x00000));
renderer.setSize(window.innerWidth,window.innerHeight);


const geometry = new THREE.SphereGeometry(15,32,16);
const material = new THREE.MeshBasicMaterial({color:'#990033'});
const sphere = new THREE.Mesh(geometry,material);
console.log(sphere);


scene.add(sphere);

// 设置相机的位置
camera.position.set(0,0,10);
scene.add(camera);


document.body.appendChild(renderer.domElement);

function render() {
    requestAnimationFrame(render);
    renderer.render(scene,camera);
}

render();


