/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-13 22:44:48
 * :last editor: 张德志
 * :date last edited: 2024-03-20 04:51:52
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//创建场影
const scene = new THREE.Scene();

//创建相机
const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(0,0,400);
camera.lookAt(0,0,0);


const geometry = new THREE.SphereGeometry(3);
const material = new THREE.MeshBasicMaterial({
  color:0x00ffff
});

const sphere1 = new THREE.Mesh(geometry,material);
scene.add(sphere1);


const sphere2 = new THREE.Mesh(geometry,material);
scene.add(sphere2);


const A = new THREE.Vector3(30,30,0);

const v = new THREE.Vector3(1,1,0);
const walk = v.clone().multiplyScalar(50);


const B = A.clone().add(walk);

sphere1.position.copy(A);
sphere2.position.copy(B);






// 初始化渲染器
const renderer = new THREE.WebGL1Renderer();

// // 设置渲染器大小
renderer.setSize(window.innerWidth,window.innerHeight);

document.body.append(renderer.domElement);

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);


const controls = new OrbitControls(camera,renderer.domElement);


function render() {
  requestAnimationFrame(render);
  renderer.render(scene,camera);
}

render();


