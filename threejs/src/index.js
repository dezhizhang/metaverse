/*
 * :file description:
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-13 22:44:48
 * :last editor: 张德志
 * :date last edited: 2024-03-17 23:10:10
 */

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as d3 from 'd3';

//创建场影
const scene = new THREE.Scene();

//创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// 设置相机位置
camera.position.set(0, 0, 10);
scene.add(camera);


scene.add(new THREE.AmbientLight(0xffffff,3));

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);



const loader = new THREE.FileLoader();
loader.load('https://tugua.oss-cn-hangzhou.aliyuncs.com/model/china.json', (data) => {
  const jsonData = JSON.parse(data);
  operactionData(jsonData);
});

const map = new THREE.Object3D();


function operactionData(jsonData) {
  const features = jsonData.features;
  features.forEach((feature) => {
    const province = new THREE.Object3D();
    province.properties = feature.properties.name;
    const coordinates = feature.geometry.coordinates;

    if (feature.geometry.type === 'Polygon') {
      coordinates.forEach((coordinate) => {
        const mesh = createMesh(coordinate);
        mesh.properties = feature.properties.name;
        province.add(mesh);

      });
    }
    if(feature.geometry.type === 'MultiPolygon') {
      coordinates.forEach((item) => {
        item.forEach((coor) => {
          const mesh = createMesh(coor);
          mesh.properties = feature.properties.name;
          province.add(mesh);
        }) 
      })
    }
    map.add(province);
  });
  scene.add(map);

}

const projection = d3.geoMercator().center([116.5, 38.5]).translate([0,0]);

function createMesh(polygon) {
  const shape = new THREE.Shape();
  polygon.forEach((row,index) => {
    const [longitude, latitude] = projection(row);
    if(index === 0) {
      shape.moveTo(longitude,-latitude);
    }
    shape.lineTo(longitude,-latitude);
  });
  const geometry = new THREE.ExtrudeGeometry(shape,{depth:5});
  const material = new THREE.MeshBasicMaterial({
    color:new THREE.Color(0xffffff * Math.random())
  });
  return new THREE.Mesh(geometry,material);
}

// 初始化渲染器
const renderer = new THREE.WebGL1Renderer();

// 设置渲染器大小
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.append(renderer.domElement);

renderer.render(scene, camera);

const controls = new OrbitControls(camera, renderer.domElement);

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();

//
