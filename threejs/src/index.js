// // 引入Three.js
// import * as THREE from 'three';
// import { scene, renderer, camera } from './scene.js'
// //Three.js渲染结果Canvas画布插入到body元素中
// document.body.appendChild(renderer.domElement);

import * as THREE from 'three';
import {  scene, renderer, camera } from './scene.js';

const geometry = new THREE.BufferGeometry();
const curve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(100, 0, -100),
  new THREE.Vector3(0, 80, 0),
  new THREE.Vector3(-100, 0, 100),
]);

//曲线上等间距返回多个顶点坐标
const points = curve.getSpacedPoints(100);
geometry.setFromPoints(points);
const material = new THREE.LineBasicMaterial({
  color: 0x006666, //轨迹颜色
});

const line = new THREE.Line(geometry,material);
scene.add(line);

const index = 20;
const num = 10;
const points2 = points.slice(index,index + num); // 从曲线上获取一段
const geometry2 = new THREE.BufferGeometry();
geometry2.setFromPoints(points2);
const material2 = new THREE.LineBasicMaterial({
  color: 0xffff00, //轨迹颜色
});
const line2 = new THREE.Line(geometry2,material2);
scene.add(line2);


function render() {
  renderer.render(scene,camera);
  requestAnimationFrame(render);
}

render();



