/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-12 07:44:44
 * :last editor: 张德志
 * :date last edited: 2022-08-03 23:38:13
 */
import * as THREE from 'three';
import * as dat from 'dat.gui';

const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);

// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(new THREE.Color(0xEEEEEE));
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.shadowMapEnabled = true;

// 创建平面
const planeGeometry = new THREE.PlaneGeometry(60,20,1,1);
const planeMaterial = new THREE.MeshLambertMaterial({color:0xffffff});
const plane = new THREE.Mesh(planeGeometry,planeMaterial);

// 平面设置位置
plane.rotation.x = -0.5 * Math.PI;
plane.position.x = 15;
plane.position.y = 0;
plane.position.z = 0;

// 添加到场影中
scene.add(plane);

// 创建几何体
let cubeGeometry = new THREE.BoxGeometry(4,4,4);
let cubeMaterial = new THREE.MeshLambertMaterial({color:0xff0000});
let cube = new THREE.Mesh(cubeGeometry,cubeMaterial);

// 设置几何体位置
cube.position.x = -4;
cube.position.y = 3;
cube.position.z = 0;

// 添加到场影中
scene.add(cube);

// 设置圆柱体
let sphereGeometry = new THREE.SphereGeometry(4,20,20);
let sphereMaterial = new THREE.MeshLambertMaterial({color:0x7777ff});
let sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);

sphere.position.x = 20;
sphere.position.y = 0;
sphere.position.z = 2;

// 添加到场景中
scene.add(sphere);

// 设置相机的位置
camera.position.x = -30;
camera.position.y = 40;
camera.position.z = 30;
camera.lookAt(scene.position);

// 添加平行光
let ambientLight = new THREE.AmbientLight(0x0c0c0c);
scene.add(ambientLight);

// 添加占光源
let spotLight = new THREE.PointLight(0xffffff);
spotLight.position.set(-40,60,-10);
scene.add(spotLight);

let step = 0;

let controls = new function() {
    this.exportScene = function() {
        let exporter = new THREE.SceneExporter();
        let sceneJson = JSON.stringify(exporter.parse(scene));
        localStorage.setItem('scene',sceneJson);
    }

    this.clearScene = function() {
        scene = new THREE.Scene();

    }
}

let gui = new dat.GUI();
gui.add(controls,'exportScene');



document.body.append(renderer.domElement);

function render() {
    requestAnimationFrame(render);
    renderer.render(scene,camera);
}

render();

