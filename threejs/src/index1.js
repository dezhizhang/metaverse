/*
 * :file description: 
 * :name: /threejs/src/index1.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2023-09-06 20:06:21
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {Tween} from 'three/examples/jsm/libs/tween.module.js';

const scene = new THREE.Scene();

scene.fog = new THREE.Fog()


const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.25, 100);
camera.position.set(- 5, 3, 10);
camera.lookAt(0, 2, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);


const controls = new OrbitControls(camera, renderer.domElement);


for(let i=0;i < 50;i++) {
	const geometry = new THREE.BufferGeometry();
	const vertices = new Float32Array(9);
	for(let j =0;j < 9;j++) {
		vertices[j] = Math.random() * 5 - 2.5;
	}
	geometry.setAttribute('position',new THREE.BufferAttribute(vertices,3));
	const color = new THREE.Color(Math.random(),Math.random(),Math.random());
	const material = new THREE.MeshBasicMaterial({color:color,side:THREE.DoubleSide});
	const mesh = new THREE.Mesh(geometry,material);
	scene.add(mesh);
}



const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);


function render() {
	requestAnimationFrame(render);
	renderer.render(scene, camera);
	
}

render();
