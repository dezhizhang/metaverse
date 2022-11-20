/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-12 07:44:44
 * :last editor: 张德志
 * :date last edited: 2022-11-21 06:20:32
 */
import * as THREE from 'three';
import gsap from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui';

// const matrix4 = new THREE.Matrix4();

// console.log(matrix4);

// const line3 = new THREE.Line3();
// line3.start = new THREE.Vector3(0,0,0);
// line3.end = new THREE.Vector3(10,10,10);
 

// const center = new THREE.Vector3();


// line3.getCenter(center);

// const distance = line3.distance();


// console.log(center);

// console.log('distance',distance);

// const line3 = new THREE.Line3();
// line3.start = new THREE.Vector3(0,0,0);
// line3.end = new THREE.Vector3(10,10,10);


// const center = new THREE.Vector3();
// line3.getCenter(center);

// const distance = line3.distance();

// console.log('center',center);
// console.log('distance',distance);

// const ray = new THREE.Ray();

// ray.origin = new THREE.Vector3(10,0,3);

// ray.direction = new THREE.Vector3(1,1,1).normalize();

// const p1 = new THREE.Vector3(20,0,0);
// const p2 = new THREE.Vector3(0,0,10);
// const p3 = new THREE.Vector3(0,30,0);

// const result = ray.intersectTriangle(p1,p2,p3);
// console.log('是否相交',result);

// const  triangle = new THREE.Triangle();
// triangle.a = new THREE.Vector3(20,0,0);
// triangle.b = new THREE.Vector3(0,0,10);
// triangle.c = new THREE.Vector3(0,30,0);


// const s = triangle.getArea();
// const normal = new THREE.Vector3();
// triangle.getNormal(normal);
// console.log('三角形面和',s);
// console.log('三角形法线',normal);

// const triangle = new THREE.Triangle();
// triangle.a = new THREE.Vector3(20,0,0);
// triangle.b = new THREE.Vector3(0,0,10);
// triangle.c = new THREE.Vector3(0,30,0);

// const s = triangle.getArea();
// const normal = new THREE.Vector3();
// triangle.getNormal(normal);

// console.log('三角形面和',s);
// console.log('三角形法线',normal);

const plane = new THREE.Plane();


const p1 = new THREE.Vector3(20,0,0);
const p2 = new THREE.Vector3(0,0,10);
const p3 = new THREE.Vector3(10,30,0);


plane.setFromCoplanarPoints(p1,p2,p3);

const point = new THREE.Vector3(20,100,300);

const l = plane.distanceToPoint(point);


console.log(plane.constant);

console.log('点到平面的距离',l);









