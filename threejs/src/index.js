/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-05-17 05:30:15
 * :last editor: 张德志
 * :date last edited: 2025-04-22 06:20:33
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
// 场景
const scene = new THREE.Scene();
// 摄像机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(200,200,200);
camera.lookAt(0,0,0);

const geometry = new THREE.BoxGeometry(20, 20, 20);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);





scene.add(new THREE.AxesHelper(100));




// 渲染器
const renderer = new THREE.WebGLRenderer();
// 设置渲染器大小
renderer.setSize(window.innerWidth, window.innerHeight);
// 设置背景色
renderer.setClearColor(0x000000, 1.0);
// 将渲染器的输出添加到dom元素中
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);



const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene,camera);
composer.addPass(renderPass);


const v2 = new THREE.Vector2(window.innerWidth,window.innerHeight);
const bloomPass = new UnrealBloomPass(v2);
bloomPass.strength = 1.5;
bloomPass.selectedObjects = [cube];
composer.addPass(bloomPass);



function animate() {

    requestAnimationFrame(animate);

    composer.render();
    // 渲染场景
    // renderer.render(scene, camera);
}


animate();
