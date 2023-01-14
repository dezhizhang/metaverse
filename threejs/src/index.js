/*
 * :file description:
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2022-07-12 07:44:44
 * :last editor: 张德志
 * :date last edited: 2023-01-10 07:46:52
 */
import * as THREE from 'three';
import { model } from './model.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const width = window.innerWidth;
const height = window.innerHeight;

// 设置相机的位置
const camera = new THREE.PerspectiveCamera(30, width / height,1,30000);
camera.position.set(1000,1000,1000);
camera.lookAt(0,0,0);


const renderer = new THREE.WebGLRenderer({
  antialias:true
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width,height);

document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera,renderer.domElement);

window.onresize = function() {
  renderer.setSize(window.innerWidth,window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

}


const scene = new THREE.Scene();
scene.add(model);

// 平行光
const directionalLight = new THREE.DirectionalLight(0xffffff,0.3);
directionalLight.position.set(400,200,300);
scene.add(directionalLight);

// 平行光2
const directionalLight2 = new THREE.DirectionalLight(0xffffff,0.6);
directionalLight2.position.set(-300,600,-300);
scene.add(directionalLight2);

// 环境光
const ambient = new THREE.AmbientLight(0xffffff,0.5);
scene.add(ambient);

//Three.js三维坐标轴 三个坐标轴颜色RGB分别对应xyz轴
const axesHelper = new THREE.AxesHelper(250);
scene.add(axesHelper);

function render() {
  renderer.render(scene,camera);
  requestAnimationFrame(render);

}

render();
