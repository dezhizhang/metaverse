/*
 * :file description: 
 * :name: /threejs/examples/15.点光源.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-08-21 14:41:07
 * :last editor: 张德志
 * :date last edited: 2022-08-21 14:41:08
 */
/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-12 07:44:44
 * :last editor: 张德志
 * :date last edited: 2022-08-21 14:40:01
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
const planeMaterial = new THREE.MeshLambertMaterial({color:new THREE.Color(0xEEEEEE)});
const plane = new THREE.Mesh(planeGeometry,planeMaterial);
plane.rotation.x = -0.5 * Math.PI;
plane.position.x = 0;
plane.position.y = 0;
plane.position.z = 0;
scene.add(plane);

// 创建环境光
const ambientLight = new THREE.AmbientLight(new THREE.Color(0xffffff));
scene.add(ambientLight);

// 创建点光源
const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(-40,60,-10);
spotLight.castShadow = true;
scene.add(spotLight);

document.body.append(renderer.domElement);

const geometry = new THREE.BoxGeometry(4,4,4);
const material = new THREE.MeshLambertMaterial({color:new THREE.Color(0X00cc00)});
const cube = new THREE.Mesh(geometry,material);

cube.position.x = -10;
cube.position.y = 10;
cube.position.z = -1;

scene.add(cube);



function render() {
	
	requestAnimationFrame(render);
	renderer.render(scene,camera);
}

render();
