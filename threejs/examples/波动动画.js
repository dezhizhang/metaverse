/*
 * :file description: 
 * :name: /threejs/examples/波动动画.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-07 14:25:08
 * :last editor: 张德志
 * :date last edited: 2024-04-07 14:25:09
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//创建场影
const scene = new THREE.Scene();

//创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(200, 200, 200);

const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
scene.add(ambientLight);

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('/标注光圈.png');

const geometry = new THREE.PlaneGeometry(60, 60);
const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
  side: THREE.DoubleSide,
  transparent: true,
  map: texture,
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const gridHelper = new THREE.GridHelper(300, 25);
scene.add(gridHelper);

// 初始化渲染器
const renderer = new THREE.WebGL1Renderer();

// 设置渲染器大小
renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, renderer.domElement);

document.body.append(renderer.domElement);

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

let s = 1.0;

function render() {
  s += 0.01;
  mesh.scale.set(s,s,s);
  mesh.material.opacity = 1 - (s - 1) / 1.5;
  if(s > 1.5) s = 1;
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
