/*
 * :file description: 
 * :name: /threejs/examples/动画/1.基本动画.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-12 07:44:44
 * :last editor: 张德志
 * :date last edited: 2022-08-01 07:59:17
 */
import * as THREE from 'three';
import * as dat from 'dat.gui';

// 创建场影
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);

// 创建渲染器
let renderer = new THREE.WebGLRenderer();
renderer.setClearColor(new THREE.Color(0xEEEEEE));
renderer.setSize(window.innerWidth,window.innerHeight);

document.body.append(renderer.domElement);

// 创建平面
let planeGeometry = new THREE.PlaneGeometry(60,20,1,1);
let planeMaterial = new THREE.MeshLambertMaterial({color:0xffffff});
let plane = new THREE.Mesh(planeGeometry,planeMaterial);

plane.rotation.x = -0.5 * Math.PI;
plane.position.x = 15;
plane.position.y = 0;
plane.position.z = 0;

scene.add(plane);

// 创建几何体 
let cubeGeometry = new THREE.BoxGeometry(4,4,4);
let cubeMaterial = new THREE.MeshLambertMaterial({color:0xff00000})
let cube = new THREE.Mesh(cubeGeometry,cubeMaterial);

cube.position.x = -9;
cube.position.y = 3;
cube.position.z = 0;

scene.add(cube);

// 创建球体
let sphereGeometry = new THREE.SphereGeometry(4,20,20);
let sphereMaterial = new THREE.MeshLambertMaterial({color:0x7777ff});
let sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);

sphere.position.x = 20;
sphere.position.y = 0;
sphere.position.z = 2;
scene.add(sphere);

// 创建圆柱体

let cylinderGeometry = new THREE.CylinderGeometry(2,2,20);
let cylinderMaterial = new THREE.MeshLambertMaterial({color:0x77ff77});
let cylinder = new THREE.Mesh(cylinderGeometry,cylinderMaterial);
cylinder.position.set(0,0,1);
scene.add(cylinder);

// 创建平行光
let ambientLight = new THREE.AmbientLight(0x0c0c0c);
scene.add(ambientLight);

// 创建点光源
let spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(-40,60,-10);
scene.add(spotLight);



// 设置相机的位置
camera.position.x = -30;
camera.position.y = 40;
camera.position.z = 30;
camera.lookAt(scene.position);



var step = 0;
    var scalingStep = 0;

    var controls = new function () {
        this.rotationSpeed = 0.02;
        this.bouncingSpeed = 0.03;
        this.scalingSpeed = 0.03;
    };

    var gui = new dat.GUI();
    gui.add(controls, 'rotationSpeed', 0, 0.5);
    gui.add(controls, 'bouncingSpeed', 0, 0.5);
    gui.add(controls, 'scalingSpeed', 0, 0.5);


function render() {
     // rotate the cube around its axes
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

    requestAnimationFrame(render);
    renderer.render(scene,camera);
}

render();



