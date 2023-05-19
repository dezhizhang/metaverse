/*
 * :file description:
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2023-05-20 05:32:38
 */
import * as THREE from "three";


// const line3 = new THREE.Line3();
// line3.start = new THREE.Vector3(0,0,0);

// line3.end = new THREE.Vector3(10,10,10);


// const center = new THREE.Vector3();
// line3.getCenter(center);

// console.log(center);

// const line3 = new THREE.Line3();
// line3.start = new THREE.Vector3();
// line3.end = new THREE.Vector3(10,10,10);

// const center = new THREE.Vector3();
// line3.getCenter(center);

// console.log('center',center);

// const L = line3.distance();
// console.log('查看线段距离',L);

// const L2 = line3.distanceSq();
// console.log('查看线段距离平方',L2);


// let ray = new THREE.Ray();
// ray.origin = new THREE.Vector3(1,0,3);

// ray.direction = new THREE.Vector3(1,1,1).normalize();


// let p1 = new THREE.Vector3(20,0,0);
// let p2 = new THREE.Vector3(0,0,10);
// let p3 = new THREE.Vector3(0,30,0);

// const result = ray.intersectTriangle(p1,p2,p3);
// console.log('result',result);



// const result = ray.intersectTriangle(p1,p2,p3);

// console.log('查看是否相交',result);


// let plane = new THREE.Plane();

// let p1 = new THREE.Vector3(20,0,0);
// let p2 = new THREE.Vector3(0,0,10);
// let p3 = new THREE.Vector3(0,30,0);

// plane.setFromCoplanarPoints(p1,p2,p3);

// console.log('normal',plane.normal);
// console.log('cone',plane.constant);


// let point = new THREE.Vector3(20,100,300);
// let l = plane.distanceToPoint(point);

// console.log('点到平面的距离',l);

let plane = new THREE.Plane();

let p1 = new THREE.Vector3(20,0,0);
let p2 = new THREE.Vector3(0,0,10);
let p3 = new THREE.Vector3(0,30,0);

plane.setFromCoplanarPoints(p1,p2,p3);

console.log(plane.normal);
console.log(plane.constant);









