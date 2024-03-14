/*
 * :file description:
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-04 22:01:21
 * :last editor: 张德志
 * :date last edited: 2024-03-15 07:05:35
 */
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


const clock = new THREE.Clock();


const scene = new THREE.Scene();


scene.background = new THREE.Color(0xffffff);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(0, 0, 10);

const renderer = new THREE.WebGL1Renderer({
  antialias: true,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
document.body.appendChild(renderer.domElement);


const ambientLight = new THREE.AmbientLight(0xffffff,1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xfffff,1);
directionalLight.position.set(1,2,5);
scene.add(directionalLight);


const pointLight = new THREE.PointLight(0xfffff,1);
scene.add(pointLight);


// scene.add(new THREE.DirectionalLightHelper(directionalLight))




const axeshelper = new THREE.AxesHelper(5);
scene.add(axeshelper);

const gltfLoader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/draco/');
gltfLoader.setDRACOLoader(dracoLoader);

let mixer = null;

gltfLoader.load('/huawei.glb',(gltf) => {
  console.log(gltf);
  scene.add(gltf.scene);

  // 创建动画混合器
  mixer = new THREE.AnimationMixer(gltf.scene);
  // 获取动画
  const action = mixer.clipAction(gltf.animations[0]); 
  // 播放动画
  action.play();


  
})




const controls = new OrbitControls(camera, renderer.domElement);

window.addEventListener('resize',() => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth,window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
})

function render() {

  const delta = clock.getDelta();
  controls.update();
  renderer.render(scene, camera);
  if(mixer) {
    mixer.update(delta);
  }
  requestAnimationFrame(render);
}

render();
