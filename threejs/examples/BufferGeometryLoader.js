/*
 * :file description: 
 * :name: /threejs/examples/BufferGeometryLoader.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-10 22:00:37
 * :last editor: 张德志
 * :date last edited: 2024-04-10 22:00:39
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//创建场影
const scene = new THREE.Scene();
//创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// 设置相机位置
camera.position.set(200, 200, 200);
camera.lookAt(scene.position);

const loader = new THREE.BufferGeometryLoader();
loader.load('/bufferGeometry.json',function(geometry) {
  console.log(geometry);
  const material = new THREE.MeshLambertMaterial({
    color:0x0000ff
  });
  const mesh = new THREE.Mesh(geometry,material);
  scene.add(mesh);
});



const ambientLight = new THREE.AmbientLight(0xffffff,1);
scene.add(ambientLight);


const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

// 初始化渲染器
const renderer = new THREE.WebGLRenderer();

// 设置渲染器大小
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.append(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
});

const clock = new THREE.Clock();

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
