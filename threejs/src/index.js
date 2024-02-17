/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-02-09 17:09:51
 * :last editor: 张德志
 * :date last edited: 2024-02-17 20:59:28
 */
// 引入Three.js
import * as THREE from 'three';
// 引入Three.js扩展库
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createEarth } from './earth.js'//绘制地球

    

const R = 100;

const earth = createEarth(R);

const scene = new THREE.Scene();
scene.add(earth);

// 平行光1
const directionalLight = new THREE.DirectionalLight(0xffffff,0.6);
directionalLight.position.set(400, 200, 300);
scene.add(directionalLight);

// 平行光2
const directionalLight2 = new THREE.DirectionalLight(0xffffff,0.6);
directionalLight2.position.set(-400, -200, -300);
scene.add(directionalLight2);

// 环境光
const ambient = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambient);

const width = window.innerWidth;
const height = window.innerHeight;

const k = width / height;
const s = 200;
const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
camera.position.set(200, 300, 200);
camera.lookAt(scene.position);

// 创建渲染器对象
const renderer = new THREE.WebGLRenderer({
  antialias: true, //开启锯齿
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width,height);

document.body.appendChild(renderer.domElement);


function render() {
  renderer.render(scene,camera);
  requestAnimationFrame(render);
}

render();

const axesHelper = new THREE.AxesHelper(250);
scene.add(axesHelper);


const controls = new OrbitControls(camera,renderer.domElement);
