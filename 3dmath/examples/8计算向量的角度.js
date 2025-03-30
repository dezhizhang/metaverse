/*
 * :file description: 
 * :name: /3dmath/examples/8计算向量的角度.js
 * :author:张德志
 * :copyright: (c) 2025, Xiaozhi
 * :date created: 2025-03-30 21:29:29
 * :last editor: 张德志
 * :date last edited: 2025-03-30 21:33:41
 */
import * as THREE from 'three';

// 创建场景
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(100,100,100);
camera.lookAt(scene.position);



const a = new THREE.Vector3(10,10,0);
const b = new THREE.Vector3(20,0,0);

// 计算向量a与b的余弦值
const cos = a.clone().normalize().dot(b.clone().normalize());
console.log('cos',cos);

const rad = Math.acos(cos);

const angle = THREE.MathUtils.radToDeg(rad);
console.log('angle',angle);

