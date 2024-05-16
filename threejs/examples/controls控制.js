/*
 * :file description: 
 * :name: /threejs/examples/controls控制.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-05-12 21:09:52
 * :last editor: 张德志
 * :date last edited: 2024-05-16 23:06:42
 */

import dat from 'dat.gui';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

//创建场影
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(90,window.innerWidth / window.innerHeight,1,1000);
camera.position.set(200,200,200);
camera.lookAt(0,0,0);


const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

const directionalLight = new THREE.DirectionalLight(0xffffff,1);
directionalLight.position.set(100,60,50);
scene.add(directionalLight);

const ambient = new THREE.AmbientLight(0xffffff,1);
scene.add(ambient);

const geometry = new THREE.BoxGeometry(50, 50, 50);
const material = new THREE.MeshLambertMaterial({
    color: 0x009999,
});
const mesh = new THREE.Mesh(geometry, material);

const mesh2 = mesh.clone();
mesh2.position.y = 100;
const mesh3 = mesh.clone();
mesh3.position.x = 100;


// 三个网格模型用于高亮发光描边测试
scene.add(mesh,mesh2,mesh3);



controls.addEventListener('change',() => {
  console.log(controls.getDistance());
})


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
  renderer.render(scene, camera);
}

render();
