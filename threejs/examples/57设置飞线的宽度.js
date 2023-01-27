 // 现在浏览器支持ES6语法，自然包括import方式引入js文件
 import * as THREE from 'three';
 // 引入Three.js扩展库
 import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
 // 引入线宽设置相关库
 import { LineSegmentsGeometry } from 'three/examples/jsm/lines/LineSegmentsGeometry.js';
 import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js';
 import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
 import { LineSegments2 } from 'three/examples/jsm/lines/LineSegments2.js';
 import { Line2 } from 'three/examples/jsm/lines/Line2.js';

 // 创建场影
 const scene = new THREE.Scene();
 // 创建线条模型
 const geometry = new THREE.BufferGeometry();

 // 三维样条曲线
 const curve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(100, 0, -100),
  new THREE.Vector3(0, 80, 0),
  new THREE.Vector3(-100, 0, 100),
 ]);
 const points = curve.getSpacedPoints(100);
 geometry.setFromPoints(points);
 const material = new THREE.LineBasicMaterial({
  color:0x006666
 });
const line = new THREE.Line(geometry,material);
scene.add(line);

const index = 20; //取点索引位置
const num = 10;//从曲线上获取点数量
const points2 = points.slice(index,index + num); //从曲线上获取一段

const pointArr = []
const geometry2 = new LineGeometry();
points2.forEach((v3) => {
  pointArr.push(v3.x,v3.y,v3.z)
});
geometry2.setPositions(pointArr);
const material2 = new LineMaterial({
  color: 0xffff00, //设置线条颜色值
  linewidth: 3.0, // 设置线宽
});
//材质输入Three.js渲染canvas画布的宽高度
material2.resolution.set(window.innerWidth,window.innerHeight);

//Line2模型对象
const line2 = new Line2(geometry2,material2);
scene.add(line2);

const axesHelper = new THREE.AxesHelper(300);
scene.add(axesHelper);

const gridHelper = new THREE.GridHelper(300,25);
scene.add(gridHelper);

var width = window.innerWidth; //窗口宽度
var height = window.innerHeight; //窗口高度
var k = width / height; //窗口宽高比
var s = 150; //三维场景显示范围控制系数，系数越大，显示的范围越大
//创建相机对象
var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
camera.position.set(200, 300, 200); //设置相机位置
// camera.position.set(0, 0, 200); //设置相机位置
camera.lookAt(scene.position); //设置相机方向(指向的场景对象)

// 创建渲染器对象
const renderer = new THREE.WebGLRenderer({
  antialias:true
});
renderer.setSize(width,height);
document.body.appendChild(renderer.domElement);

function render() {
  renderer.render(scene,camera);
  requestAnimationFrame(render);
}
render();

const controls = new OrbitControls(camera,renderer.domElement);
