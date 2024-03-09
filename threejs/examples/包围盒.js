/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-04 22:01:21
 * :last editor: 张德志
 * :date last edited: 2024-03-09 13:56:25
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
//创建场影
const scene = new THREE.Scene();

//创建相机
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);

// 设置相机位置
camera.position.set(1,1,10);
scene.add(camera);

const ambientLight = new THREE.AmbientLight(0xffffff,3);
scene.add(ambientLight);


const rgbLoader = new RGBELoader();
rgbLoader.load('Alex_Hart-Nature_Lab_Bones_2k.hdr',(envMap) => {
  envMap.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = envMap;
  scene.background = envMap;

})


const gltfLoader = new GLTFLoader();
gltfLoader.load('/Duck.glb',(gltf) => {
  scene.add(gltf.scene);
  
  const duckMesh = gltf.scene.getObjectByName('LOD3spShape');
  const duckGeometry = duckMesh.geometry;

  duckMesh.updateWorldMatrix(true,true);

  // 计算包围盒
  duckGeometry.computeBoundingBox();

  const duckBox = duckGeometry.boundingBox;
  duckBox.applyMatrix4(duckMesh.matrixWorld);

  const boxHelper = new THREE.Box3Helper(duckBox,0xff00ff);
  scene.add(boxHelper);

})




// 初始化渲染器
const renderer = new THREE.WebGL1Renderer();

// 设置渲染器大小
renderer.setSize(window.innerWidth,window.innerHeight);

document.body.append(renderer.domElement);

const controls = new OrbitControls(camera,renderer.domElement);

window.addEventListener('resize',() => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth,window.innerHeight);
});



function render() {
  requestAnimationFrame(render);
  renderer.render(scene,camera);
}

render();



