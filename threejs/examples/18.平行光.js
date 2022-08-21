/*
 * :file description: 
 * :name: /threejs/examples/18.平行光.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-08-21 16:33:20
 * :last editor: 张德志
 * :date last edited: 2022-08-21 16:33:20
 */
/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-12 07:44:44
 * :last editor: 张德志
 * :date last edited: 2022-08-21 16:33:26
 */

import * as THREE from 'three';

const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.x = -30;
camera.position.y = 40;
camera.position.z = 40;
camera.lookAt(scene.position);

// 创建渲染器
const renderer = new THREE.WebGL1Renderer();
renderer.setClearColor(new THREE.Color(0xEEEEEEE));
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.shadowMap.enabled = true;

// 创建平面
const planeGeometry = new THREE.PlaneGeometry(70,50,1,1);
const planeMaterial = new THREE.MeshLambertMaterial({color:new THREE.Color(0x000000)});
const plane = new THREE.Mesh(planeGeometry,planeMaterial);
plane.rotation.x = -0.5 * Math.PI;
plane.position.x = 0;
plane.position.y = 0;
plane.position.z = 0;
scene.add(plane);


//添加环境光
const ambientLight = new THREE.AmbientLight('#1c1c1c');
scene.add(ambientLight);

// 添加平行光
const target = new THREE.Object3D();
target.position.set(5,0,0);

const directionLight = new THREE.DirectionalLight('#ff5818');
directionLight.position.set(-40,60,-11);
directionLight.castShadow = true;

directionLight.shadowCameraFar = 200;
directionLight.shadowMapWidth = 1000;

directionLight.intensity = 0.5;
directionLight.target = target;

scene.add(directionLight);

document.body.appendChild(renderer.domElement);

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


