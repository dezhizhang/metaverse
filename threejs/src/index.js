/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-12 07:44:44
 * :last editor: 张德志
 * :date last edited: 2022-11-13 13:30:53
 */
import * as THREE from 'three';

import soil_normal from './starry-deep-outer-space-galaxy.jpg';
import * as dat from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

//创建gui
const gui = new dat.GUI();

// 创建场影
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(0,0,10);
scene.add(camera);

// 加载财质
const textureLoader = new THREE.TextureLoader();
const map = textureLoader.load(soil_normal);


const cubeGeometry = new THREE.BoxGeometry(1,1,1);
const cubeMaterial = new THREE.MeshStandardMaterial({
    color:'#ffff00',
    map,
    opacity:1,
    transparent:true
});

const mesh = new THREE.Mesh(cubeGeometry,cubeMaterial);
scene.add(mesh);

// 添加灯光
const litht = new THREE.AmbientLight(0xffffff);
scene.add(litht);

// 设置平行光
const directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(10,10,10);
scene.add(directionalLight);


// 创建渲染器
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth,window.innerHeight);

document.body.appendChild(renderer.domElement);

// 创建控制器
const controls = new OrbitControls(camera,renderer.domElement);

// 创建坐标系
const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);

function render() {
    renderer.render(scene,camera);
    requestAnimationFrame(render);
}

render();





