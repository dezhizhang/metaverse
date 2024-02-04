/*
 * :file description: 
 * :name: /threejs/examples/quadraticBezierCurve3.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-02-04 11:02:01
 * :last editor: 张德志
 * :date last edited: 2024-02-04 11:02:02
 */
import * as THREE from 'three';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(0,0,10);
scene.add(camera);


const curve = new THREE.QuadraticBezierCurve3(
	new THREE.Vector3(-10,0,0),
	new THREE.Vector3(20,15,0),
	new THREE.Vector3(10,0,0),
);

const points = curve.getPoints(50);
const geometry = new THREE.BufferGeometry().setFromPoints(points);
const material = new THREE.LineBasicMaterial({color:0xff0000});

const curveObject = new THREE.Line(geometry,material);
scene.add(curveObject);



const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.render(scene,camera);

document.body.appendChild(renderer.domElement);