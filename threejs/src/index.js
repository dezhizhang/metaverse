/*
 * :file description:
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-12 07:02:27
 * :last editor: 张德志
 * :date last edited: 2024-04-13 10:32:48
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';

let rotate = {
  bool: true,
};

//创建场影
const scene = new THREE.Scene();
//创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// 设置相机位置
camera.position.set(-28, -30, -205);

camera.lookAt(scene.position);

const dracoLoader = new DRACOLoader();
const gltfLoader = new GLTFLoader();
dracoLoader.setDecoderPath('/draco/');
gltfLoader.setDRACOLoader(dracoLoader);

const model = new THREE.Group();

gltfLoader.load('/手机.gltf', (gltf) => {
  model.add(gltf.scene);
});
scene.add(model);

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

const loader = new FontLoader();
loader.load('https://threejs.org/examples/fonts/helvetiker_bold.typeface.json', (font) => {
  const material = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
  });
  const shapes = font.generateShapes('abbc', 10);
  const geometry = new THREE.ShapeGeometry(shapes);
  const text = new THREE.Mesh(geometry, material);

  text.position.z = -R;
  text.position.x = -12;
  text.position.y = -85;

  scene.add(text);
});

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

const div = document.getElementById('rotate');
const img = document.getElementById('img');

div.addEventListener('click', () => {
  if (rotate.bool) {
    img.src = '/停止旋转.png';
  } else {
    img.src = '旋转.png';
  }
  rotate.bool = !rotate.bool;
});

function render() {
  if (rotate.bool) {
    model.rotateY(0.01);
  }
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
