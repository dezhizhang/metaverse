/*
 * :file description:
 * :name: /threejs/examples/FontLoader.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-12 07:28:23
 * :last editor: 张德志
 * :date last edited: 2024-04-12 09:40:58
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';

//创建场影
const scene = new THREE.Scene();
//创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// 设置相机位置
camera.position.set(2, -5, 169);

camera.lookAt(scene.position);

const dracoLoader = new DRACOLoader();
const gltfLoader = new GLTFLoader();
dracoLoader.setDecoderPath('/draco/');
gltfLoader.setDRACOLoader(dracoLoader);

gltfLoader.load('/手机.gltf', (gltf) => {
  scene.add(gltf.scene);
});

const R = 60;
const geometry = new THREE.BufferGeometry();
const arc = new THREE.ArcCurve(0, 0, R, Math.PI / 2 + Math.PI / 6, Math.PI / 2 - Math.PI / 6);
const points = arc.getPoints(50);
geometry.setFromPoints(points);

const material = new THREE.LineBasicMaterial({
  color: 0xffffff,
});
const line = new THREE.Line(geometry, material);
line.rotateX(-Math.PI / 2);
line.position.y = -85;
scene.add(line);


const directionLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionLight.position.set(0, 50, 100);
scene.add(directionLight);

const directionLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
directionLight2.position.set(0, 50, -100);
scene.add(directionLight2);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

// 初始化渲染器
const renderer = new THREE.WebGLRenderer();

// 设置渲染器大小
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.append(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 200;
controls.maxDistance = 600;

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
});

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
