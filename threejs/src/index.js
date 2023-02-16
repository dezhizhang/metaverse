/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2022-07-12 07:44:44
 * :last editor: 张德志
 * :date last edited: 2023-02-17 06:19:49
 */
import * as THREE from 'three';


// const mesh = new THREE.Mesh();
// console.log('mesh',mesh.position);


// const p1 = new THREE.Vector3(10,20,15);
// // const v1 = p1.clone();
// // console.log('v1',v1 === p1);

// const p2 = new THREE.Vector3(20,30,-10);


// const l = p1.clone().sub(p2);
// console.log('l',l);

// const mat4 = new THREE.Matrix4();

// console.log(mat4.elements);

const mat4 = new THREE.Matrix4();
mat4.set(1,0,0,5,0,1,0,3,0,0,1,9,0,0,0,1);

mat4.transpose();


console.log(mat4.elements);



