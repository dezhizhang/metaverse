/*
 * :file description:
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2022-07-12 07:44:44
 * :last editor: 张德志
 * :date last edited: 2023-01-10 07:46:52
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const width = window.innerWidth;
const height = window.innerHeight;

let model = new THREE.Group();

const shape = new THREE.Shape([
  new THREE.Vector2(0, 0),
  new THREE.Vector2(60, 0),
  new THREE.Vector2(60, 80),
  new THREE.Vector2(40, 120),
  new THREE.Vector2(-20, 80),
]);

const geometry = new THREE.ShapeGeometry(shape);

const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
  side:THREE.DoubleSide
});

const mesh = new THREE.Mesh(geometry,material);
model.add(mesh);



//透视投影相机设置
const camera = new THREE.PerspectiveCamera(30, width / height,1,3000);
camera.position.set(292,223,185);
camera.lookAt(0,0,0);

// 创建沉浸器
const renderer = new THREE.WebGLRenderer({
  antialias:true
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width,height);
document.body.appendChild(renderer.domElement);


const controls = new OrbitControls(camera,renderer.domElement);

window.onresize = function() {
  renderer.setSize(window.innerWidth,window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

const scene = new THREE.Scene();
scene.add(model);

// 平行光1
const directionalLight = new THREE.DirectionalLight(0xfffffff,0.8);
directionalLight.position.set(400,200,300);
scene.add(directionalLight);

// 平行光2
const directionalLight2 = new THREE.DirectionalLight(0xffffff,0.8);
directionalLight2.position.set(-400,-200,-300);
scene.add(directionalLight);

// 环境光
const ambient = new THREE.AmbientLight(0xffffff,0.3);
scene.add(ambient);

const axesHelper = new THREE.AxesHelper(250);
scene.add(axesHelper);


function render() {
  requestAnimationFrame(render);
  renderer.render(scene,camera);
}

render();
