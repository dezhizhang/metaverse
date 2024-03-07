/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-04 22:01:21
 * :last editor: 张德志
 * :date last edited: 2024-03-07 23:10:53
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


//创建场影
const scene = new THREE.Scene();

//创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// 设置相机位置
camera.position.set(1, 1, 10);
camera.lookAt(scene.position);

scene.add(camera);

scene.add(new THREE.AmbientLight(0xffffff,3));

const directionalLight = new THREE.DirectionalLight(0xffffff,3);

directionalLight.position.set(1,1,1);
scene.add(directionalLight);





const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera,renderer.domElement);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const gltfLoader = new GLTFLoader();
gltfLoader.load('xiaozhi.glb',(gltf) => {
  scene.add(gltf.scene);
  
})






window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
