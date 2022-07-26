/*
 * :file description: 
 * :name: /threejs/examples/几何体/6.堆形几何体.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-26 22:51:10
 * :last editor: 张德志
 * :date last edited: 2022-07-26 23:04:35
 */
import * as THREE from 'three';

// 创建场影
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);

// 创建渲染器 
const renderer = new THREE.WebGL1Renderer();
renderer.setClearColor(new THREE.Color(0x000000));
renderer.setSize(window.innerWidth,window.innerHeight);

// 创建几何体
const geometry = new THREE.ConeGeometry(5,20,32);
const material = new THREE.MeshBasicMaterial({color:0xffff00});
const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);

// 设置相机的位置
camera.position.set(0,0,20);
scene.add(camera);

document.body.append(renderer.domElement);

function render(){
    requestAnimationFrame(render);
    renderer.render(scene,camera);
}

render();

