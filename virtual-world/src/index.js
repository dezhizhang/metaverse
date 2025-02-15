/*
 * :file description:
 * :name: /virtual-world/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-26 06:15:04
 * :last editor: 张德志
 * :date last edited: 2025-02-16 05:35:06
 */
import * as THREE from "three";
import pointInPolygon from 'point-in-polygon';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import polygon from "/public/polygon.json";
import { lon2xyz, minMax } from "./utils";

const scene = new THREE.Scene();

const width = window.innerWidth;
const height = window.innerHeight;
const s = 10;
const k = width / height;

const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
camera.position.set(103, 45, 200);
camera.lookAt(103, 45, 0);



const pointArr = [];

polygon.forEach(function (elem) {
  pointArr.push(elem[0], elem[1], 0);
});

scene.add(createPolygon(pointArr));


function createPolygon(pointArr) {
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
  group.add(line, points);
  return group;
}

createPoints();

function createPoints() {
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
  const colum = Math.ceil((latMax - latMin) / step);

  const rectPointArr = [];
  for (let i = 0; i < row + 1; i++) {
    for (let j = 0; j < colum + 1; j++) {
      rectPointArr.push([lonMin + i * step, latMin + j * step]);
    }
  }
  
  const pointPolygon = [];
  // 判断点阵是否在点内
  rectPointArr.forEach((coord) => {
    if(pointInPolygon(coord,polygon)) {
      pointPolygon.push(coord);
    }
  });

  const pointsArr = [];
  pointPolygon.forEach((elem) => {
    pointsArr.push(elem[0], elem[1], 0);
  });


  const geometry = new THREE.BufferGeometry();
  geometry.attributes.position = new THREE.BufferAttribute(
    new Float32Array(pointsArr),3
  );

  const material = new THREE.PointsMaterial({
    color: 0x00ff00,
    size: 3,
  });

  const points = new THREE.Points(geometry, material);
  scene.add(points);
}

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const axesHelper = new THREE.AxesHelper(1000);
scene.add(axesHelper);

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
