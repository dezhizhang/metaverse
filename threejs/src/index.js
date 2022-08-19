/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-12 07:44:44
 * :last editor: 张德志
 * :date last edited: 2022-08-19 20:48:33
 */
// import * as THREE from 'three';
import * as THREE from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(72,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.x = -30;
camera.position.y = 40;
camera.position.z = 30;
camera.lookAt(scene.position);


const renderer = new THREE.WebGL1Renderer();
renderer.setClearColor(new THREE.Color(0xEEEEEE));
renderer.setSize(window.innerWidth,window.innerHeight);



// 设置辅助工具
const axes = new THREE.AxesHelper(20);
scene.add(axes);

// 设置平面
const planeGeometry = new THREE.PlaneGeometry(70,50,1,1);
const planeMaterial = new THREE.MeshBasicMaterial({color:new THREE.Color(0xcccccc)});
const plane = new THREE.Mesh(planeGeometry,planeMaterial);
plane.rotation.x = -0.5 * Math.PI;
plane.position.x = 15;
plane.position.y = 0;
plane.position.z = 0;


scene.add(plane);

// 设置立方体
const cubeGeometry = new THREE.BoxGeometry(4,4,4);
const cubeMaterial = new THREE.MeshBasicMaterial({color:new THREE.Color(0Xff00),wireframe:true});
const cube = new THREE.Mesh(cubeGeometry,cubeMaterial);
cube.position.x = 4;
cube.position.y = 3;
cube.position.z = 0;

scene.add(cube);

// 设置球体
const sphereGeometry = new THREE.SphereGeometry(4,20,20);
const sphereMaterial = new THREE.MeshBasicMaterial({color:new THREE.Color(0x777777),wireframe:true});
const sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);
sphere.position.x = 20;
sphere.position.y = 4;
sphere.position.z = -2;


scene.add(sphere);

document.body.appendChild(renderer.domElement);



function render() {
	requestAnimationFrame(render);
	renderer.render(scene,camera);
}

render();






