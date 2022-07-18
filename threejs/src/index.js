/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-12 07:44:44
 * :last editor: 张德志
 * :date last edited: 2022-07-19 07:50:43
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';

const step = 0;
const gui = new dat.GUI();



//创建场影
const scene = new THREE.Scene();

//创健相机
const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);

// 创建渲染器
const renderer = new THREE.WebGL1Renderer();
renderer.setClearColor(new THREE.Color(0xEEEEEE));
renderer.setSize(window.innerWidth,window.innerHeight);


// 创建平面
const planeGeometry = new THREE.PlaneGeometry(60,20,20,20);
const planeMaterial = new THREE.MeshPhongMaterial({color:0xffffff});
const plane = new THREE.Mesh(planeGeometry,planeMaterial);
plane.receiveShadow = true;

// 设置平面位置 
plane.rotation.x = -0.5 * Math.PI;
plane.position.x = 15;
plane.position.y = 0;
plane.position.z = 0;

scene.add(plane);

// 创建几何体
const cubeGeometry = new THREE.BoxBufferGeometry(4,4,4);
const cubeMaterial = new THREE.MeshBasicMaterial({color:0xff7777});
const cube = new THREE.Mesh(cubeGeometry,cubeMaterial);
cube.castShadow = true;

// 设置几何体位置
cube.position.x = -4;
cube.position.y = 3;
cube.position.z = 0;

// 将几何添加场影中
scene.add(cube);


const sphereGeometry = new THREE.SphereGeometry(4,20,20);
const sphereMaterial = new THREE.MeshLambertMaterial({color:0x7777ff});
const sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);

// 设置园形的全置
sphere.position.x = 20;
sphere.position.y = 0;
sphere.position.z = 2;
sphere.castShadow = true;

// 将几何添加到场景中
scene.add(sphere);

const ambiColor = '#0c0c0c';
const ambientLight = new THREE.AmbientLight(ambiColor);
scene.add(ambientLight);

// 设置点光源

const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(-40,60,-10);
spotLight.castShadow = true;
scene.add(spotLight);

// 
const pointColor = '#ccffcc';
const pointLight = new THREE.PointLight(pointColor);
pointLight.distance = 100;
scene.add(pointLight);

const sphereLight = new THREE.SphereGeometry(0.2);
const sphereLightMaterial = new THREE.MeshBasicMaterial({color: 0xac6c25});
const sphereLightMesh = new THREE.Mesh(sphereLight,sphereLightMaterial);
sphereLightMesh.castShadow = true;
scene.add(sphereLightMesh);





// 设置相机位置
camera.position.x -25;
camera.position.y = 30;
camera.position.z = 25;
camera.lookAt(new THREE.Vector3(10,0,0));
document.body.append(renderer.domElement);





function render() {
    // cube.rotation.x += controls.rotationSpeed;
    // cube.rotation.y += controls.rotationSpeed;
    // cube.rotation.z += controls.rotationSpeed;

    // // bounce the sphere up and down
    // step += controls.bouncingSpeed;
    sphere.position.x = 20 + ( 10 * (Math.cos(step)));
    sphere.position.y = 2 + ( 10 * Math.abs(Math.sin(step)));

 

    
    requestAnimationFrame(render);
    renderer.render(scene,camera);
}

render();

