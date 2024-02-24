/*
 * :file description:
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2024-02-24 13:37:06
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// 创建场影
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 10);
scene.add(camera);

for(let i=0;i < 50;i++) {
  const geometry = new THREE.BufferGeometry();
  const positionArray = new Float32Array(9);


  for(let j=0;j < 9;j++) {
    positionArray[j] = Math.random() * 5;

  }
    
  geometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3));

  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff * Math.random(),
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

}


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const controls = new OrbitControls(camera, renderer.domElement);

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();

document.body.appendChild(renderer.domElement);
