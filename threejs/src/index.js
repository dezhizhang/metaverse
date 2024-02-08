import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { outerLine } from './line.js';

var scene = new THREE.Scene();
//three.js文件加载类FileLoader：封装了XMLHttpRequest
var loader = new THREE.FileLoader();
loader.setResponseType('json');
// 组对象mapGroup是所有国家边界Line模型的父对象
var mapGroup = new THREE.Group();
scene.add(mapGroup);
// 异步加载包含世界各个国家边界坐标的GeoJSON文件：world.json
loader.load('https://tugua.oss-cn-hangzhou.aliyuncs.com/world.json', function (data) {
  // 访问所有国家边界坐标数据：data.features
  data.features.forEach(function (country) {
    // "Polygon"：国家country有一个封闭轮廓
    //"MultiPolygon"：国家country有多个封闭轮廓
    if (country.geometry.type === 'Polygon') {
      // 把"Polygon"和"MultiPolygon"的geometry.coordinates数据结构处理为一致
      country.geometry.coordinates = [country.geometry.coordinates];
    }
    // 解析所有封闭轮廓边界坐标country.geometry.coordinates
    mapGroup.add(outerLine(country.geometry.coordinates)); //国家边界轮廓插入组对象mapGroup
  });
});
//three.js辅助坐标系
var axesHelper = new THREE.AxesHelper(300);
scene.add(axesHelper);
/**
 * 相机设置
 */
var width = window.innerWidth; //窗口宽度
var height = window.innerHeight; //窗口高度
var k = width / height; //窗口宽高比
// var s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
var s = 90; //缩小渲染渲染范围，地图尽量100%填充canvas画布
//创建相机对象
var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
// camera.position.set(200, 300, 200); //设置相机位置
camera.position.set(0, 0, 200); //沿着z轴观察
camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
/**
 * 创建渲染器对象
 */
var renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height); //设置渲染区域尺寸
// renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
document.body.appendChild(renderer.domElement); //body元素中插入canvas对象

// 渲染函数
function render() {
  renderer.render(scene, camera); //执行渲染操作
  requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧
}
render();
//创建控件对象  控件可以监听鼠标的变化，改变相机对象的属性
// 旋转、缩放用于代码调试

var controls = new OrbitControls(camera, renderer.domElement);
