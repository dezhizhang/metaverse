/*
 * :file description:
 * :name: /threejs/examples/包围盒的应用.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2024-05-12 16:16:48
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import data from './data.js';

//创建场影
const scene = new THREE.Scene();

const v3 = new THREE.Vector3(113.510, 33.88, 200);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(115, 37, 8);
camera.lookAt(v3.x,v3.y,v3.z);

const pointArr = [];

data.forEach((e) => {
  const v2 = new THREE.Vector2(e[0], e[1]);
  pointArr.push(v2);
});


const shape = new THREE.Shape(pointArr);
const geometry = new THREE.ShapeGeometry(shape);
const material = new THREE.MeshBasicMaterial({
  color: 0x00ffff,
  side: THREE.DoubleSide,
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const box3 = new THREE.Box3();
box3.expandByObject(mesh);

const center = new THREE.Vector3();
console.log(box3.getCenter(center));
console.log(box3.getSize(center));



const axeshelper = new THREE.AxesHelper(1000);
axeshelper.position.set(v3.x,v3.y,0);
scene.add(axeshelper);



// 初始化渲染器
const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
// 设置渲染器大小
renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(v3.x,v3.y,0);
controls.update();

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
  console.log(camera.position);
  
  renderer.render(scene, camera);
}

render();
