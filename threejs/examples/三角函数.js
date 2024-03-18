/*
 * :file description: 
 * :name: /threejs/examples/三角函数.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-19 06:35:18
 * :last editor: 张德志
 * :date last edited: 2024-03-19 06:35:19
 */
/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-13 22:44:48
 * :last editor: 张德志
 * :date last edited: 2024-03-19 06:35:04
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//创建场影
const scene = new THREE.Scene();

//创建相机
const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);
// camera.position.set(292,223,185);
camera.position.set(0,0,400);
camera.lookAt(0,0,0);


const geometry = new THREE.SphereGeometry(3);
const material = new THREE.MeshBasicMaterial({
  color:0x00ffff
});

const R = 100;
const N = 36;
const sp = Math.PI  * 2 / N;
const group = new THREE.Group();

for(let i=0;i < N + 1;i++) {
  const angle = sp * i;
  const x = R * Math.cos(angle);
  const y = R * Math.sin(angle);

  const mesh = new THREE.Mesh(geometry,material);
  mesh.position.set(x,y,0);
  group.add(mesh)
}

scene.add(group);

// 初始化渲染器
const renderer = new THREE.WebGL1Renderer();

// 设置渲染器大小
renderer.setSize(window.innerWidth,window.innerHeight);

document.body.append(renderer.domElement);

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);


const controls = new OrbitControls(camera,renderer.domElement);


function render() {
  requestAnimationFrame(render);
  renderer.render(scene,camera);
}

render();


