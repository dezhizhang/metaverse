/*
 * :file description:
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-07 20:33:12
 * :last editor: 张德志
 * :date last edited: 2024-05-25 15:51:11
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import polygonData from './polygonData';

//创建场影
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(103, 45, 100);
camera.lookAt(103, 45, 0);

const axesHelper = new THREE.AxesHelper(100);
// axesHelper.target.set(103,45,0)
scene.add(axesHelper);

const pointArr = [];
polygonData.forEach(function (elem) {
  pointArr.push(elem[0], elem[1], 0);
});

scene.add(polygon(pointArr));
scene.add(gridPoint(polygonData));

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
    size: 0.3,
  });
  const points = new THREE.Points(geometry, pointMaterial);

  const group = new THREE.Group();
  group.add(line);
  group.add(points);

  return group;
}

// 生成点阵
function gridPoint(polygon) {
  let lonArr = [];
  let latArr = [];

  polygon.forEach((elem) => {
    lonArr.push(elem[0]);
    latArr.push(elem[1]);
  });

  const [lonMin, lonMax] = minMax(lonArr);
  const [latMin, latMax] = minMax(latArr);

  const step = 1;

  const colum = Math.ceil((lonMax - lonMin) / step);
  const row = Math.ceil((latMax - latMin) / step);

  const rectPointsArr = [];

  for(let i=0;i < colum + 1;i++) {
	for(let j=0;j < row + 1;j++) {
		rectPointsArr.push([lonMin + i * step,latMin + j * step]);
	}
  }

  const pointArr = [];
  rectPointsArr.forEach((elem) => {
	pointArr.push(elem[0],elem[1],0);
  });

  const geometry = new THREE.BufferGeometry();
  const attributes = new Float32Array(pointArr);
  geometry.attributes.position = new THREE.BufferAttribute(attributes,3);
  const material = new THREE.PointsMaterial({
	color:0xff0000,
	size:0.3
  });
  const points = new THREE.Points(geometry,material);
  return points;

}

function minMax(arr) {
  arr.sort(compareNum);
  return [Math.floor(arr[0]), Math.ceil(arr[arr.length - 1])];
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
