/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-08-21 15:01:07
 * :last editor: 张德志
 * :date last edited: 2022-08-27 15:15:14
 */
/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-12 07:44:44
 * :last editor: 张德志
 * :date last edited: 2022-08-21 15:00:19
 */

import * as THREE from 'three';


const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.x = -30;
camera.position.y = 40;
camera.position.z = 40;
camera.lookAt(scene.position);


const renderer = new THREE.WebGL1Renderer();
renderer.setClearColor(new THREE.Color(0xEEEEEEE));
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.shadowMapEnabled = true;

// 创建平面
const planeGeometry = new THREE.PlaneGeometry(70,50,1,1);
const planeMaterial = new THREE.MeshLambertMaterial({color:new THREE.Color(0x000000)});
const plane = new THREE.Mesh(planeGeometry,planeMaterial);
plane.rotation.x = -0.5 * Math.PI;
plane.position.x = 0;
plane.position.y = 0;
plane.position.z = 0;
scene.add(plane);


const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(-40,60,10);
scene.add(pointLight);


document.body.append(renderer.domElement);


const cubeGeometry = new THREE.BoxGeometry(5,5,5);
const cubeMaterial = new THREE.MeshLambertMaterial({color:0xff0000});
const cube = new THREE.Mesh(cubeGeometry,cubeMaterial);
cube.position.set(0,5,0);
scene.add(cube);


const sphereGeometry = new THREE.SphereGeometry(4,30,25);
const sphereMaterial = new THREE.MeshLambertMaterial({color:0x7777ff});
const sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);
sphere.position.set(-10,6,0);
scene.add(sphere);


function render() {
	
	requestAnimationFrame(render);
	renderer.render(scene,camera);
}

render();


