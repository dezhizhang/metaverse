/*
 * :file description: 
 * :name: /threejs/project/北京城市公交线路图.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-04 21:15:48
 * :last editor: 张德志
 * :date last edited: 2024-04-04 21:15:49
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { ExtrudeMesh } from './ExtrudeMesh';

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
const mapGroup = new THREE.Group();

lineGroup.position.z = 0.001;

loader.load('/北京市.json', (data) => {
  data.features.forEach(function (area) {
    if (area.geometry.type === 'Polygon') {
      area.geometry.coordinates = [area.geometry.coordinates];
    }
    lineGroup.add(lineLoop(area.geometry.coordinates));
    meshGroup.add(shapeMesh(area.geometry.coordinates));
    mapGroup.add(lineGroup, meshGroup);
  });
});

function shapeMesh(pointsArrs) {
  const shapeArr = [];
  pointsArrs.forEach((pointArr) => {
    const vector2Arr = [];
    pointArr[0].forEach((elem) => {
      vector2Arr.push(new THREE.Vector2(elem[0],elem[1]));
    });
    const shape = new THREE.Shape(vector2Arr);
    shapeArr.push(shape);
  });

  const geometry = new THREE.ShapeGeometry(shapeArr);
  const material = new THREE.MeshBasicMaterial({
    color:0x002222,
    side:THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(geometry,material);
  return mesh;
}

loader.load('/公交轨迹.json',function(data) {
  const coords = data.coordinates;
  const group = new THREE.Group();
  coords.forEach(function(coord) {
    const verticesArr = [];
    for(let i=0;i < coord.length;i+=2) {
      verticesArr.push(coord[i],coord[i + 1],0);
    }
    const geometry = new THREE.BufferGeometry();
    const attribute = new THREE.BufferAttribute(new Float32Array(verticesArr),3);
    geometry.attributes.position = attribute;

    const material = new THREE.LineBasicMaterial({
      color:0x00ffff
    });
    const line = new THREE.Line(geometry,material);
    group.add(line);
  });
  group.position.z = 0.002;
  scene.add(group);

})




const width = window.innerWidth;
const height = window.innerHeight;
const k = width / height;
const s = 1;

const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
camera.position.set(116.469, 40.252, 200); //沿着z轴观察
camera.lookAt(116.469, 40.252, 0); //指向中国地图的几何中心

scene.add(mapGroup);

function lineLoop(pointArr) {
  const group = new THREE.Group();
  pointArr.forEach((polygon) => {
    const pointArr = [];
    polygon[0].forEach((elem) => {
      pointArr.push(elem[0], elem[1], 0);
    });
    group.add(line(pointArr));
  });
  return group;
}

function line(pointArr) {
  const geometry = new THREE.BufferGeometry();
  const vertices = new Float32Array(pointArr);
  const attribue = new THREE.BufferAttribute(vertices, 3);
  geometry.attributes.position = attribue;
  const material = new THREE.LineBasicMaterial({
    color: 0x00cccc,
  });
  // const line = new THREE.Line(geometry,material);
  return new THREE.LineLoop(geometry, material);
}

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(116.469, 40.252);
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
  // effectComposer.render();
  requestAnimationFrame(render);
}

render();
