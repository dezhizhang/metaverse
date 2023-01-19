// 现在浏览器支持ES6语法，自然包括import方式引入js文件
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

const meshGroup = new THREE.Group(); //轮廓Mesh组
mapGroup.add(meshGroup);

const minHeight = 2;
lineGroup.position.z = minHeight + minHeight * 0.1; //适当偏移解决深度冲突
loader.load(
  'https://tugua.oss-cn-hangzhou.aliyuncs.com/model/world.json',
  function (data) {
    data.features.forEach(function (area) {
      if (area.geometry.type === 'Polygon') {
        // 把"Polygon"和"MultiPolygon"的geometry.coordinates数据结构处理为一致
        area.geometry.coordinates = [area.geometry.coordinates];
      }
      // 解析所有封闭轮廓边界坐标area.geometry.coordinates
      lineGroup.add(line(area.geometry.coordinates)); //国家边界轮廓插入组对象mapGroup

      meshGroup.add(ExtrudeMesh(area.geometry.coordinates, minHeight)); //国家轮廓Mesh插入组对象mapGroup
    });
  },
);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.position.set(400, 200, 300);
scene.add(directionalLight);

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight2.position.set(-400, -200, -300);
scene.add(directionalLight2);

const ambient = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambient);

const axesHelper = new THREE.AxesHelper(300);
scene.add(axesHelper);

const width = window.innerWidth;
const height = window.innerHeight;
const s = 90;
const k = width / height;
const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1500);
camera.position.set(0, -100, 200); //沿着z轴观察
camera.lookAt(0, 0, 0); //指向中国地图的几何中心

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

function render() {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();
const controls = new OrbitControls(camera, renderer.domElement);
