/*
 * :file description: 
 * :name: /threejs/examples/points01.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-02-25 16:17:38
 * :last editor: 张德志
 * :date last edited: 2024-02-25 16:18:30
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(0,0,10);
scene.add(camera);

const sphereGeometry = new THREE.SphereGeometry(3,20,20);
const pointMaterial = new THREE.PointsMaterial();
pointMaterial.size = 0.01;


const sphere = new THREE.Points(sphereGeometry,pointMaterial);
scene.add(sphere);


const light = new THREE.AmbientLight(0xfffff);
scene.add(light);


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;

const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);


function render() {
  requestAnimationFrame(render);
  renderer.render(scene,camera);
}

render();

const controls = new OrbitControls(camera,renderer.domElement);

document.body.appendChild(renderer.domElement);
