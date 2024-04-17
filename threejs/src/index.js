/*
 * :file description:
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-07 14:25:08
 * :last editor: 张德志
 * :date last edited: 2024-04-18 05:32:01
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';

//创建场影
const scene = new THREE.Scene();

//创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(200, 200, 200);

const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
scene.add(ambientLight);


const geometry = new THREE.SphereGeometry(60,30,30);
const material = new THREE.MeshBasicMaterial({
  map:new THREE.TextureLoader().load('/earth.png')
});

const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);











const gridHelper = new THREE.GridHelper(500, 15, 0x003333, 0x003333);
scene.add(gridHelper);

// 初始化渲染器
const renderer = new THREE.WebGLRenderer();

// 设置渲染器大小
renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, renderer.domElement);

document.body.append(renderer.domElement);

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

function render() {
  //renderer.clearColor(0xff0000,1);
  renderer.render(scene, camera);


  requestAnimationFrame(render);
  
}

render();
