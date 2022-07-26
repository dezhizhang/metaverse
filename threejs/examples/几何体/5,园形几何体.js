/*
 * :file description: 
 * :name: /threejs/examples/几何体/5,园形几何体.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-26 22:35:37
 * :last editor: 张德志
 * :date last edited: 2022-07-26 22:35:38
 */
import * as THREE from 'three';

// 创建场景
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);

//创建渲染器
const renderer = new THREE.WebGL1Renderer();
renderer.setClearColor(new THREE.Color(0x000000));
renderer.setSize(window.innerWidth,window.innerHeight);


const geometry = new THREE.CircleGeometry(5,32);
const material = new THREE.MeshBasicMaterial({color:new THREE.Color(0xffffff * Math.random())});
const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);


document.body.append(renderer.domElement);


camera.position.set(0,0,20);
scene.add(camera);


function render() {
    requestAnimationFrame(render);
    renderer.render(scene,camera);
}

render();

