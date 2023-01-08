/*
 * :file description:
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2022-07-12 07:44:44
 * :last editor: 张德志
 * :date last edited: 2023-01-09 05:29:05
 */
import * as THREE from 'three';

const scene = new THREE.Scene();

const geometry1 = new THREE.BoxGeometry(100,100,100);
const material1 = new THREE.MeshLambertMaterial({
  color: 0xff00ff,
});
const mesh1 = new THREE.Mesh(geometry1,material1);
scene.add(mesh1);

const geometry2 = new THREE.SphereGeometry(60,40,40);
const material2 = new THREE.MeshLambertMaterial({
  color: 0xff00ff,
});
const mesh2 = new THREE.Mesh(geometry2,material2);
mesh2.position.set(0,230,0);
scene.add(mesh2);

const geometry3 = new THREE.CylinderGeometry(50,50,100,25);
const material3 = new THREE.MeshLambertMaterial({
  color:0xffff00
});
const mesh3 = new THREE.Mesh(geometry3,material3);
mesh3.position.set(120,0,0);
scene.add(mesh3);

const axesHelper = new THREE.AxesHelper(250);
scene.add(axesHelper);

// 设置点光源
const  point = new THREE.PointLight(0xffffff);
point.position.set(400,200,300);
scene.add(point);

// 环境光
const ambient = new THREE.AmbientLight(0x444444);
scene.add(ambient);

var width = window.innerWidth; //窗口宽度
var height = window.innerHeight; //窗口高度
var k = width / height; //窗口宽高比
var s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
//创建相机对象
var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
camera.position.set(200, 300, 200); //设置相机位置
camera.lookAt(0, 0, 0); //指向坐标原点

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width,height);
renderer.setClearColor(0xb9d3ff,1);
document.body.appendChild(renderer.domElement);
renderer.render(scene,camera);
