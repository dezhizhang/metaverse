/*
 * :file description: 
 * :name: /threejs/examples/工厂动画.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-05-18 21:11:34
 * :last editor: 张德志
 * :date last edited: 2024-05-18 21:11:48
 */
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

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

let mixer = null;

const gltfLoader = new GLTFLoader();
gltfLoader.load('/工厂.glb',(gltf) => {
  console.log(gltf);
  mixer = new THREE.AnimationMixer(gltf.scene);
  const clipAction = mixer.clipAction(gltf.animations[0]);
  clipAction.play();
  scene.add(gltf.scene);
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

const clock = new THREE.Clock()

function render() {
  const frameT = clock.getDelta();
  requestAnimationFrame(render);
  // composer.render();
  renderer.render(scene, camera);
  if(mixer) {
    mixer.update(frameT);
  }

}

render();
