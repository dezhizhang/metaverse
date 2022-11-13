/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-12 07:44:44
 * :last editor: 张德志
 * :date last edited: 2022-11-13 09:48:39
 */
import * as THREE from 'three';
import gsap from "gsap";
import soil_normal from './soil_normal.jpg';
import * as dat from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// 创建gui
const gui = new dat.GUI();

// 创建场影
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(0,0,10);
scene.add(camera);


const textureLoader = new THREE.TextureLoader();
const cat = textureLoader.load(soil_normal);
console.log(cat);

const cubeGeometry = new THREE.BoxGeometry(1,1,1);
const cubeMaterial = new THREE.MeshBasicMaterial({
    color:'#ffff00',
    map:cat
});

const cube = new THREE.Mesh(cubeGeometry,cubeMaterial);
scene.add(cube);

// 创建渲染器 
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth,window.innerHeight);

document.body.appendChild(renderer.domElement);

// 创建控制器
const controls = new OrbitControls(camera,renderer.domElement);

// 创建坐标系
const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);

const clock = new THREE.Clock();


function render() {
    renderer.render(scene,camera);
    requestAnimationFrame(render);
}

render();


window.addEventListener('resize',() => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateWorldMatrix();

    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
})
