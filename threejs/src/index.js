/*
 * :file description:
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-05-22 22:36:48
 * :last editor: 张德志
 * :date last edited: 2024-05-23 05:48:07
 */

import * as THREE from 'three';
import data from './polygonData';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//创建场影
const scene = new THREE.Scene();

//创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// 设置相机位置
camera.position.set(103, 45, 200);
camera.lookAt(103,45,0)

const pointArr = [];

data.forEach((elem) => {
  pointArr.push(elem[0],elem[1],0);
});


scene.add(polygon(pointArr));

function polygon(pointArr) {
  
  const group = new THREE.Group();

  const geometry = new THREE.BufferGeometry();
  const vertices = new Float32Array(pointArr);

  const attribute = new THREE.BufferAttribute(vertices,3);
  geometry.attributes.position = attribute;

  const material = new THREE.MeshBasicMaterial({
    color:0x006666
  });
  const line = new THREE.LineLoop(geometry,material);


  const pointMaterial = new THREE.PointsMaterial({
    color:0xffffff,
    size:0.3
  });

  const points = new THREE.Points(geometry,pointMaterial);

  group.add(line,points);

  return group;
}




// 初始化渲染器
const renderer = new THREE.WebGLRenderer();

// 设置渲染器大小
renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(103,45,0);
controls.update();


document.body.append(renderer.domElement);


function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
