/*
 * :file description: 
 * :name: /threejs/examples/地面的模拟.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-17 05:51:36
 * :last editor: 张德志
 * :date last edited: 2024-04-17 05:52:51
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//创建场影
const scene = new THREE.Scene();

//创建相机
const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);
// 设置相机位置
camera.position.set(200,200,200);



const group = new THREE.Group();


const size = 1000;
const divisions = 100;

const gridHelper = new THREE.GridHelper(size,divisions,0x00ff00,0x00ff00);
gridHelper.material.depthWrite = false;
gridHelper.renderOrder = -2;
group.add(gridHelper);


const geometry = new THREE.CircleGeometry(1,10,1);
geometry.rotateX(Math.PI / 2);
const material = new THREE.MeshBasicMaterial({
  color:0x0000ff,
  side:THREE.DoubleSide,
  depthWrite:false
});


const distance = size / divisions;
const distanceOf = size / 2;
for(let  i=0; i < divisions;i++) {
  for(let j=0;j < divisions;j++) {
    const mesh = new THREE.Mesh(geometry,material);
    mesh.renderOrder = -1;
    mesh.translateX(-distanceOf + i * distance);
    mesh.translateZ(-distanceOf + j * distance);
    scene.add(mesh);
  }
}





// 初始化渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.append(renderer.domElement);

const controls = new OrbitControls(camera,renderer.domElement);


function render() {
  requestAnimationFrame(render);
  renderer.render(scene,camera);
}

render();


