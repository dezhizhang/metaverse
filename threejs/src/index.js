/*
 * :file description:
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-13 22:44:48
 * :last editor: 张德志
 * :date last edited: 2024-04-02 05:42:18
 */
import * as THREE from 'three';
import {
  OrbitControls
} from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

// const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.set(300, 300, 200);
// camera.lookAt(scene.position);

const width = window.innerWidth;
const height = window.innerHeight;
const k = width / height;
const s = 35;

const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
camera.position.set(104, 35, 200);
camera.lookAt(104, 35, 0);



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


loader.load('https://tugua.oss-cn-hangzhou.aliyuncs.com/model/china.json', (data) => {
  data.features.forEach(function (area) {
    if (area.geometry.type === 'Polygon') {
      area.geometry.coordinates = [area.geometry.coordinates]
    }
    lineGroup.add(lineLoop(area.geometry.coordinates));
    scene.add(lineGroup)
    // meshGroup.add(shapeMesh(area.geometry.coordinates));
    // mapGroup.add(lineGroup, meshGroup);
  });

  // 包围盒
  const box3 = new THREE.Box3();
  box3.expandByObject(lineGroup);

  const scaleV3 = new THREE.Vector3();
  box3.getSize(scaleV3);

  const center = new THREE.Vector3();
  box3.getCenter(center);

  console.log('center', center);



});


function lineLoop(pointArr) {

  const group = new THREE.Group();
  pointArr.forEach((polygon) => {
    const pointArr = [];
    polygon[0].forEach((elem) => {
      pointArr.push(elem[0], elem[1],0)
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
    color: 0x00cccc
  });
  // const line = new THREE.Line(geometry,material);
  return new THREE.LineLoop(geometry, material);

}

function shapeMesh() {

}







const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(104, 35, 0);
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
