/*
 * :file description: 
 * :name: /threejs/examples/渲染中国地图.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2023-06-10 16:25:05
 */
import * as THREE from 'three';
// 引入Three.js扩展库
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { line } from './line.js';




function shapeMesh(pointsArrs) {
  var shapeArr = [];//轮廓形状Shape集合
  pointsArrs.forEach(pointsArr => {
      var vector2Arr = [];
      // 转化为Vector2构成的顶点数组
      pointsArr[0].forEach(elem => {
          vector2Arr.push(new THREE.Vector2(elem[0], elem[1]))
      });
      var shape = new THREE.Shape(vector2Arr);
      shapeArr.push(shape);
  });
  var material = new THREE.MeshBasicMaterial({
      color: 0x004444,
      side: THREE.DoubleSide, //两面可见
  }); //材质对象
  var geometry = new THREE.ShapeBufferGeometry(shapeArr);
  var mesh = new THREE.Mesh(geometry, material); //网格模型对象
  return mesh;
}

const scene = new THREE.Scene();
const loader = new THREE.FileLoader();
loader.setResponseType('json');
const mapGroup = new THREE.Group();
scene.add(mapGroup);

const lineGroup = new THREE.Group();
mapGroup.add(lineGroup);

const meshGroup = new THREE.Group();
mapGroup.add(meshGroup);
lineGroup.position.z = 1 + 0.1;
loader.load('https://tugua.oss-cn-hangzhou.aliyuncs.com/model/china.json',function(data) {
  data.features.forEach(function (area) {
    // "Polygon"：省份area有一个封闭轮廓
    //"MultiPolygon"：省份area有多个封闭轮廓
    if (area.geometry.type === "Polygon") {
      // 把"Polygon"和"MultiPolygon"的geometry.coordinates数据结构处理为一致
      area.geometry.coordinates = [area.geometry.coordinates];
    }
    // 解析所有封闭轮廓边界坐标area.geometry.coordinates
    lineGroup.add(line(area.geometry.coordinates));//省份边界轮廓插入组对象mapGroup
    // height：根据行政区尺寸范围设置，比如高度设置为地图尺寸范围的2%、5%等，过小感觉不到高度，过大太高了
    var height = 1;//拉伸高度

    var mesh = shapeMesh(area.geometry.coordinates, height)
    // mesh.material.transparent = true;
    // mesh.material.opacity = 0.6;// 半透明效果/
    meshGroup.add(mesh);//省份轮廓拉伸Mesh插入组对象mapGroup
  });
  // 地图底部边界线
  var lineGroup2 = lineGroup.clone();
  mapGroup.add(lineGroup2);
  lineGroup2.position.z = -0.1;//适当偏移解决深度冲突
});

// 设置光线
const directionalLight = new THREE.DirectionalLight(0xffffff,0.6);
directionalLight.position.set(400,200,300);
scene.add(directionalLight);

// 平行光2
const directionalLight2 = new THREE.DirectionalLight(0xffffff,0.6);
directionalLight2.position.set(-400,-200,-300);
scene.add(directionalLight2);

// 设置环境光
const ambient = new THREE.AmbientLight(0xffffff,0.6);
scene.add(ambient);

// 辅助坐标
const axesHelper = new THREE.AxesHelper(300);
scene.add(axesHelper);


const width = window.innerWidth;
const height = window.innerHeight;
const k = width / height;
// const s = 200;
const s = 15;
const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
camera.position.set(104, -105, 200);
camera.lookAt(104, 35, 0);


// 创建沉浸器
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
controls.target.set(104,35,0);
controls.update();

