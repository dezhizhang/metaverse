/*
 * :file description:
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-13 22:44:48
 * :last editor: 张德志
 * :date last edited: 2024-03-28 09:18:07
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import data from './data.js';


const scene = new THREE.Scene();

const width = window.innerWidth;
const height = window.innerHeight;

const k = width / height;
const s = 1.5;

const camera = new THREE.OrthographicCamera(-s * k,s * k,s,-s,1,8000);
camera.position.set(300,300,300);
camera.lookAt(113.51,33.88,0);





// const gridHelper = new THREE.GridHelper(30, 25, 0x004444, 0x004444);
// scene.add(gridHelper);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(100, 60, 50);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const renderer = new THREE.WebGLRenderer();
// renderer.outputEncoding = THREE.sRGBEncoding;
// renderer.outputEncoding = THREE.sea
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const pointArr = [];
data.forEach(function(e) {
  const v2 = new THREE.Vector2(e[0],e[1]);
  pointArr.push(v2)
});

const shape = new THREE.Shape(pointArr);
const geometry = new THREE.ShapeGeometry(shape);
const material = new THREE.MeshLambertMaterial({
  color:0x00ffff,
  side:THREE.DoubleSide,
});

const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);

const box = new THREE.Box3();
box.expandByObject(mesh);

const size = new THREE.Vector3();
box.getSize(size);
console.log('size',size);

const center = new THREE.Vector3();
box.getCenter(center);
console.log('center',center);






document.body.appendChild(renderer.domElement);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(113.51,33.88,0);
controls.update();


function render() {
  requestAnimationFrame(render);

  renderer.render(scene, camera);
}

render();
