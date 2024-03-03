/*
 * :file description:
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2024-03-03 21:14:14
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


const clock = new THREE.Clock();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 10);
scene.add(camera);


const planeGeometry = new THREE.PlaneGeometry(1, 1, 512, 512);


const meshBasicMaterial = new THREE.MeshBasicMaterial({
	color:0xff00ff
});

const basicUnifrom = {
	uTime:{
		value:0,
	}
}

meshBasicMaterial.onBeforeCompile = function(shader,renderer) {
	console.log(shader.vertexShader)

	console.log(basicUnifrom)

	shader.uniforms.uTime = basicUnifrom.uTime;
	shader.vertexShader = shader.vertexShader.replace(
		'#include <common>',
		`
		#include <common>
		uniform float uTime;
		`
	)
	shader.vertexShader = shader.vertexShader.replace(
		'#include <begin_vertex>',
		`
		#include <begin_vertex>
		transformed.x += sin(uTime) * 2.0;
		transformed.z += cos(uTime) * 2.0;
		`
	)
}

const plane = new THREE.Mesh(planeGeometry, meshBasicMaterial);
plane.rotation.y = -Math.PI / 2;
scene.add(plane);


const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

function render() {
  requestAnimationFrame(render);
  const elapsedTime = clock.getElapsedTime();
  basicUnifrom.uTime.value = elapsedTime;
  renderer.render(scene, camera);
}

render();
