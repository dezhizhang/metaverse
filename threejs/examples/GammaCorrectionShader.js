/*
 * :file description:
 * :name: /threejs/examples/GammaCorrectionShader.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2024-05-17 06:27:52
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


const directionalLight = new THREE.DirectionalLight(0xffffff,1);
directionalLight.position.set(100,60,50);
scene.add(directionalLight);

scene.add(new THREE.CameraHelper(directionalLight.shadow.camera));

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight)

scene.add(directionalLightHelper);


const ambient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambient);



// 初始化渲染器
const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.shadowMap.enabled = true;
// 设置渲染器大小
renderer.setSize(window.innerWidth, window.innerHeight);

let model = null;

const gltfLoader = new GLTFLoader();
gltfLoader.load('/工厂.glb',(gltf) => {
  // console.log(gltf);
  model = gltf.scene;
  scene.add(gltf.scene);
});


const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene,camera);
composer.addPass(renderPass);

const v2 = new THREE.Vector2(window.innerWidth,window.innerHeight);
const outlinePass = new OutlinePass(v2,scene,camera);
outlinePass.edgeThickness = 4;
outlinePass.edgeStrength = 6;

const xDom = document.getElementById('x');
xDom.addEventListener('click',() => {
  const car = model.getObjectByName('大货车2');
  outlinePass.selectedObjects = [car];
});

const yDom = document.getElementById('y');
yDom.addEventListener('click',() => {
  const car = model.getObjectByName('大货车1');
  outlinePass.selectedObjects = [car];
});

outlinePass.visibleEdgeColor.set(0x0000ff);
composer.addPass(outlinePass);

const shaderPass = new ShaderPass(GammaCorrectionShader);
composer.addPass(shaderPass);


const controls = new OrbitControls(camera,renderer.domElement);



window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

document.body.append(renderer.domElement);

function render() {
  requestAnimationFrame(render);
  composer.render();
  // renderer.render(scene, camera);
}

render();