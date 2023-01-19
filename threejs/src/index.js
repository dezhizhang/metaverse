import * as THREE from 'three';
import {
  OrbitControls
} from 'three/examples/jsm/controls/OrbitControls.js';
import {
  line
} from './line.js';
import {
  shapeMesh
} from './shapeMesh.js';

const scene = new THREE.Scene();
const loader = new THREE.FileLoader();
loader.setResponseType('json');

const mapGroup = new THREE.Group();
scene.add(mapGroup);

const lineGroup = new THREE.Group();
scene.add(lineGroup);

const meshGroup = new THREE.Group();
mapGroup.add(meshGroup);

lineGroup.position.z += 0.1;

loader.load('https://tugua.oss-cn-hangzhou.aliyuncs.com/model/china.json', function (data) {
  data.features.forEach(function (area) {
    if (area.geometry.type === "Polygon") {
      // 把"Polygon"和"MultiPolygon"的geometry.coordinates数据结构处理为一致
      area.geometry.coordinates = [area.geometry.coordinates];
    }
    // 解析所有封闭轮廓边界坐标area.geometry.coordinates
    lineGroup.add(line(area.geometry.coordinates)); //省份边界轮廓插入组对象mapGroup
    meshGroup.add(shapeMesh(area.geometry.coordinates)); //省份轮廓Mesh插入组对象mapGroup
  })
});

loader.load('https://tugua.oss-cn-hangzhou.aliyuncs.com/model/weibo.json', function (data) {
  const coord = data.coordinates; //所有经纬度坐标数据
  var verticesArr = []; //所有顶点数据，三个元素为一组
  for (var i = 0; i < coord.length; i += 2) {
    verticesArr.push(coord[i], coord[i + 1], 0); //经纬度作为顶点xy坐标，顶点z坐标设置为0        
  }
  var geometry = new THREE.BufferGeometry(); //创建一个Buffer类型几何体对象
  //3个为一组，表示一个顶点的xyz坐标
  var attribute = new THREE.BufferAttribute(new Float32Array(verticesArr), 3);
  // 设置几何体attributes属性的位置属性
  geometry.attributes.position = attribute;
  // 点渲染模式
  var material = new THREE.PointsMaterial({
    color: 0xffff00,
    size: 1.5 //点对象像素尺寸
  }); //材质对象
  var points = new THREE.Points(geometry, material); //点模型对象
  points.position.z = 0.1;
  scene.add(points); //点对象添加到场景中
});

const axesHelper = new THREE.AxesHelper(300);
scene.add(axesHelper);

// 相机设置
const width = window.innerWidth;
const height = window.innerHeight;
const k = width / height; //窗口宽高比
// const s = 200;
const s = 20; //根据包围盒大小(行政区域经纬度分布范围大小)设置渲染范围
//创建相机对象
const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
// camera.position.set(200, 300, 200); //设置相机位置
camera.position.set(104, 35, 200); //沿着z轴观察
camera.lookAt(104, 35, 0); //指向中国地图的几何中心

const renderer = new THREE.WebGLRenderer({
  antialias: true, //开启锯齿
});
renderer.setSize(width,height);
document.body.appendChild(renderer.domElement);


function render() {
  renderer.render(scene,camera);
  requestAnimationFrame(render);
}

render();

const controls = new OrbitControls(camera,renderer.domElement);
controls.target.set(104, 35, 0);
controls.update();
