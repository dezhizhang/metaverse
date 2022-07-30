/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-12 07:44:44
 * :last editor: 张德志
 * :date last edited: 2022-07-30 11:54:19
 */
// import * as dat from 'dat.gui';
// const gui = new dat.GUI();

// const controllObj = {
//     rotationObj:0,
// }

// gui.add(controllObj,'rotationObj',1)
// console.log('gui',gui);
import * as THREE from 'three';
import * as dat from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; 



const gui = new dat.GUI();

// 创建场影
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.x = 0;
camera.position.y = 20;
camera.position.z = 30;
camera.lookAt(scene.position);
scene.add(camera);


// 创建渲染器
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor({ color: 0x00cc00 });

const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const mesh = new THREE.Mesh(cubeGeometry,cubeMaterial);
scene.add(mesh);

// 创建一个平面


//创建控制器
const controls = new OrbitControls(camera,renderer.domElement);

const axes = new THREE.AxesHelper(50);
scene.add(axes);

// 创建点光源
const light = new THREE.PointLight(0xfffff,3,160);
light.position.set(0,0,5);

scene.add(light);



document.body.append(renderer.domElement);


function render() {
    requestAnimationFrame(render);
    renderer.render(scene,camera);
}

render();






