/*
 * :file description: 
 * :name: /threejs/examples/经纬度生成点阵.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-07 21:45:07
 * :last editor: 张德志
 * :date last edited: 2024-04-07 21:45:08
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import polygonData from './polygonData';

//创建场影
const scene = new THREE.Scene();

const width = window.innerWidth;
const height = window.innerHeight;

const k = width / height;
const s = 10;

const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
camera.position.set(103, 45, 200);
camera.lookAt(103, 45, 0);

const axesHelper = new THREE.AxesHelper(100);

const pointArr = [];
polygonData.forEach(function (elem) {
  pointArr.push(elem[0], elem[1], 0);
});

const polygonMesh = polygon(pointArr);
polygonMesh.add(axesHelper);
scene.add(polygonMesh);

function polygon(pointArr) {
  const geometry = new THREE.BufferGeometry();
  const vertices = new Float32Array(pointArr);
  const attribute = new THREE.BufferAttribute(vertices, 3);
  geometry.attributes.position = attribute;

  const material = new THREE.LineBasicMaterial({
    color: 0x006666,
  });
  const line = new THREE.LineLoop(geometry, material);

  const pointMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 3,
  });
  const points = new THREE.Points(geometry, pointMaterial);

  const group = new THREE.Group();
  group.add(line);
  group.add(points);

  return group;
}

gridPoint(polygonData);

function gridPoint(polygon) {
  const lonArr = [];
  const latArr = [];

  polygon.forEach((elem) => {
    lonArr.push(elem[0]);
    latArr.push(elem[1]);
  });

  const [lonMin, lonMax] = minMax(lonArr);
  const [latMin, latMax] = minMax(latArr);

  const step = 1;
  const row = Math.ceil((lonMax - lonMin) / step);
  const column = Math.ceil((latMax - latMin) / step);

  const rectPointsArr = [];
  for (let i = 0; i < row + 1; i++) {
    for (let j = 0; j < column + 1; j++) {
      rectPointsArr.push([lonMin + i * step, latMin + j * step]);
    }
  }

  const pointArr = [];
  rectPointsArr.forEach((elem) => {
    pointArr.push(elem[0],elem[1],0);
  });

  const geometry = new THREE.BufferGeometry();
  geometry.attributes.position = new THREE.BufferAttribute(new Float32Array(pointArr),3);

  const material = new THREE.PointsMaterial({
    color:0xff0000,
    size:3
  });
  const points = new THREE.Points(geometry,material);
  scene.add(points);

}

function minMax(arr) {
  arr.sort(compareNum);
  return [Math.floor(arr[0]),Math.ceil(arr[arr.length - 1])]
}

function compareNum(num1, num2) {
  if (num1 < num2) {
    return -1;
  } else if (num1 > num2) {
    return 1;
  } else {
    return 0;
  }
}

// 初始化渲染器
const renderer = new THREE.WebGLRenderer();
// 设置渲染器大小
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.append(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(103, 45, 0);
controls.update();

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
