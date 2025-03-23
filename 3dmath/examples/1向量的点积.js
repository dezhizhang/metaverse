/*
 * :file description: 
 * :name: /3dmath/examples/1向量的点积.js
 * :author:张德志
 * :copyright: (c) 2025, Xiaozhi
 * :date created: 2025-03-24 06:59:23
 * :last editor: 张德志
 * :date last edited: 2025-03-24 06:59:37
 */
import * as THREE from "three";

const v1 = new THREE.Vector3(1, 2, 3);
const v2 = new THREE.Vector3(4, 5, 6);

console.log("dot", v1.dot(v2));

const angleRad = Math.acos(v1.dot(v2) / (v1.length() * v2.length()));
const angleDeg = angleRad * (180 / Math.PI); // 转换为角度

console.log("angleDeg", angleDeg);

const u = new THREE.Vector3(4, 5, 6);
const v = new THREE.Vector3(1, 0, 0);

// 计算v在u方向上的投影长度
const projectionLength = v.dot(u.clone().normalize());

console.log("projectionLength", projectionLength);


