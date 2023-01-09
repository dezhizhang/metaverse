/*
 * :file description:
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2022-07-12 07:44:44
 * :last editor: 张德志
 * :date last edited: 2023-01-10 07:46:52
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
/**需要添加标签的立方体*/

const box = new THREE.BoxGeometry(30,30,30);
const material = new THREE.MeshLambertMaterial({
  color:0x0000ff
});
const boxMesh = new THREE.Mesh(box,material);
boxMesh.position.set(80,0,0);
scene.add(boxMesh);

const axesHelper = new THREE.AxesHelper(300);
scene.add(axesHelper);

const point = new THREE.PointLight(0xffffff);
point.position.set(400,200,300);
scene.add(point);

const ambient = new THREE.AmbientLight(0xffffff,0.4);
scene.add(ambient);

var width = window.innerWidth; //窗口宽度
var height = window.innerHeight; //窗口高度
var k = width / height; //窗口宽高比
var s = 150; //三维场景显示范围控制系数，系数越大，显示的范围越大
//创建相机对象
var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
camera.position.set(200, 300, 200); //设置相机位置
camera.lookAt(scene.position); //设置相机方向(指向的场景对象)

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width,height);
renderer.setClearColor(0x888888,1);

document.body.appendChild(renderer.domElement);

function render() {
  renderer.render(scene,camera);
  requestAnimationFrame(render)
}

render();

// /**
//  * 立方体世界坐标转屏幕坐标
//  */
//创建一个三维向量作为世界坐标
var worldVector = new THREE.Vector3();
// 获取网格模型boxMesh的世界坐标，赋值给worldVector
boxMesh.getWorldPosition(worldVector);

// 网格模型在threejs三维空间的世界坐标
var worldVector = boxMesh.position.clone();
//世界坐标转标准设备坐标，standardVector是WebGL标准设备坐标
// .project()方法提取相机参数的视图矩阵、投影矩阵对世界坐标进行变换
var standardVector = worldVector.project(camera);

// 根据WebGL标准设备坐标standardVector计算div标签在浏览器页面的屏幕坐标
// 标准设备坐标转屏幕坐标
var a = window.innerWidth / 2;
var b = window.innerHeight / 2;
var x = Math.round(standardVector.x * a + a); //模型标签x坐标，单位像素
var y = Math.round(-standardVector.y * b + b); //模型标签y坐标，单位像素

/**
 * 创建div元素(作为立方体标签)
 */
var div = document.createElement('div');
div.innerHTML = '立方体';
div.style.padding = '10px';
div.style.color = '#fff';
div.style.position = 'absolute';
div.style.backgroundColor = 'rgba(25,25,25,0.5)';
div.style.borderRadius = '5px'
document.body.appendChild(div);

/**
 * 设置标签元素的位置
 */
div.style.left = x + 'px';
//这里的130px主要是为了标签和模型有一定偏移，当然也可以不设置，两者叠加在一起
div.style.top = y - 130 + 'px';

new OrbitControls(camera,render.domElement);
