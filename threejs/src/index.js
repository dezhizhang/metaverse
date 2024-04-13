/*
 * :file description:
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2024-04-13 20:24:56
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

//创建场影
const scene = new THREE.Scene();

//创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// 设置相机位置
camera.position.set(-437, 443, 278);
scene.add(camera);

const dracoLoader = new DRACOLoader();
const gltfLoader = new GLTFLoader();

const cubeTextureLoader = new THREE.CubeTextureLoader().setPath('/environ/');
const envMapTexture = cubeTextureLoader.load([
  'px.jpg',
  'nx.jpg',
  'py.jpg',
  'ny.jpg',
  'pz.jpg',
  'nz.jpg',
]);

dracoLoader.setDecoderPath('/draco/');
gltfLoader.load('/轿车.glb', (gltf) => {
  gltf.scene.traverse(function(object) {
    if(object.type === 'Mesh') {
      if(object.name.slice(0,3) === '后视境') {
        object.material = new THREE.MeshStandardMaterial({
          color:0xffffff,
          metalness:1.0,
          roughness:0.0,
          envMapIntensity:1.0
        })
      }else if(object.name.slice(0,4) === '高光金属') {
        object.material = new THREE.MeshStandardMaterial({
          color:object.material.color,
          metalness:1.0,
          roughness:0.4,
          envMap:envMapTexture
        })
      }
    
      object.material.envMap = envMapTexture;
    }
  })
  scene.add(gltf.scene);
});

//light
const ambientLight = new THREE.AmbientLight(0xffffff, 1);

const directionalLight = new THREE.DirectionalLight(0xffffff,1);
directionalLight.position.set(-437, 443, 278)
scene.add(directionalLight);


const directionalLight2 = new THREE.DirectionalLight(0xffffff,1);
directionalLight2.position.set(437,-443,-278);
scene.add(directionalLight2);



scene.add(ambientLight);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
});

// 初始化渲染器
const renderer = new THREE.WebGLRenderer();
renderer.output;
// 设置渲染器大小
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.append(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
