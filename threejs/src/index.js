/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2023-09-11 07:39:27
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

document.body.appendChild(renderer.domElement);


const controls = new OrbitControls(camera, renderer.domElement);


const cubeTextureLoader = new THREE.CubeTextureLoader();
const baseUrl = 'https://threejs.org/examples/textures/cube/angus/'
const textureCube = cubeTextureLoader.load([
	`${baseUrl}cube_m00_c00.jpg`, `${baseUrl}cube_m00_c01.jpg`,
	`${baseUrl}cube_m00_c02.jpg`, `${baseUrl}cube_m00_c03.jpg`,
	`${baseUrl}cube_m00_c04.jpg`, `${baseUrl}cube_m00_c05.jpg`,
])


const light = new THREE.AmbientLight(0xffffff);
scene.add(light);

const directionLight = new THREE.DirectionalLight(0xffffff,0.5);
directionLight.position.set(10,10,10);
scene.add(directionLight);


const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: textureCube } );
const cube = new THREE.Mesh(geometry,material);
scene.add(cube);


const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);


function render() {
	requestAnimationFrame(render);
	renderer.render(scene, camera);
	
}

render();
