/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2023-09-15 07:56:00
 */
import * as THREE from 'three';
import * as CONNON from 'cannon-es';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const clock = new THREE.Clock();


const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 18);
// scene.lookAt(0,0,0);

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

document.body.appendChild(renderer.domElement);


const controls = new OrbitControls(camera, renderer.domElement);

// 球体
const sphereGeometry = new THREE.SphereGeometry(1, 20, 20);
const sphereMaterial = new THREE.MeshStandardMaterial();
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.castShadow = true;
scene.add(sphere);

// 地面
const planeGeometry = new THREE.PlaneGeometry(10, 10);
const floor = new THREE.Mesh(planeGeometry, sphereMaterial);
floor.position.set(0, -5, 0);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

// 环境光
const ambitLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambitLight);

// 添加平行光
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
scene.add(directionalLight);


// 创建物理世界
const world = new CONNON.World();
world.gravity.set(0.-9.8,0);

const comMaterial = new CONNON.Material();

// 创建物理小球
const sphereShape = new CONNON.Sphere(1);
const shadowBody = new CONNON.Body({
	shape:sphereShape,
	position:new CONNON.Vec3(0,0,0),
	mass:1,
	material:comMaterial
});

world.addBody(shadowBody);











window.addEventListener('resize', onWindowResize);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

function render() {
	requestAnimationFrame(render);

	const deltaTime = clock.getDelta();
	// console.log(deltaTime);

	world.step(1/ 120,deltaTime);

	renderer.render(scene, camera);
}


function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);

}

render();
