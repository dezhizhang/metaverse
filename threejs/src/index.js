import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { line } from './line.js';
import { ExtrudeMesh } from './ExtrudeMesh.js';


const scene = new THREE.Scene();
const loader = new THREE.FileLoader();
loader.setResponseType('json');

const mapGroup = new THREE.Group();
scene.add(mapGroup);

const lineGroup = new THREE.Group();
mapGroup.add(lineGroup);

const meshGroup = new THREE.Group();
mapGroup.add(meshGroup);

const minHeight = 2;
lineGroup.position.z =  minHeight + minHeight * 0.1;//适当偏移解决深度冲突

loader.load('https://tugua.oss-cn-hangzhou.aliyuncs.com/model/world.json',function(data) {
  data.features.forEach(function (area) {
    // "Polygon"：国家area有一个封闭轮廓
    //"MultiPolygon"：国家area有多个封闭轮廓
    if (area.geometry.type === "Polygon") {
      // 把"Polygon"和"MultiPolygon"的geometry.coordinates数据结构处理为一致
      area.geometry.coordinates = [area.geometry.coordinates];
    }
    // 解析所有封闭轮廓边界坐标area.geometry.coordinates
    lineGroup.add(line(area.geometry.coordinates));//国家边界轮廓插入组对象mapGroup

    meshGroup.add(ExtrudeMesh(area.geometry.coordinates, minHeight));//国家轮廓Mesh插入组对象mapGroup
  });

  // 地图底部边界线
  let lineGroup2 = lineGroup.clone();
  mapGroup.add(lineGroup2);
  lineGroup2.position.z = -minHeight * 0.1;//适当偏移解决深度冲突
});

loader.load('https://tugua.oss-cn-hangzhou.aliyuncs.com/model/person.json',function(data) {
  var group = new THREE.Group();
  var coord = data.population;//所有经纬度坐标和对应需要可视化的数值
  var Max = 500//设置一个基准值,以要可视化的数据最大值为准即可
  var color1 = new THREE.Color(0x229977);
  var color2 = new THREE.Color(0x29ee77);//最大数值对应柱子颜色
  for (var i = 0; i < coord.length; i++) {
    var height = coord[i][2];//经纬度coord[i][0], coord[i][1]对应数值
    var color = color1.clone().lerp(color2.clone(), height / Max);
    // 创建一个柱子几何体
    var minHeight = height/100;
    var geometry = new THREE.BoxBufferGeometry(0.3, 0.3,minHeight);
    geometry.translate(0,0,minHeight/2);
    var material = new THREE.MeshLambertMaterial({
      color: color,
    }); 
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(coord[i][0], coord[i][1],minHeight);
    group.add(mesh);
  }


  group.position.z = 0.1;
  scene.add(group); 
});

const directionalLight = new THREE.DirectionalLight(0xffffff,0.6);
directionalLight.position.set(400,200,300);
scene.add(directionalLight);

const directionalLight2 = new THREE.DirectionalLight(0xffffff,0.6);
directionalLight2.position.set(-400,-200,-300);
scene.add(directionalLight2);

const ambient = new THREE.AmbientLight(0xffffff,0.6);
scene.add(ambient);

const axesHelper = new THREE.AxesHelper(300);
scene.add(axesHelper);

const width = window.innerWidth;
const height = window.innerHeight;
var k = width / height; //窗口宽高比
// var s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
var s = 90;//缩小渲染渲染范围，地图尽量100%填充canvas画布
var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1500);
// camera.position.set(200, 300, 200); //设置相机位置
// camera.position.set(0, 0, 200); //沿着z轴观察
camera.position.set(0, -100, 200); //沿着z轴观察
camera.lookAt(0, 0, 0); //指向中国地图的几何中心


const renderer = new THREE.WebGLRenderer();
renderer.setSize(width,height);
document.body.appendChild(renderer.domElement);


function render() {
  renderer.render(scene,camera);
  requestAnimationFrame(render);
}

render();

const controls = new OrbitControls(camera,renderer.domElement);

