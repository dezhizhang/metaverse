/*
 * :file description:
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2024-05-17 23:01:30
 */
import dat from 'dat.gui';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader.js';

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

// scene.add(new THREE.CameraHelper(directionalLight.shadow.camera));

// const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight)

// scene.add(directionalLightHelper);

const ambient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambient);

// 初始化渲染器
const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.shadowMap.enabled = true;
// 设置渲染器大小
renderer.setSize(window.innerWidth, window.innerHeight);

const geometry = new THREE.BoxGeometry(15,15,15);
const material = new THREE.MeshLambertMaterial({
  color:0xff0000
});
const mesh = new THREE.Mesh(geometry,material);

mesh.name = 'Box';
scene.add(mesh);


const times = [0,3,6];

const values = [0,0,0,100,0,0,0,0,100];

const posKF = new THREE.KeyframeTrack('Box.position',times,values);

const colorKF = new THREE.KeyframeTrack('Box.material.color',[2,5],[1,0,0,0,0,1]);

const clip = new THREE.AnimationClip('test',6,[posKF,colorKF]);

const mixer = new THREE.AnimationMixer(mesh);

const clipAction = mixer.clipAction(clip);

clipAction.loop = THREE.LoopOnce;
clipAction.clampWhenFinished = true;


const xDom = document.getElementById('x');
xDom.addEventListener('click',() => {
  if(!clipAction.paused) clipAction.paused = true;
  if(clipAction.paused) clipAction.paused = false;

  clipAction.play();
});


const yDom = document.getElementById('y');
yDom.addEventListener('click',() => {
  clipAction.paused = true;
});


const gui = new dat.GUI();
gui.domElement.position = 'absolute';
gui.domElement.style.top = '20px';
gui.domElement.style.right = '20px';

document.body.appendChild(gui.domElement);


gui.add(clipAction,'timeScale').onChange((value) => {
  clipAction.timeScale = value;
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
  mixer.update(frameT);

}

render();
