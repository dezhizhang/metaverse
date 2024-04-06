/*
 * :file description: 
 * :name: /threejs/examples/背景透明贴图.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-06 18:55:22
 * :last editor: 张德志
 * :date last edited: 2024-04-06 18:55:23
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//创建场影
const scene = new THREE.Scene();

//创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// 设置相机位置
camera.position.set(200, 200, 200);

const geometry = new THREE.PlaneGeometry(60, 60);
const textureLoader = new THREE.TextureLoader();
const material = new THREE.MeshBasicMaterial({
  map: textureLoader.load('/贴图.png'),
  transparent: true,
  side:THREE.DoubleSide,
});

const mesh = new THREE.Mesh(geometry, material);
mesh.rotateX(-Math.PI / 2);
scene.add(mesh);

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

const gridHelper = new THREE.GridHelper(300,25,0x004444,0x004444);
gridHelper.position.y = -0.5;
scene.add(gridHelper);


// 初始化渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, renderer.domElement);

document.body.append(renderer.domElement);

function render() {
  requestAnimationFrame(render);
  renderer.render(scene,camera);
}

render();

