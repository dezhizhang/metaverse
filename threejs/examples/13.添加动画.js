/*
 * :file description: 
 * :name: /threejs/examples/13.添加动画.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-08-19 22:53:48
 * :last editor: 张德志
 * :date last edited: 2022-08-19 23:02:46
 */
/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-12 07:44:44
 * :last editor: 张德志
 * :date last edited: 2022-08-19 22:48:47
 */
// import * as THREE from 'three';
import * as THREE from 'three';

let step = 0;
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.x = -30;
camera.position.y = 40;
camera.position.z = 30;
camera.lookAt(scene.position);


const renderer = new THREE.WebGL1Renderer();
renderer.setClearColor(new THREE.Color(0xEEEEEE));
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.shadowMap.enabled = true;

// 创建辅助工具
const axes = new THREE.AxesHelper(20);
scene.add(axes);

// 创建平面
const planeGeometry = new THREE.PlaneGeometry(70,50,1,1);
const planeMaterial = new THREE.MeshLambertMaterial({color:new THREE.Color(0xcccccc)});
const plane = new THREE.Mesh(planeGeometry,planeMaterial);
plane.rotation.x = -0.5 * Math.PI;
plane.position.x = 15;
plane.position.y = 0;
plane.position.z = 0;
plane.castShadow = true;
scene.add(plane);


// 设置立方体
const cubeGeometry = new THREE.BoxGeometry(4,4,4);
const cubeMaterial = new THREE.MeshLambertMaterial({color:new THREE.Color(0Xff0000)});
const cube = new THREE.Mesh(cubeGeometry,cubeMaterial);
cube.position.x = 4;
cube.position.y = 3;
cube.position.z = 0;
cube.castShado = true;
scene.add(cube);

// 设置球体
const sphereGeometry = new THREE.SphereGeometry(4,20,20);
const sphereMaterial = new THREE.MeshLambertMaterial({color:new THREE.Color(0x777777)});
const sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);
sphere.position.x = 20;
sphere.position.y = 4;
sphere.position.z = -2;
sphere.castShadow = true;
scene.add(sphere);



document.body.appendChild(renderer.domElement);

// 设置光源
const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(-40,60,-10);
scene.add(spotLight);


function render() {
	cube.rotation.x += 0.02;
	cube.rotation.y += 0.02;


	step += 0.04;

	sphere.position.x = 20 + (10 *Math.cos(step));
	sphere.position.y = 2 + (10 *Math.abs(Math.sin(step)));

	requestAnimationFrame(render);
	renderer.render(scene,camera);
}

render();
