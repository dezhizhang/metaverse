/*
 * :file description: 
 * :name: /threejs/examples/多边形轮廓渲染.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-07 20:33:12
 * :last editor: 张德志
 * :date last edited: 2024-04-07 20:33:19
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import polygonData from './polygonData';

//创建场影
const scene = new THREE.Scene();

//创建相机
const width = window.innerWidth;
const height = window.innerHeight;

const k = width / height;
const s = 10;



const camera = new THREE.OrthographicCamera(-s * k,s * k,s,-s,1,1000);
camera.position.set(103,45,200);
camera.lookAt(103,45,0);

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

const pointArr = [];
polygonData.forEach(function (elem) {
  pointArr.push(elem[0], elem[1], 0);
});

scene.add(polygon(pointArr));

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

// 初始化渲染器
const renderer = new THREE.WebGLRenderer();
// 设置渲染器大小
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.append(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(103,45,0);
controls.update();


function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
