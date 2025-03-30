/*
 * :file description: 
 * :name: /3dmath/examples/3.lerp差值函数.js
 * :author:张德志
 * :copyright: (c) 2025, Xiaozhi
 * :date created: 2025-03-30 13:59:38
 * :last editor: 张德志
 * :date last edited: 2025-03-30 13:59:38
 */
import * as THREE from "three";

const pos1 = new THREE.Vector3(0,0,0);
const pos2 = new THREE.Vector3(10,0,0);
const lerpedPos = pos1.lerp(pos2,0.5);
console.log('lerpedPos',lerpedPos);


