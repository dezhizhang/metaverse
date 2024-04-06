/*
 * :file description: 
 * :name: /threejs/examples/47渲染世界轮扩.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-01-09 06:08:22
 * :last editor: 张德志
 * :date last edited: 2024-04-06 16:10:01
 */
 /*
 * :file description:
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2022-07-12 07:44:44
 * :last editor: 张德志
 * :date last edited: 2023-01-09 06:09:27
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const loader = new THREE.FileLoader();
loader.setResponseType('json');

const mapGroup = new THREE.Group();
scene.add(mapGroup);
loader.load(
  '/world.json',
  function (data) {
    data.features.forEach(function (area) {
      if (area.geometry.type === 'Polygon') {
        var pointArr = []; //边界线顶点坐标
        area.geometry.coordinates[0].forEach((elem) => {
          // z坐标设置为0.这样地图轮廓位于XOY平面上
          pointArr.push(elem[0], elem[1], 0);
        });
        mapGroup.add(line(pointArr)); //国家边界轮廓插入组对象mapGroup
        //"MultiPolygon"：国家area有多个封闭轮廓
      } else if (area.geometry.type === 'MultiPolygon') {
        // 解析所有封闭轮廓边界坐标area.geometry.coordinates
        area.geometry.coordinates.forEach((polygon) => {
          var pointArr = []; //边界线顶点坐标
          polygon[0].forEach((elem) => {
            pointArr.push(elem[0], elem[1], 0);
          });
          mapGroup.add(line(pointArr)); //国家边界轮廓插入组对象mapGroup
        });
      }
    });
  },
);

var width = window.innerWidth; //窗口宽度
var height = window.innerHeight; //窗口高度
var k = width / height; //窗口宽高比
var s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
//创建相机对象
var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
camera.position.set(200, 300, 200); //设置相机位置
camera.lookAt(scene.position); //设置相机方向(指向的场景对象)

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);


function line(pointArr) {
  /**
    * 通过BufferGeometry构建一个几何体，传入顶点数据
    * 通过Line模型渲染几何体，连点成线
    * LineLoop和Line功能一样，区别在于首尾顶点相连，轮廓闭合
  */
  const geometry = new THREE.BufferGeometry();
  const vertices = new Float32Array(pointArr);

  const attribue = new THREE.BufferAttribute(vertices,3);
  geometry.attributes.position = attribue;
  
  const material = new THREE.LineBasicMaterial({
    color: 0x00ffff //线条颜色
  });
  const line = new THREE.Line(geometry,material);
  return line;
}

  // 渲染函数
  function render() {
    renderer.render(scene, camera); //执行渲染操作
    requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧
  }
  render();

const axesHelper = new THREE.AxesHelper(300);
scene.add(axesHelper);


const controls = new OrbitControls(camera,renderer.domElement)
