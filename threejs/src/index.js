/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2023-09-04 05:53:04
 */
import * as THREE from 'three';
import * as dat from 'dat.gui';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
camera.lookAt(0, 0, 0);

scene.add(camera);


const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
// cube.scale.set(2,2,2);
cube.rotation.x = Math.PI / 4;
scene.add(cube);



const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const controls = new OrbitControls(scene, renderer.domElement);
scene.add(controls);

 window.addEventListener('resize',onWindowResize);


function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth,window.innerHeight);
	
}

// let eventObj = {
// 	Fullscreen:function () {
// 		document.body.requestFullscreen();
// 	},
// 	ExitFullscreen:function() {
// 		document.exitFullscreen()
// 	}
// }

const gui = new dat.GUI();
const folder = gui.addFolder('立方体位置');
folder.add(cube.position,'x',-5,5).name('立方体x轴位置');
folder.add(cube.position,'y',-5,5).name('立方体y轴位置');
folder.add(cube.position,'z',-5,5).name('立方体z轴位置');
// gui.add(eventObj,'Fullscreen').name('全屏');
// gui.add(eventObj,'ExitFullscreen').name('退出全屏')
// console.log(gui);



function animate() {
	controls.update();

	requestAnimationFrame(animate);
	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;
	renderer.render(scene, camera)
}

animate();
