/*
 * :file description: 
 * :name: /threejs/examples/流光围qian效果.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-07 13:40:22
 * :last editor: 张德志
 * :date last edited: 2024-04-07 13:40:23
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//创建场影
const scene = new THREE.Scene();
//创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// 设置相机位置
camera.position.set(200, 200, 200);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const c = [0, 0, 60, 0, 60, 80, 40, 120, -20, 80, 0, 0];

const geometry = new THREE.BufferGeometry();
const pointsArr = [];
const height = 20;

const uvArr = [];

for (let i = 0; i < c.length - 2; i += 2) {
  pointsArr.push(c[i], c[i + 1], 0, c[i + 2], c[i + 3], 0, c[i + 2], c[i + 3], height);
  pointsArr.push(c[i], c[i + 1], 0, c[i + 2], c[i + 3], height, c[i], c[i + 1], height);

  uvArr.push(0, 0, 1, 0, 1, 1);
  uvArr.push(0, 0, 1, 1, 0, 1);
}

geometry.attributes.position = new THREE.BufferAttribute(new Float32Array(pointsArr), 3);
geometry.attributes.uv = new THREE.BufferAttribute(new Float32Array(uvArr), 2);
geometry.computeVertexNormals();


const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('/流动.png');
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;


const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
  side: THREE.DoubleSide,
  transparent: true,
  map:texture,
  depthTest: false,
});

const mesh = new THREE.Mesh(geometry,material);
mesh.rotateX(-Math.PI / 2);
scene.add(mesh);

const mesh2 = mesh.clone();
mesh2.material = mesh.material.clone();
mesh2.material.map = textureLoader.load('/渐变.png');
mesh2.material.color.set(0x00ffff);
mesh2.scale.set(1.01,1.01,1.0);
scene.add(mesh2);




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

function render() {
  texture.offset.y -= 0.02;
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
