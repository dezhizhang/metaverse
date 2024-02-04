/*
 * :file description: 
 * :name: /threejs/examples/shapeGeometry.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-02-04 16:48:07
 * :last editor: 张德志
 * :date last edited: 2024-02-04 16:51:28
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.01,1000);
camera.position.set(0,0,10);
scene.add(camera);

const geometry = new THREE.RingGeometry(1,5,32);
const material = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide});
const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);

const controls = new OrbitControls(camera,renderer.domElement);

function render() {
	requestAnimationFrame(render);
	renderer.render(scene,camera);
}

render();

document.body.appendChild(renderer.domElement);
