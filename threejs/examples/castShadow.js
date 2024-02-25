/*
 * :file description: 
 * :name: /threejs/examples/castShadow.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2024-02-25 14:26:17
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


//创建场影
const scene = new THREE.Scene();

//创建相机
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(0,0,10);
scene.add(camera);

// 
const sphereGeometry = new THREE.SphereGeometry(1,20,20);
const material = new THREE.MeshStandardMaterial({

});

const sphere = new THREE.Mesh(sphereGeometry,material);
sphere.castShadow = true;
scene.add(sphere);

const planeGeometry = new THREE.PlaneGeometry(10,10);
const plane = new THREE.Mesh(planeGeometry,material);
plane.position.set(0,-1,0);
plane.rotation.x = -Math.PI / 2;
plane.receiveShadow = true;
scene.add(plane);


// 灯光
const directionalLight = new THREE.DirectionalLight(0xffffff,0.5);
directionalLight.position.set(10,10,10);
directionalLight.castShadow = true;
scene.add(directionalLight);

const light = new THREE.AmbientLight(0xffffff,0.5);
scene.add(light);



const renderer = new THREE.WebGLRenderer(); 
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true; 


const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);


function render() {
  requestAnimationFrame(render);
  renderer.render(scene,camera);
}

render();

const controls = new OrbitControls(camera,renderer.domElement);


document.body.appendChild(renderer.domElement);



