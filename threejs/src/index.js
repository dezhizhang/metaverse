/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-12 07:44:44
 * :last editor: 张德志
 * :date last edited: 2022-08-06 09:42:53
 */
import * as THREE from 'three';
import * as dat from 'dat.gui';

import stone from '../assets/textures/general/stone.jpg';
import lm1 from '../assets/textures/lightmap/lm-1.png'
import floorwood from '../assets/textures/general/floor-wood.jpg';

// 创建场影
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);

// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.clearColor(new THREE.Color(0xEEEEEE));
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.shadowMapEnabled = true;

const groundGeom = new THREE.PlaneGeometry(95,95,1,1);
const lm = new THREE.ImageUtils.loadTexture(lm1);
const wood = new THREE.ImageUtils.loadTexture(floorwood);
const groundMaterial = new THREE.MeshBasicMaterial({
    color:0x777777,
    lightMap:lm,
    map:wood
})

groundGeom.faceVertexUvs[1] = groundGeom.faceVertexUvs[0];

const groundMesh = new THREE.Mesh(groundGeom,groundMaterial);
groundMesh.rotation.x = -Math.PI / 2;
groundMesh.rotation.y = 0;
scene.add(groundMesh);

// 创建正方形几何体
const cubeGeometry = new THREE.BoxGeometry(12,12,12);
const cubeGeometry2 = new THREE.BoxGeometry(6,6,6);

const meshMaterial = new THREE.MeshBasicMaterial();
meshMaterial.map = THREE.ImageUtils.loadTexture(stone);

const cube = new THREE.Mesh(cubeGeometry,meshMaterial);
const cube2 = new THREE.Mesh(cubeGeometry2,meshMaterial);
cube.position.set(0.9,6,-12);
cube2.position.set(-13.2,3,-6);

// 添加到场景中
scene.add(cube);
scene.add(cube2);

// 设置相机的位置
camera.position.x = -20;
camera.position.y = 20;
camera.position.z = 30;
camera.lookAt(new THREE.Vector3(0, 0, 0));


// 创建平行光
const ambientLight = new THREE.AmbientLight(0x0c0c0c);
scene.add(ambientLight);


document.body.append(renderer.domElement);


function render(){
    requestAnimationFrame(render);
    renderer.render(scene,camera);
}

render();


