/*
 * :file description: 
 * :name: /threejs/examples/提取线段某一部分.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-04 22:45:43
 * :last editor: 张德志
 * :date last edited: 2024-04-04 22:45:44
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

//创建场影
const scene = new THREE.Scene();

//创建相机
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(200,200,200);
camera.lookAt(scene.position);

var geometry = new THREE.BufferGeometry(); //创建一个缓冲类型几何体
// 三维样条曲线
var curve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(100, 0, -100),
  new THREE.Vector3(0, 80, 0),
  new THREE.Vector3(-100, 0, 100),
]);
//曲线上等间距返回多个顶点坐标
var points = curve.getSpacedPoints(100); //分段数100，返回101个顶点
// setFromPoints方法从points中提取数据赋值给attributes.position
geometry.setFromPoints(points);
var material = new THREE.LineBasicMaterial({
  color: 0x006666, //轨迹颜色
});
//线条模型对象
var line = new THREE.Line(geometry, material);
scene.add(line);


const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);



var index = 20; //取点索引位置
var num = 10; //从曲线上获取点数量
var points2 = points.slice(index, index + num); //从曲线上获取一段
var geometry2 = new THREE.BufferGeometry();
geometry2.setFromPoints(points2);
var material2 = new THREE.LineBasicMaterial({
    color: 0xffff00, //轨迹颜色
});

var line2 = new THREE.Line(geometry2, material2);
scene.add(line2);


// 初始化渲染器
const renderer = new THREE.WebGL1Renderer();

// 设置渲染器大小
renderer.setSize(window.innerWidth,window.innerHeight);


const controls = new OrbitControls(camera,renderer.domElement);

document.body.append(renderer.domElement);


function render() {
  requestAnimationFrame(render);
  renderer.render(scene,camera);
}

render();




