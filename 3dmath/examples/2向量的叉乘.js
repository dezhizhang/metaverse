/*
 * :file description: 
 * :name: /3dmath/examples/2向量的叉乘.js
 * :author:张德志
 * :copyright: (c) 2025, Xiaozhi
 * :date created: 2025-03-24 07:33:01
 * :last editor: 张德志
 * :date last edited: 2025-03-24 07:36:33
 */
// 创建两个向量
let v1 = new THREE.Vector3(1, 0, 0);
let v2 = new THREE.Vector3(0, 1, 0);

// 计算叉乘
let result = new THREE.Vector3();
result.crossVectors(v1, v2);

console.log(result); // 结果是 (0, 0, 1)