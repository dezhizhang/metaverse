/*
 * :file description: 
 * :name: /threejs/examples/数据生成三角面.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-05-25 17:42:14
 * :last editor: 张德志
 * :date last edited: 2024-05-25 17:42:15
 */
import * as THREE from 'three';
import Delaunator from 'delaunator';
import { pointInPolygon } from './pointInPolygon';
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

const lineArr = [];

polygonData.forEach(function (elem) {
  lineArr.push(elem[0], elem[1], 0);
});

const polygonArr = gridPoint(polygonData);

polygonArr.forEach(function (elem) {
  pointArr.push(elem[0], elem[1], 0);
});

const indexArr = Delaunator.from(polygonArr).triangles;

const usefulIndexArr = [];

for (let i = 0; i < indexArr.length; i += 3) {
  const p1 = polygonArr[indexArr[i]];
  const p2 = polygonArr[indexArr[i + 1]];
  const p3 = polygonArr[indexArr[i + 2]];
  

  const gravity = [(p1[0] + p2[0] + p3[0]) / 3, (p1[1] + p2[1] + p3[1]) / 3];

  if (pointInPolygon(gravity, polygonData)) {
    usefulIndexArr.push(indexArr[i + 2], indexArr[i + 1], indexArr[i]);
  }
}

console.log('usefulIndexArr', usefulIndexArr);

const geometry = new THREE.BufferGeometry();
geometry.index = new THREE.BufferAttribute(new Uint16Array(usefulIndexArr), 1);
geometry.attributes.position = new THREE.BufferAttribute(new Float32Array(pointArr), 3);

const material = new THREE.MeshBasicMaterial({
  color: 0x004444,
  side: THREE.DoubleSide,
});

const mesh = new THREE.Mesh(geometry, material);
mesh.position.z = -0.01;
scene.add(mesh);

scene.add(polygon(lineArr));

function polygon(pointArr) {
  var geometry = new THREE.BufferGeometry(); //创建一个Buffer类型几何体对象
  //类型数组创建顶点数据
  var vertices = new Float32Array(pointArr);
  // 创建属性缓冲区对象
  var attribue = new THREE.BufferAttribute(vertices, 3); //3个为一组，表示一个顶点的xyz坐标
  // 设置几何体attributes属性的位置属性
  geometry.attributes.position = attribue;
  // 线条渲染几何体顶点数据
  var material = new THREE.LineBasicMaterial({
    color: 0x00ffff, //线条颜色
  }); //材质对象
  var line = new THREE.LineLoop(geometry, material); //首尾顶点连线，轮廓闭合
  var group = new THREE.Group();
  group.add(line);
  return group;
}

// 生成点阵

function gridPoint(polygon) {
  const lonArr = [];
  const latArr = [];
  polygon.forEach((elem) => {
    lonArr.push(elem[0]);
    latArr.push(elem[1]);
  });

  const [lonMin, lonMax] = minMax(lonArr);
  const [latMin, latMax] = minMax(latArr);

  const step = 2;
  const cloumn = Math.ceil((lonMax - lonMin) / step);
  const row = Math.ceil((latMax - latMin) / step);

  const rectPointsArr = [];
  for (let i = 0; i < cloumn + 1; i++) {
    for (let j = 0; j < row + 1; j++) {
      rectPointsArr.push([lonMin + i + step, latMin + j * step]);
    }
  }

  const polygonPointsArr = [];
  rectPointsArr.forEach((coord) => {
    if (pointInPolygon(coord, polygon)) {
      polygonPointsArr.push(coord);
    }
  });

  return [...polygon, ...polygonPointsArr];
}

//   经纬度坐标进行排序
function minMax(arr) {
  // 数组元素排序
  arr.sort(compareNum);
  // 通过向两侧取整，把经纬度的方位稍微扩大
  return [Math.floor(arr[0]), Math.ceil(arr[arr.length - 1])];
}
// 数组排序规则
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
