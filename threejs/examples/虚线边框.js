/*
 * :file description: 
 * :name: /threejs/examples/虚线边框.js
 * :author:张德志
 * :copyright: (c) 2024, Xiaozhi
 * :date created: 2024-12-22 22:13:57
 * :last editor: 张德志
 * :date last edited: 2024-12-22 22:13:58
 */
import * as THREE from 'three';

// 创建场景
const scene = new THREE.Scene();

// 相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// 渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 创建一个几何体
const geometry = new THREE.BoxGeometry(2, 2, 2);  // 创建一个立方体
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });  // 给几何体设置绿色材质
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// 使用 EdgesGeometry 给立方体添加边框
const edges = new THREE.EdgesGeometry(geometry);

// 创建虚线材质
const dashedMaterial = new THREE.LineDashedMaterial({
  color: 0xff0000,      // 边框颜色
  dashSize: 0.2,        // 虚线的每段长度
  gapSize: 0.1,         // 虚线段之间的间距
  linewidth: 2          // 线宽
});

// 创建边框线段对象
const edgeMesh = new THREE.LineSegments(edges, dashedMaterial);
edgeMesh.computeLineDistances(); // 必须计算虚线的距离
scene.add(edgeMesh);


// 渲染循环
function animate() {
  requestAnimationFrame(animate);
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();

