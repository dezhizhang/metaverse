/*
 * :file description: 
 * :name: /threejs/examples/骨骼动画.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-05-19 14:25:36
 * :last editor: 张德志
 * :date last edited: 2024-05-19 14:25:36
 */
import * as dat from 'dat.gui';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//骨骼动画
//创建场影
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(200, 200, 200);
camera.lookAt(0, 0, 0);

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(100, 60, 50);
scene.add(directionalLight);

const ambient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambient);

// 初始化渲染器
const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.shadowMap.enabled = true;
// 设置渲染器大小
renderer.setSize(window.innerWidth, window.innerHeight);

const gltfLoader = new GLTFLoader();
gltfLoader.load('/骨骼动画.glb', (gltf) => {
  scene.add(gltf.scene);
  const helper = new THREE.SkeletonHelper(gltf.scene);

  const bone1 = gltf.scene.getObjectByName('Bone1');

  const gui = new dat.GUI();
  gui.domElement.style.position = 'absolute';
  gui.domElement.style.top = '0px';
  gui.domElement.style.right = '0px';
  gui.add(bone1.rotation, 'x', 0, Math.PI / 6).name('关节点1');

  document.body.appendChild(gui.domElement);

  scene.add(helper);
});

const controls = new OrbitControls(camera, renderer.domElement);

window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

document.body.append(renderer.domElement);

const clock = new THREE.Clock();

function render() {
  // const frameT = clock.getDelta();
  requestAnimationFrame(render);
  // composer.render();
  renderer.render(scene, camera);
}

render();
