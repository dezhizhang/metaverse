/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2023-09-04 23:22:21
 */
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();


const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight,0.1,1000);
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);

document.body.appendChild(renderer.domElement);

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('https://t7.baidu.com/it/u=2168645659,3174029352&fm=193&f=GIF');


const planeGeometry = new THREE.PlaneGeometry(1,1);
const planeMaterial = new THREE.MeshBasicMaterial({
	color:0xffffff,
	map:texture,
	side:THREE.DoubleSide
});

let plane = new THREE.Mesh(planeGeometry,planeMaterial);
scene.add(plane);

const controls = new OrbitControls(camera,renderer.domElement);







function render() {
	requestAnimationFrame(render);
	renderer.render(scene,camera)
}

render();
