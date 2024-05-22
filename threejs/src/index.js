/*
 * :file description:
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-05-22 22:36:48
 * :last editor: 张德志
 * :date last edited: 2024-05-23 07:22:20
 */

import * as THREE from 'three';
import data from './polygonData';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//创建场影
const scene = new THREE.Scene();

//创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// 设置相机位置
camera.position.set(103, 45, 200);
camera.lookAt(103, 45, 0);

const pointArr = [];

data.forEach((elem) => {
  pointArr.push(elem[0], elem[1], 0);
});
scene.add(polygon(pointArr));
scene.add(pointPolygon(data));

function polygon(pointArr) {
  const group = new THREE.Group();

  const geometry = new THREE.BufferGeometry();
  const vertices = new Float32Array(pointArr);

  const attribute = new THREE.BufferAttribute(vertices, 3);
  geometry.attributes.position = attribute;

  const material = new THREE.MeshBasicMaterial({
    color: 0x006666,
  });
  const line = new THREE.LineLoop(geometry, material);

  const pointMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.3,
  });

  const points = new THREE.Points(geometry, pointMaterial);

  group.add(line, points);

  return group;
}


function pointPolygon(polygon) {
  const lonArr = [];
  const latArr = [];

  polygon.forEach((elem) => {
    lonArr.push(elem[0]);
    latArr.push(elem[1]);
  });

  const [lonMin,lonMax] = minMax(lonArr);
  const [latMin,latMax] = minMax(latArr);


  const step = 1;
  const row = Math.ceil((lonMax - lonMin) / step);
  const column = Math.ceil((latMax - latMin) / step);



  const rectPontsArr = [];
  for(let i=0;i < row + 1;i++) {
    for(let j=0;j < column + 1;j++) {
      rectPontsArr.push([lonMin + i * step,latMax + j * step]);
    }
  }

  const pointArr = [];
  rectPontsArr.forEach((elem) => {
    pointArr.push(elem[0],elem[1],0);
  });

  const geometry = new THREE.BufferGeometry();
  const attributes = new Float32Array(pointArr);
  geometry.attributes.position = new THREE.BufferAttribute(attributes,3)


  const material = new THREE.PointsMaterial({
    color:0xff0000,
    size:0.1
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

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(103, 45, 0);
controls.update();

document.body.append(renderer.domElement);

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
