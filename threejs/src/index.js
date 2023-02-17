/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-02-17 21:42:17
 * :last editor: 张德志
 * :date last edited: 2023-02-18 06:27:04
 */
import * as THREE from 'three';


// // 创㶳射线ray
// let ray = new THREE.Ray();
// ray.origin = new THREE.Vector3(0,0,3);

// ray.direction = new THREE.Vector3(1,1,1).normalize();

// const p1 = new THREE.Vector3(20,0,0);
// const p2 = new THREE.Vector3(0,0,10);
// const p3 = new THREE.Vector3(0,30,0);

// const result = ray.intersectTriangle(p1,p2,p3);
// console.log('查看是否相交',result);

// const triangle = new THREE.Triangle();

// triangle.a = new THREE.Vector3(20,0,0);

// triangle.b = new THREE.Vector3(0,0,10);

// triangle.c = new THREE.Vector3(0,30,0);

// const s = triangle.getArea();

// console.log('三角形面积',s);


// const triangle = new THREE.Triangle();
// triangle.a = new THREE.Vector3(20,0,0);
// triangle.b = new THREE.Vector3(0,0,10);
// triangle.c = new THREE.Vector3(0,30,0);

// const s = triangle.getArea();
// console.log('三角形面积',s);

const triangle = new THREE.Triangle();
triangle.a = new THREE.Vector3(20,0,0);
triangle.b = new THREE.Vector3(0,0,10);
triangle.c = new THREE.Vector3(0,30,0);

const s = triangle.getArea();
console.log('三角形面积',s);












