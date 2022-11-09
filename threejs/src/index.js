/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-12 07:44:44
 * :last editor: 张德志
 * :date last edited: 2022-11-10 06:18:05
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// 创建场影
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(0,0,10);
scene.add(camera);

// 创建几何体
const cubeGeometry = new THREE.BoxGeometry(1,1,1);
const cubeMaterial = new THREE.MeshBasicMaterial({color:0xffff00});
const cube = new THREE.Mesh(cubeGeometry,cubeMaterial);
scene.add(cube);

// 创建渲染器 
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth,window.innerHeight);

document.body.appendChild(renderer.domElement);

// 创建控制器
const controls = new OrbitControls(camera,renderer.domElement);

// 创建坐标系
const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);

function render() {
    cube.scale.set(3,2,1)
    renderer.render(scene,camera);
    requestAnimationFrame(render);
}

render();




