/*
 * :file description: 
 * :name: /threejs/examples/splineCurve.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-02-04 11:14:04
 * :last editor: 张德志
 * :date last edited: 2024-02-04 11:14:05
 */
import * as THREE from 'three';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,10000);
camera.position.set(0,0,10);
scene.add(camera);

const curve = new THREE.SplineCurve([
	new THREE.Vector2(-10,0),
	new THREE.Vector2(-5,5),
	new THREE.Vector2(0,0),
	new THREE.Vector2(5,-5),
	new THREE.Vector2(10,0),
]);

const points = curve.getPoints(50);
const geometry = new THREE.BufferGeometry().setFromPoints(points);
const material = new THREE.LineBasicMaterial({color:0xff0000});

const splineObject = new THREE.Line(geometry,material);
scene.add(splineObject);


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.render(scene,camera);
document.body.appendChild(renderer.domElement);