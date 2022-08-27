/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-08-21 15:01:07
 * :last editor: 张德志
 * :date last edited: 2022-08-27 15:48:55
 */
/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-12 07:44:44
 * :last editor: 张德志
 * :date last edited: 2022-08-21 15:00:19
 */

import * as THREE from 'three';

// 创建场影
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(-20,40,50);
camera.lookAt(new THREE.Vector3(10,0,0));


// 创建渲染器
const renderer = new THREE.WebGL1Renderer();
renderer.setClearColor(new THREE.Color(0xeeeeff));
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.shadowMapEnabled = true;


document.body.appendChild(renderer.domElement);


function render() {
    requestAnimationFrame(render);
    renderer.render(scene,camera);
}

render();

