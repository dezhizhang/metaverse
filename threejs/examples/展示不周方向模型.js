/*
 * :file description: 
 * :name: /threejs/examples/展示不周方向模型.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-05-12 17:25:55
 * :last editor: 张德志
 * :date last edited: 2024-05-12 17:26:00
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//创建场影
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,1,1000);
camera.position.set(200,200,200);
camera.lookAt(0,0,0);


//辅助观察的坐标系
const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);


//光源设置
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(100, 60, 50);
scene.add(directionalLight);
const ambient = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambient);


const geometry = new THREE.BoxGeometry(80, 120, 15);
const material = new THREE.MeshLambertMaterial({
    color: 0x00ffff,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const xDom = document.getElementById('x');
xDom.addEventListener('click',() => {
  camera.position.set(500,0,0);
  camera.lookAt(0,0,0);
});

const yDom = document.getElementById('y');
yDom.addEventListener('click',() => {
  camera.position.set(0,500,0);
  camera.lookAt(0,0,0);
});

const zDom = document.getElementById('z');
zDom.addEventListener('click',() => {
  camera.position.set(0,0,500);
  camera.lookAt(0,0,0);
})



// 初始化渲染器
const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
// 设置渲染器大小
renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, renderer.domElement);

window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

document.body.append(renderer.domElement);


function render() {

  requestAnimationFrame(render);  
  renderer.render(scene, camera);
}

render();
