/*
 * :file description: 
 * :name: /threejs/examples/castShadow1.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-10 21:51:38
 * :last editor: 张德志
 * :date last edited: 2024-03-10 21:51:39
 */
import * as THREE from 'three';
import Stat from 'stats.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(1,1,10);

const ambientLight = new THREE.AmbientLight(0xffffff,3);
scene.add(ambientLight);

const stat = new Stat();
document.body.appendChild(stat.domElement);

const renderer = new THREE.WebGLRenderer();
// 允许影响
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

const boxGemonetry = new THREE.BoxGeometry(1,1,1);
const boxMaterial = new THREE.MeshBasicMaterial({
  color: 0xff00ff,
});
const box = new THREE.Mesh(boxGemonetry,boxMaterial);
box.position.set(-4,0,0);
scene.add(box);

const sphereGeometry = new THREE.SphereGeometry(1,64,64);
const sphereMaterial = new THREE.MeshBasicMaterial();
const sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);
sphere.castShadow = true;
scene.add(sphere);

const planeGeometry = new THREE.PlaneGeometry(24,24,1,1);
const planeMaterial = new THREE.MeshPhysicalMaterial({
  color:0x999999,
  side:THREE.DoubleSide,
});

const plane = new THREE.Mesh(planeGeometry,planeMaterial);
plane.receiveShadow = true;
plane.rotation.x = -Math.PI / 2;
plane.position.set(0,-2,0);
scene.add(plane);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const directionalLight = new THREE.DirectionalLight(0xffffff,0.6);
directionalLight.castShadow = true;
directionalLight.position.set(10,10,0);
directionalLight.target.position.set(0,0,0);
scene.add(directionalLight);

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight);
scene.add(directionalLightHelper);

const control = new OrbitControls(camera,renderer.domElement);

window.addEventListener('resize',() => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth,window.innerHeight);
})

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
