/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2023-09-13 06:00:45
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();


const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(0,0,10);
scene.lookAt(0,0,0);

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.shadowMap.enabled = true;

document.body.appendChild(renderer.domElement);


const controls = new OrbitControls(camera,renderer.domElement);

const sphereGeometry = new THREE.SphereGeometry(1,20,20);
const material = new THREE.MeshStandardMaterial();
const sphere = new THREE.Mesh(sphereGeometry,material);
// sphere.position.set(0,2,0);
sphere.castShadow = true;
scene.add(sphere);

const planeGeometry = new THREE.PlaneGeometry(10,10);
const plane = new THREE.Mesh(planeGeometry,material);
plane.position.set(0,-1,0);
plane.rotation.x = - Math.PI / 2;
plane.side = THREE.DoubleSide;
plane.receiveShadow = true;
scene.add(plane);


// 环境光
const light = new THREE.AmbientLight(0xffffff,0.5);
scene.add(light);


const pointLight = new THREE.PointLight(0xff0000,1);
pointLight.position.set(2,2,2);
pointLight.castShadow = true;
pointLight.shadow.mapSize.set(512,512);
scene.add(pointLight);

const smallbox = new THREE.Mesh(new THREE.SphereGeometry(0.1,20,20),new THREE.MeshBasicMaterial({color:0xff0000}));
smallbox.position.set(2,2,2);

smallbox.add(pointLight);


const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

function render() {
	requestAnimationFrame(render);
	renderer.render(scene,camera);
}

render();
