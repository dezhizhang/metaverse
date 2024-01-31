/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2024-01-31 23:06:02
 */
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

// 创建场影
const scene = new THREE.Scene();
//  添加背影
scene.background =  new THREE.CubeTextureLoader().setPath('/').load(['01.jpg','01.jpg','01.jpg','01.jpg','01.jpg','01.jpg']);



// 添加雾
const fog = new THREE.Fog(new THREE.Color(0xcccccc,10,15));

scene.add(fog);


// 创建相机
const camera = new THREE.PerspectiveCamera();
camera.position.z = 10;
camera.position.y  = 2;

// 创建立方体
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({color:0x0ff00});

const cube = new THREE.Mesh(geometry,material);
cube.position.set(0,3,0);

scene.add(cube);

// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);

const controls = new OrbitControls(camera,renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.01;

controls.autoRotate = true;


const axesHelper = new THREE.AxesHelper(5);
axesHelper.position.y = 3;
scene.add(axesHelper);




// controls.addEventListener('change',function() {
// 	console.log('触发');
// })

document.body.appendChild(renderer.domElement);

const helper = new THREE.GridHelper(10,10);
scene.add(helper);

function animate() {
	requestAnimationFrame(animate);
	// cube.rotation.x += 0.01;
	controls.update();
	renderer.render(scene,camera);
}


animate();

