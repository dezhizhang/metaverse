/*
 * :file description: 
 * :name: /threejs/examples/CubicBezierCurve3.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-05-26 09:24:23
 * :last editor: 张德志
 * :date last edited: 2024-05-26 09:24:25
 */
import * as THREE from 'three';

//创建场影
const scene = new THREE.Scene();

//创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);

// 设置相机位置
camera.position.set(200, 200, 200);
camera.lookAt(scene.position);

// 初始化渲染器
const renderer = new THREE.WebGLRenderer();

// const geometry = new THREE.BufferGeometry();

// const p1 = new THREE.Vector3(-80,0,0);
// const p2 = new THREE.Vector3(-40,100,0);
// const p3 = new THREE.Vector3(40,100,0);
// const p4 = new THREE.Vector3(80,0,0);


// const curve = new THREE.CubicBezierCurve3(p1,p2,p3,p4);
// const points = curve.getSpacedPoints(100);

// geometry.setFromPoints(points);

// const material = new THREE.LineBasicMaterial({
//   color:0x00ffff
// });

// const path = new THREE.Line(geometry,material);
// scene.add(path);

// 设置渲染器大小
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.append(renderer.domElement);

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
