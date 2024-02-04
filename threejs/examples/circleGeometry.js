/*
 * :file description: 
 * :name: /threejs/examples/circleGeometry.JS
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-02-04 14:44:59
 * :last editor: 张德志
 * :date last edited: 2024-02-04 14:45:00
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,10000);
camera.position.set(0,0,10);
scene.add(camera);


const geometry = new THREE.CircleGeometry(5,32);
const material = new THREE.MeshBasicMaterial({color:0xffff00});
const circle = new THREE.Mesh(geometry,material);
scene.add(circle);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);

const control = new OrbitControls(camera,renderer.domElement);

function render() {
	requestAnimationFrame(render);
	renderer.render(scene,camera);
}


render();

document.body.appendChild(renderer.domElement);
