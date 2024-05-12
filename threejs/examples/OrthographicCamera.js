/*
 * :file description: 
 * :name: /threejs/examples/OrthographicCamera.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-05-12 14:34:56
 * :last editor: 张德志
 * :date last edited: 2024-05-12 14:34:57
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//创建场影
const scene = new THREE.Scene();


const width = window.innerWidth;
const height = window.innerHeight;

const k = width / height;
const s = 2000;

const camera = new THREE.OrthographicCamera(-s * k,s * k,s,-s,1,8000);
camera.position.set(1500,1500,1500);
camera.lookAt(scene.position);




const group = new THREE.Group();
const geometry = new THREE.BoxGeometry(100, 100, 100);
geometry.translate(0, 50, 0);

const material = new THREE.MeshBasicMaterial({
  color: 0x00ffff,
});

for (let i = -9; i < 10; i++) {
  for (let j = -9; j < 10; j++) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(i * 200, 0, j * 200);
    group.add(mesh);
  }
}

scene.add(group);

const gridHelper = new THREE.GridHelper(4000,50,0x004444,0x004444);
scene.add(gridHelper);


// 初始化渲染器
const renderer = new THREE.WebGL1Renderer();
const controls = new OrbitControls(camera,renderer.domElement);


// 设置渲染器大小
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.append(renderer.domElement);

function render() {
  requestAnimationFrame(render);
  console.log(camera.position);
  renderer.render(scene,camera);
}

render();
