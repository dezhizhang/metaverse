/*
 * :file description: 
 * :name: /threejs/examples/uv渐变.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-07 13:19:43
 * :last editor: 张德志
 * :date last edited: 2024-04-07 13:19:44
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//创建场影
const scene = new THREE.Scene();
//创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// 设置相机位置
camera.position.set(200, 200, 200);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const c = [0, 0, 60, 0, 60, 80, 40, 120, -20, 80, 0, 0];

const geometry = new THREE.BufferGeometry();
const pointsArr = [];
const height = 20;

const uvArr = [];

for (let i = 0; i < c.length - 2; i += 2) {
  pointsArr.push(c[i], c[i + 1], 0, c[i + 2], c[i + 3], 0, c[i + 2], c[i + 3], height);
  pointsArr.push(c[i], c[i + 1], 0, c[i + 2], c[i + 3], height, c[i], c[i + 1], height);

  uvArr.push(0, 0, 1, 0, 1, 1);
  uvArr.push(0, 0, 1, 1, 0, 1);
}

geometry.attributes.position = new THREE.BufferAttribute(new Float32Array(pointsArr), 3);
geometry.attributes.uv = new THREE.BufferAttribute(new Float32Array(uvArr), 2);

geometry.computeVertexNormals();

const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
  side: THREE.DoubleSide,
  transparent: true,
  map: new THREE.TextureLoader().load('/渐变.png'),
  depthTest: false,
});

const mesh = new THREE.Mesh(geometry, material);
mesh.rotateX(-Math.PI / 2);
scene.add(mesh);

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

// 初始化渲染器
const renderer = new THREE.WebGLRenderer();

// 设置渲染器大小
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.append(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
});

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
