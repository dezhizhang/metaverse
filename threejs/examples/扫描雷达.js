/*
 * :file description: 
 * :name: /threejs/examples/扫描雷达.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-17 08:27:44
 * :last editor: 张德志
 * :date last edited: 2024-04-17 08:27:53
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//创建场影
const scene = new THREE.Scene();

//创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(200, 200, 200);

const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
scene.add(ambientLight);

const geometry = new THREE.PlaneGeometry(100, 100);
const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
  side: THREE.DoubleSide,
  transparent: true,
  map: new THREE.TextureLoader().load('/扫描雷达.png'),
  depthTest: false,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);


const material2 = new THREE.MeshLambertMaterial({
  color:0x00cccc,
  map:new THREE.TextureLoader().load('/雷达刻度.png'),
  side:THREE.DoubleSide,
  transparent:true,
  depthTest:false,
});

const mesh2 = new THREE.Mesh(geometry,material2);
mesh2.rotateX(-Math.PI / 2);
mesh2.add(mesh);
scene.add(mesh2);


const gridHelper = new THREE.GridHelper(500, 15, 0x003333, 0x003333);
scene.add(gridHelper);

// 初始化渲染器
const renderer = new THREE.WebGL1Renderer();

// 设置渲染器大小
renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, renderer.domElement);

document.body.append(renderer.domElement);

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

function render() {
  mesh.rotateZ(0.02);
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
