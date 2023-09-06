/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2023-09-07 05:44:40
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


const textureLoader = new THREE.TextureLoader();
const texure = textureLoader.load('https://tugua.oss-cn-hangzhou.aliyuncs.com/model/pictures/soil_normal.jpg');


const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({
	color:0xff00ff,
	// map:texure
	transparent:true,
	alphaMap:texure,
	opacity:0.5,
});
const cube = new THREE.Mesh(geometry,material);
scene.add(cube);


const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);


function render() {
	requestAnimationFrame(render);
	renderer.render(scene, camera);
	
}

render();
