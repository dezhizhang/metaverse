/*
 * :file description:
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2024-03-03 18:24:02
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import vertexShader from './shader/water/vertex.glsl';
import fragmentShader from './shader/water/fragment.glsl';


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(0,0,10);
scene.add(camera);

const planeGeometry = new THREE.PlaneGeometry(1,1);

const  shaderMaterial = new THREE.ShaderMaterial({
	vertexShader,
	fragmentShader
})

const plane = new THREE.Mesh(planeGeometry,shaderMaterial);
plane.rotation.x = -Math.PI / 2;
scene.add(plane);


const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);


const controls = new OrbitControls(camera,renderer.domElement);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);



function render() {
	requestAnimationFrame(render);
	renderer.render(scene,camera);
}

render();

