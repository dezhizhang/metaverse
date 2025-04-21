/*
 * :file description: 
 * :name: /threejs/examples/tree.js
 * :author:张德志
 * :copyright: (c) 2025, Xiaozhi
 * :date created: 2024-07-27 12:32:40
 * :last editor: 张德志
 * :date last edited: 2025-03-07 10:43:48
 */
import * as THREE from 'three';

// 创建场景
const scene = new THREE.Scene();

// 创建树干（棕色圆柱）
const trunkGeometry = new THREE.CylinderGeometry(0.5, 0.5, 5, 16);
const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x8B5A2B });
const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
trunk.position.y = 2.5; // 提升树干位置

// 创建树叶（绿色圆锥）
const leavesGeometry = new THREE.ConeGeometry(3, 4, 16);
const leavesMaterial = new THREE.MeshStandardMaterial({ color: 0x228B22 });
const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
leaves.position.y = 5; // 让树叶在树干上方

// 组合树
const tree = new THREE.Group();
tree.add(trunk);
tree.add(leaves);
scene.add(tree);

// 添加光照
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 10, 10);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 10);

// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 渲染函数
function animate() {
  requestAnimationFrame(animate);
//   tree.rotation.y += 0.01; // 让树缓慢旋转
  renderer.render(scene, camera);
}

animate();
