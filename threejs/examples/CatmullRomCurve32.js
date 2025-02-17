/*
 * :file description:
 * :name: /threejs/examples/CatmullRomCurve32.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2024-04-04 21:45:30
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//创建场影
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(200,200,200);
camera.lookAt(scene.position);

const geometry = new THREE.BufferGeometry();
const curve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(100,0,-100),
  new THREE.Vector3(0,80,0),
  new THREE.Vector3(-100,0,100),
]);

const points = curve.getSpacedPoints(100);
geometry.setFromPoints(points);

const material = new THREE.LineBasicMaterial({
  color:0x00ffff
});
const line = new THREE.Line(geometry,material);
scene.add(line);

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);





const gridHelper = new THREE.GridHelper(300, 25);
scene.add(gridHelper);

// 初始化渲染器
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera,renderer.domElement);


document.body.append(renderer.domElement);


function render() {
  requestAnimationFrame(render);
  renderer.render(scene,camera);
}

render();

