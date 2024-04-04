/*
 * :file description: 
 * :name: /threejs/project/河南地图标签可视化.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-04 17:27:00
 * :last editor: 张德志
 * :date last edited: 2024-04-04 17:27:01
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS3DObject,CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import { ExtrudeMesh } from './ExtrudeMesh';
// import { tag,labelRenderer } from './tag3D';

const scene = new THREE.Scene();

// const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.set(300, 300, 200);
// camera.lookAt(scene.position);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const loader = new THREE.FileLoader();
loader.setResponseType('json');

const meshGroup = new THREE.Group();
const lineGroup = new THREE.Group();
const tagGroup = new THREE.Group();
const mapGroup = new THREE.Group();

loader.load('https://tugua.oss-cn-hangzhou.aliyuncs.com/model/henan-gdp.json', ({ arr }) => {
  const gdpObj = {};
  const color1 = new THREE.Color(0xffffff);
  const color2 = new THREE.Color(0xff8888);

  const gdpMax = 10000;

  arr.forEach((obj) => {
    const gdp = obj.value;
    gdpObj[obj.name] = gdp;
  });

  loader.load('https://tugua.oss-cn-hangzhou.aliyuncs.com/model/henan.json', (data) => {
    data.features.forEach((area) => {
      if (area.geometry.type === 'Polygon') {
        area.geometry.coordinates = [area.geometry.coordinates];
      }

      const name = area.properties.name;
      const height = gdpObj[name] / gdpMax;

      const mesh = ExtrudeMesh(area.geometry.coordinates, height);
      const color = color1.clone().lerp(color2.clone(), gdpObj[name] / gdpMax);
      mesh.material.color = color;

      // 生成线模型
      const line = Line(area.geometry.coordinates);
      const line2 = line.clone();
      line2.position.z = height;
      lineGroup.add(line2);

      const tag3D = tag(name);
      const center = area.properties.centroid; //行政区几何中心经纬度坐标
      tag3D.position.set(center[0], center[1], height + 0.01);
      tag3D.scale.set(0.007, 0.007, 0.007); //根据相机渲染范围适当缩放
      tagGroup.add(tag3D);

      meshGroup.add(mesh);
      mapGroup.add(lineGroup, tagGroup, meshGroup);
    });
  });
});

function tag(name) {
  const div = document.createElement('div');
  div.innerHTML = name;
  div.style.padding = '4px 10px';
  div.style.color = '#fff';
  div.style.fontSize = '16px';
  div.style.position = 'absolute';
  div.style.backgroundColor = 'rgba(25,25,25,0.5)';
  div.style.borderRadius = '5px';
  div.style.pointerEvents = 'none';

  const label = new CSS3DObject(div);
  return label;
}

const labelRenderer = new CSS3DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = '0px';
labelRenderer.domElement.style.left = '0px';
labelRenderer.domElement.style.pointerEvents = 'none';

document.body.appendChild(labelRenderer.domElement);

// 包围盒
const box3 = new THREE.Box3();
box3.expandByObject(mapGroup);

const scaleV3 = new THREE.Vector3();
box3.getSize(scaleV3);

const center = new THREE.Vector3();
box3.getCenter(center);

const width = window.innerWidth;
const height = window.innerHeight;
const k = width / height;
const s = 3;

const camera = new THREE.OrthographicCamera(-s * k,s * k,s,-s,1,10000);
camera.position.set(113.51,-65,200);
camera.lookAt(113.51,-65,200);




scene.add(mapGroup);

function Line(pointArrs) {
  const group = new THREE.Group();
  pointArrs.forEach((polygon) => {
    const pointArr = [];
    polygon[0].forEach((elem) => {
      pointArr.push(elem[0], elem[1], 0);
    });
    group.add(lineLoop(pointArr));
  });
  return group;
}

function lineLoop(pointArr) {
  const geometry = new THREE.BufferGeometry();
  const vertices = new Float32Array(pointArr);
  const attribue = new THREE.BufferAttribute(vertices, 3);
  geometry.attributes.position = attribue;

  const material = new THREE.LineBasicMaterial({
    color: 0xff6655,
  });
  return new THREE.LineLoop(geometry, material);
}

function shapeMesh(pointsArrs) {
  const shapeArr = [];
  pointsArrs.forEach((pointsArr) => {
    const vector2Arr = [];
    pointsArr[0].forEach((elem) => {
      vector2Arr.push(new THREE.Vector2(elem[0], elem[1]));
    });
    const shape = new THREE.Shape(vector2Arr);
    shapeArr.push(shape);
  });
  const material = new THREE.MeshBasicMaterial({
    color: 0x002222, //对应陆地颜色
    side: THREE.DoubleSide,
  });
  const geometry = new THREE.ShapeGeometry(shapeArr);
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
}

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(113.51, 33.87, 0);
controls.update();

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
});

function render() {
  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
  // effectComposer.render();
  requestAnimationFrame(render);
}

render();

