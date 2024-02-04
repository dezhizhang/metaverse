/*
 * :file description: 
 * :name: /threejs/examples/torusKnotGeometry.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-02-04 17:43:11
 * :last editor: 张德志
 * :date last edited: 2024-02-04 17:43:12
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.001,1000);
camera.position.set(0,0,10);
scene.add(camera);

const geometry = new THREE.TorusKnotGeometry(10,3,100,16);
const material = new THREE.MeshBasicMaterial({color:0xffff00});
const torusKnot = new THREE.Mesh(geometry,material);
scene.add(torusKnot);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);

const controls = new OrbitControls(camera,renderer.domElement);

function render() {
	requestAnimationFrame(render);
	renderer.render(scene,camera);
}

render();

document.body.appendChild(renderer.domElement);