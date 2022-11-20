/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-12 07:44:44
 * :last editor: 张德志
 * :date last edited: 2022-11-20 14:32:39
 */
import * as THREE from 'three';
import * as dat from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import vertex from './shader/vertex.glsl';
import fragment from './shader/fragment.glsl';
//创建gui
const gui = new dat.GUI();

const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(0,0,10);
scene.add(camera);


// 创建平面
const planceGeometry = new THREE.PlaneGeometry(1,1,64,64);
const planceMaterial = new THREE.ShaderMaterial({
    vertexShader:vertex,
    fragmentShader:fragment
});

const plane = new THREE.Mesh(planceGeometry,planceMaterial);
scene.add(plane);

// 添加灯光
const litht = new THREE.AmbientLight(0xffffff,0.5);
scene.add(litht);

// 设置平行光
const directionalLight = new THREE.DirectionalLight(0xffffff,0.5);
directionalLight.position.set(10,10,10);
directionalLight.castShadow = true;
scene.add(directionalLight);

// 创建渲染器
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth,window.innerHeight);

const controls = new OrbitControls(camera,renderer.domElement);

document.body.appendChild(renderer.domElement);

// 创建坐标系
const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);

function render() {
    renderer.render(scene,camera);
    requestAnimationFrame(render);
}

render();






