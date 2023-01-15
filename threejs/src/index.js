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
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const width = window.innerWidth;
const height = window.innerHeight;

let model = new THREE.Group();

const shape = new THREE.Shape([
  new THREE.Vector2(0, 0),
  new THREE.Vector2(60, 0),
  new THREE.Vector2(60, 80),
  new THREE.Vector2(40, 120),
  new THREE.Vector2(-20, 80),
]);

/**
 * 创建场景对象Scene
 */
var scene = new THREE.Scene();
scene.add(model); //三维模型添加到场景中
/**
 * 光源设置
 */
// 平行光1
var directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(200, 400, 300);
scene.add(directionalLight);
// 平行光2
var directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight2.position.set(-200, -400, 300);
scene.add(directionalLight2);
//环境光
var ambient = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambient);

function ShapeMesh(pointsArr) {
  var vector2Arr = [];
  // 转化为Vector2构成的顶点数组
  pointsArr[0].forEach(elem => {
    vector2Arr.push(new THREE.Vector2(elem[0], elem[1]))
  });
  var shape = new THREE.Shape(vector2Arr);
  var geometry = new THREE.ShapeGeometry( //填充多边形
    shape,
  );
  var material = new THREE.MeshLambertMaterial({
    color: 0x0099ff,
  }); //材质对象
  var mesh = new THREE.Mesh(geometry, material); //网格模型对象
  return mesh;
}

// width和height用来设置Three.js输出Canvas画布尺寸，同时用来辅助设置相机渲染范围
/**
 * 透视投影相机设置
 */
// 30:视场角度, width / height:Canvas画布宽高比, 0.01:近裁截面, 3000：远裁截面
var camera = new THREE.PerspectiveCamera(30, width / height, 0.001, 3000);
camera.position.set(292, 223, 185);//相机在Three.js三维坐标系中的位置
camera.lookAt(0, 0, 0); //相机指向Three.js坐标系原点
// var x = 121.49131393432617;// 黄浦江几何中心坐标
// var y = 31.232206344604492;
var x = 121.49526536464691;//东方明珠经纬度坐标
var y = 31.24189350905988;
camera.position.set(x+0.02, y+0.02, 0.02);//0.02是根据黄浦江尺寸范围设置  数量级对应即可 具体数值不用精准
camera.lookAt(x,y,0);//根据黄浦江几何中心坐标或附近某个经纬度坐标设置
/**
 * 创建渲染器对象
 */
var renderer = new THREE.WebGLRenderer({
  antialias: true, //开启锯齿
});
renderer.setPixelRatio(window.devicePixelRatio); //设置设备像素比率,防止Canvas画布输出模糊。
renderer.setSize(width, height); //设置渲染区域尺寸
// renderer.setClearColor(0xffffff, 1); //设置背景颜色
// renderer.domElement表示Three.js渲染结果,也就是一个HTML元素(Canvas画布)
// document.body.appendChild(renderer.domElement); //body元素中插入canvas对象

//创建控件对象  控件可以监听鼠标的变化，改变相机对象的属性
// 旋转：拖动鼠标左键
// 缩放：滚动鼠标中键
// 平移：拖动鼠标右键
var controls = new OrbitControls(camera, renderer.domElement);

// 相机控件与.lookAt()无效( .target属性 )
controls.target.set(x,y,0);
controls.update(); //update()函数内会执行camera.lookAt(controls.targe)

// onresize 事件会在窗口被调整大小时发生
window.onresize = function () {
  // 重置渲染器输出画布canvas尺寸
  renderer.setSize(window.innerWidth, window.innerHeight);
  // 全屏情况下：设置观察范围长宽比aspect为窗口宽高比
  camera.aspect = window.innerWidth / window.innerHeight;
  // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
  // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
  // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
  camera.updateProjectionMatrix();
};


// 渲染循环
function render() {
  renderer.render(scene, camera); //执行渲染操作
  requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧
  // console.log(camera.position);//通过相机控件OrbitControls旋转相机，选择一个合适场景渲染角度
}
render();



