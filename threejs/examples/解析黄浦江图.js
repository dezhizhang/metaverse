/*
 * :file description: 
 * :name: /threejs/examples/解析黄浦江图.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-06 22:12:21
 * :last editor: 张德志
 * :date last edited: 2024-04-06 22:12:22
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//创建场影
const scene = new THREE.Scene();

//创建相机
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.001, 5000);

const x = 121.49131393432617
const y = 31.232206344604492

// 设置相机位置
camera.position.set(x + 0.02, y + 0.02, 0.02);
camera.lookAt(x, x, 0);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const loader = new THREE.FileLoader();
loader.setResponseType('json');
loader.load('https://tugua.oss-cn-hangzhou.aliyuncs.com/model/huangpu-river.json', (data) => {
  const riverGroup = new THREE.Group();
  data.features.forEach((river) => {
    riverGroup.add(shapeMesh(river.geometry.coordinates));
  });
  centerAll(riverGroup);

  scene.add(riverGroup);
});

function centerAll(group) {
  const box3 = new THREE.Box3();
  box3.expandByObject(group);
  const size = new THREE.Vector3();
  box3.getSize(size);

  const center = new THREE.Vector3();
  box3.getCenter(center);

  console.log({ center, size });
}

function shapeMesh(pointsArr) {
  const vector2Arr = [];
  pointsArr[0].forEach((elem) => {
    vector2Arr.push(new THREE.Vector2(elem[0], elem[1]));
  });

  const shape = new THREE.Shape(vector2Arr);
  const geometry = new THREE.ShapeGeometry(shape);

  const material = new THREE.MeshLambertMaterial({
    color: 0xff00ff,
  });
  return new THREE.Mesh(geometry, material);
}

// 初始化渲染器
const renderer = new THREE.WebGLRenderer();

// 设置渲染器大小
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.append(renderer.domElement);

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

const control = new OrbitControls(camera, renderer.domElement);
control.target.set(x,y,0);
control.update();

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
