/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2023-09-12 06:02:12
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

scene.fog = new THREE.Fog()


const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.25, 100);
camera.position.set(- 5, 3, 10);
camera.lookAt(0, 2, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

document.body.appendChild(renderer.domElement);


const controls = new OrbitControls(camera, renderer.domElement);


const sphereGeometry = new THREE.SphereGeometry(1,20,20);
const material = new THREE.MeshStandardMaterial();
const sphere = new THREE.Mesh(sphereGeometry,material);
sphere.castShadow = true;
scene.add(sphere);


const planeGeometry = new THREE.PlaneGeometry(10,10);
const plane = new THREE.Mesh(planeGeometry,material);
plane.position.set(0,-1,0);
plane.rotation.x = -Math.PI / 2;
plane.receiveShadow = true;
scene.add(plane);


const light = new THREE.AmbientLight(0xffffff,0.5);
scene.add(light);

// 平行光
const directionalLight = new THREE.DirectionalLight(0xffffff,0.5);
directionalLight.position.set(10,10,10);
directionalLight.castShadow = true;
scene.add(directionalLight);


const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);


function render() {
	requestAnimationFrame(render);
	renderer.render(scene, camera);
	
}

render();
