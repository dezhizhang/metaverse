/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-12 07:44:44
 * :last editor: 张德志
 * :date last edited: 2022-07-30 08:39:39
 */

import * as THREE from 'three';
import * as Stats from 'stats.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// // 创建场影
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);

// 创建渲染器
const renderer = new THREE.WebGL1Renderer();
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth,window.innerHeight);

document.body.append(renderer.domElement);

const geometry = new THREE.BoxGeometry(4,4,4);
const material = new THREE.MeshLambertMaterial({color:0x002299});
const cube = new THREE.Mesh(geometry,material);
scene.add(cube);

// 创建控制器
const controls = new OrbitControls(camera,renderer.domElement);

// const axes = new THREE.AxesHelper(50);
// scene.add(axes);

const axes = new THREE.AxesHelper(50);
scene.add(axes);



camera.position.z = 35;
camera.position.x = -30;
camera.position.y = 45;
camera.lookAt(scene.position);


cube.castShadow = true;

cube.position.x = 4;
cube.position.y = 10;
cube.position.z = 20;


const planeGeometry = new THREE.PlaneGeometry(100,100);
const planeMaterial = new THREE.MeshLambertMaterial({color:0xccccc});
const plane = new THREE.Mesh(planeGeometry,planeMaterial);

plane.rotation.x = -0.5 * Math.PI;
plane.position.set(15,0,0);
plane.receiveShadow  = true;

scene.add(plane);

// 添加光源
const ambientLight = new THREE.AmbientLight(0xAAAAAA);
scene.add(ambientLight);


// 生成聚光灯
const spotLight = new THREE.SpotLight(0xFFFFFF);
spotLight.position.set(-60,40,-64);
spotLight.castShadow = true;
spotLight.shadow.mapSize = new THREE.Vector2(1024,1024);
spotLight.shadow.camera.far  = 130;
spotLight.shadow.camera.near = 40;
scene.add(spotLight);
const stats = addStatus();

function render() {
    stats.update();
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    requestAnimationFrame(render);
    renderer.render(scene,camera);
}

function addStatus() {
    const stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.getElementById('status').appendChild(stats.domElement);
    return stats;
}

render();




