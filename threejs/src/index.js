/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2023-09-06 05:36:01
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


// const boxGeometry = new THREE.BoxGeometry(1, 1, 100);
// const boxMaterial = new THREE.MeshBasicMaterial({
// 	color: 0x00ff00
// });
// const box = new THREE.Mesh(boxGeometry, boxMaterial);
// scene.add(box);

// scene.fog = new THREE.Fog(0x999999, 0.1, 50);
// scene.background = new THREE.Color(0x999999);

// const gltfloader = new GLTFLoader();
// gltfloader.load('https://threejs.org/examples/models/gltf/RobotExpressive/RobotExpressive.glb', (gltf) => {
// 	console.log(gltf);
// 	scene.add(gltf.scene);
// })

// const sphereGeometry = new THREE.SphereGeometry(1,32,32);
// const sphereMaterial = new THREE.MeshBasicMaterial({
// 	color:0x00ff00
// });
// const sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);
// sphere.position.x = -2;
// scene.add(sphere);

// const sphereGeometry1 = new THREE.SphereGeometry(1,32,32);
// const sphereMaterial1 = new THREE.MeshBasicMaterial({
// 	color:0x0000ff
// });
// const sphere2 = new THREE.Mesh(sphereGeometry1,sphereMaterial1);
// scene.add(sphere2);

// const sphereGeometry2 = new THREE.SphereGeometry(1,32,32);
// const sphereMaterial2 = new THREE.MeshBasicMaterial({
// 	color:0xff00ff
// });

// const sphere3 = new THREE.Mesh(sphereGeometry2,sphereMaterial2);
// sphere3.position.x = 2;
// scene.add(sphere3);


// const raycaster = new THREE.Raycaster();

// const mouse = new THREE.Vector2();

// window.addEventListener('click',(event) => {
// 	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
// 	mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

// 	raycaster.setFromCamera(mouse,camera);
// 	const intersects = raycaster.intersectObjects(scene.children);
// 	if(intersects.length) {
// 		intersects[0].object.material.color.set(0xff0000)
// 	}
// })

const sphere = new THREE.Mesh(
	new THREE.SphereGeometry(1,32,32),
	new THREE.MeshBasicMaterial({
		color:0x00ff00
	})
);
sphere.position.x = -4;
scene.add(sphere);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);


const tween = new Tween(sphere.position);
tween.to({x:4},1000);
//tween.repeat(Infinity);
//tween.easing(Tween.easing.U)


const tween2 = new Tween(sphere.position);
tween2.to({y:-4},1000);
tween.chain(tween2);

tween.start();
// tween2.start();






function render() {
	requestAnimationFrame(render);
	renderer.render(scene, camera);
	tween.update();
	
}

render();
