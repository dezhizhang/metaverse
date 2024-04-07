/*
 * :file description:
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-07 10:08:15
 * :last editor: 张德志
 * :date last edited: 2024-04-07 11:12:08
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { lon2xy } from './math';

//创建场影
const scene = new THREE.Scene();

//创建相机
const camera = new THREE.PerspectiveCamera(30,window.innerWidth / window.innerHeight,1,50000);
const E = 121.49526536464691;
const N = 31.24189350905988;
const xy = lon2xy(E,N);
camera.position.set(xy.x + 5000,xy.y +  5000,5000);
camera.lookAt(xy.x,xy.y,0);



const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);


const directionalLigh1 = new THREE.DirectionalLight(0xffffff,1);
directionalLigh1.position.set(200,400,300);
scene.add(directionalLigh1);

const directionalLight2 = new THREE.DirectionalLight(0xffffff,1);
directionalLight2.position.set(-200,-400,300);
scene.add(directionalLight2);


const modelGroup = new THREE.Group();

const loader = new THREE.FileLoader();
loader.setResponseType('json');
loader.load('/上海外滩.json', (data) => {
  const buildingGroup = new THREE.Group();
  data.features.forEach((build) => {
    if (build.geometry) {
      if (build.geometry.type === 'Polygon') {
        build.geometry.coordinates = [build.geometry.coordinates];
      }
      const height = build.properties.Floor * 3;
      buildingGroup.add(ExtrudeMesh(build.geometry.coordinates, height));
    }
  });
  modelGroup.add(buildingGroup);
});

loader.load('/黄浦江.json', (data) => {
  const riverGroup = new THREE.Group();
  data.features.forEach((build) => {
    if (build.geometry) {
      if (build.geometry.type === 'Polygon') {
        build.geometry.coordinates = [build.geometry.coordinates];
      }
      riverGroup.add(shapeMesh(build.geometry.coordinates));
    }
  });
  modelGroup.add(riverGroup);
});

scene.add(modelGroup);

function ExtrudeMesh(pointsArrs, height) {
  const shapeArr = [];
  pointsArrs.forEach((pointsArr) => {
    const vector2Arr = [];
    pointsArr[0].forEach((elem) => {
      const xy = lon2xy(elem[0], elem[1]);
      vector2Arr.push(new THREE.Vector2(xy.x, xy.y));
    });
    const shape = new THREE.Shape(vector2Arr);
    shapeArr.push(shape);
  });

  
  const geometry = new THREE.ExtrudeGeometry(shapeArr, {
    depth: height,
    bevelEnabled: false,
  });

  const material = new THREE.MeshLambertMaterial({
    color: 0x009999,
    side:THREE.DoubleSide
  });

  return new THREE.Mesh(geometry, material);
}

function shapeMesh(pointsArrs) {
  const shapeArr = [];
  pointsArrs.forEach((pointArr) => {
    const vector2Arr = [];
    pointArr[0].forEach((elem) => {
      const xy = lon2xy(elem[0], elem[1]);
      vector2Arr.push(new THREE.Vector2(xy.x, xy.y));
    });

    const shape = new THREE.Shape(vector2Arr);
    shapeArr.push(shape);
  });

  const geometry = new THREE.ShapeGeometry(shapeArr);
  const material = new THREE.MeshLambertMaterial({
    color: 0x009966,
  });
  return new THREE.Mesh(geometry, material);
}

// 初始化渲染器
const renderer = new THREE.WebGLRenderer();

// 设置渲染器大小
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.append(renderer.domElement);

const axesHelper = new THREE.AxesHelper(250);
axesHelper.position.set(xy.x,xy.y,0);
scene.add(axesHelper);


const controls = new OrbitControls(camera,renderer.domElement);
controls.target.set(xy.x,xy.y,0);
controls.update();

window.addEventListener('resize',() => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth,window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
});


function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
