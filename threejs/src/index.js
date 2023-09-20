/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2023-09-21 06:36:31
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import { TextureLoader } from 'three/examples/jsm/loaders/t'
import fragmentShader from './shader/point/fragment.glsl';
import vertexShader from './shader/point/vertex.glsl';


const scene = new THREE.Scene();


const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0,10);
camera.updateProjectionMatrix();

scene.lookAt(0,0,0);

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

document.body.appendChild(renderer.domElement);


const controls = new OrbitControls(camera, renderer.domElement);


const curve = new THREE.CatmullRomCurve3([
	new THREE.Vector3(-10,0,10),
	new THREE.Vector3(-5,5,5),
	new THREE.Vector3(0,0,0),
	new THREE.Vector3(5,-5,5),
	new THREE.Vector3(10,0,10)
],true

);

const points = curve.getPoints(50);
const geometry = new THREE.BufferGeometry().setFromPoints(points);

const material = new THREE.LineBasicMaterial({color:0xff0000});
const curveObject = new THREE.Line(geometry,material);
scene.add(curveObject);



const helper = new THREE.AxesHelper(5);
scene.add(helper)

const light = new THREE.AmbientLight();
scene.add(light);


window.addEventListener('resize',onWindowResize);


function render() {


	requestAnimationFrame(render);


	renderer.render(scene, camera);
}


function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);

}

render();
