/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-12 07:44:44
 * :last editor: 张德志
 * :date last edited: 2022-08-04 07:46:55
 */
import * as THREE from 'three';
import * as dat from 'dat.gui';

// 创建场影
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);

// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(new THREE.Color(0xEEEEEE));
renderer.setSize(window.innerWidth,window.innerHeight);

// 创建平面
const planeGeometry = new THREE.PlaneGeometry(60,20,1,1);
const planeMaterial = new THREE.MeshLambertMaterial({color:0xffffff});
const plane = new THREE.Mesh(planeGeometry,planeMaterial);

// 设置平面的位置
plane.rotation.x = -0.5 * Math.PI;
plane.position.x = 15;
plane.position.y = 0;
plane.position.z = 0;

// 添加到场影中
scene.add(plane);

// 创建几何体
const cubeGeometry = new THREE.BoxGeometry(4,4,4);
const cubeMaterial = new THREE.MeshLambertMaterial({color:0xff0000});
const cube = new THREE.Mesh(cubeGeometry,cubeMaterial);

// 设置几何体位置
cube.position.x = -9;
cube.position.y = 3;
cube.position.z = 0;
scene.add(cube);

// 创建圆形几何体
const sphereGeometry = new THREE.SphereGeometry(4,20,20);
const sphereMaterial = new THREE.MeshLambertMaterial({color:0x7777ff});
const sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);

// 设置园形的位置
sphere.position.x = 20;
sphere.position.y = 0;
sphere.position.z = 2;

// 添加到场影中
scene.add(sphere);

// 创建圆柱体
const cylinderGeometry = new THREE.CylinderGeometry(2,2,20);
const cylinderMaterial = new THREE.MeshLambertMaterial({color:0x77ff77});
const cylinder = new THREE.Mesh(cylinderGeometry,cylinderMaterial);

cylinder.position.set(0,0,1);
scene.add(cylinder);

// 设置相机的位置
camera.position.x = -30;
camera.position.y = 40;
camera.position.z = 30;
camera.lookAt(scene.position);

// 设置光源
const ambientLight = new THREE.AmbientLight(0x0c0c0c);
scene.add(ambientLight);

// 设置点光源
const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(-40,60,-10);
scene.add(spotLight);

document.body.append(renderer.domElement);

let step = 0;
let scalingStep = 0;

let controls = new function() {
    this.rotationSpeed = 0.02;
    this.bouncingSpeed = 0.03;
    this.scalingSpeed = 0.03;
} 

let gui = new dat.GUI();
gui.add(controls,'rotationSpeed',0,0.5);
gui.add(controls,'bouncingSpeed',0,0.5);
gui.add(controls,'scalingSpeed',0,0.5);



function render() {
    cube.rotation.x += controls.rotationSpeed;
    cube.rotation.y += controls.rotationSpeed;
    cube.rotation.z += controls.rotationSpeed;

    // bounce the sphere up and down
    step += controls.bouncingSpeed;
    sphere.position.x = 20 + ( 10 * (Math.cos(step)));
    sphere.position.y = 2 + ( 10 * Math.abs(Math.sin(step)));

    // scale the cylinder

    scalingStep += controls.scalingSpeed;
    var scaleX = Math.abs(Math.sin(scalingStep / 4));
    var scaleY = Math.abs(Math.cos(scalingStep / 5));
    var scaleZ = Math.abs(Math.sin(scalingStep / 7));
    cylinder.scale.set(scaleX, scaleY, scaleZ);

    // render using requestAnimationFrame
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

render();


