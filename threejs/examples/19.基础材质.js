/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-12 07:44:44
 * :last editor: 张德志
 * :date last edited: 2022-08-21 19:54:55
 */

import * as THREE from 'three';

const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(45,window.innerHeight / window.innerWidth,0.1,1000);
camera.position.x = -50;
camera.position.y = 50;
camera.position.z = 40; 


// 创建渲染器
const renderer = new THREE.WebGL1Renderer();
renderer.setClearColor(new THREE.Color(0xeeeeee));
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.shadowMap.enabled = true;

const cubeGeometry = new THREE.BoxGeometry(4,4,4);
const cubeMaterial = new THREE.MeshBasicMaterial({color:0x00ff00});
const cube = new THREE.Mesh(cubeGeometry,cubeMaterial);
cube.rotation.x = -0.5 * Math.PI;
scene.add(cube);



document.body.appendChild(renderer.domElement);

function render() {
    requestAnimationFrame(render);
    renderer.render(scene,camera);
}

render();



