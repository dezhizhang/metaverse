/*
 * :file description: 
 * :name: /threejs/examples/catmullRomCurve31.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-06 19:55:25
 * :last editor: 张德志
 * :date last edited: 2024-03-06 19:55:26
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//创建场影
const scene = new THREE.Scene();

//创建相机
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,200);

// 设置相机位置
camera.position.set(0,0,10);
scene.add(camera);

const curve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(-10,0,10),
  new THREE.Vector3(-5,5,5),
  new THREE.Vector3(0,0,0),
  new THREE.Vector3(5,-5,5),
  new THREE.Vector3(10,0,10),
]);

const points = curve.getPoints(50);
const geometry = new THREE.BufferGeometry().setFromPoints(points);
const material = new THREE.LineBasicMaterial({color:0xff0000});
const curveObject = new THREE.Line(geometry,material);
scene.add(curveObject);


// 初始化渲染器
const renderer = new THREE.WebGL1Renderer();

const controls = new OrbitControls(camera,renderer.domElement);



// 设置渲染器大小
renderer.setSize(window.innerWidth,window.innerHeight);

document.body.append(renderer.domElement);

function render() {
  requestAnimationFrame(render)
  renderer.render(scene,camera);
}
render();




