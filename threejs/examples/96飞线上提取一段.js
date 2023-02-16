/*
 * :file description:
 * :name: /threejs/examples/96飞线上提取一段.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2022-07-12 07:44:44
 * :last editor: 张德志
 * :date last edited: 2023-02-16 06:44:21
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

// 创建线条模型
const geometry = new THREE.BufferGeometry();
const curve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(100, 0, -100),
  new THREE.Vector3(0, 80, 0),
  new THREE.Vector3(-100, 0, 100),
]);

const points = curve.getSpacedPoints(100);
geometry.setFromPoints(points);
const material = new THREE.LineBasicMaterial({
  color: 0x006666, //轨迹颜色
});

// 线条模型对像
const line = new THREE.Line(geometry, material);
scene.add(line);

const index = 20;
const num = 10;

const points2 = points.slice(index, index + num);
const geometry2 = new THREE.BufferGeometry();
geometry2.setFromPoints(points2);
const material2 = new THREE.LineBasicMaterial({
  color: 0xffff00, //轨迹颜色
});
const line2 = new THREE.Line(geometry2, material2);
scene.add(line2);

const axesHelper = new THREE.AxesHelper(300);
scene.add(axesHelper);
const gridHelper = new THREE.GridHelper(300, 25);
scene.add(gridHelper);

const width = window.innerWidth;
const height = window.innerHeight;
const k = width / height;
const s = 150;

const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
camera.position.set(200, 300, 200); //设置相机位置
camera.lookAt(scene.position);

// 创建渲染器对象
const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

function render() {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();

const controls = new OrbitControls(camera, renderer.domElement);
