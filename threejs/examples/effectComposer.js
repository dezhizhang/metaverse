/*
 * :file description: 
 * :name: /threejs/examples/effectComposer.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-06 21:33:15
 * :last editor: 张德志
 * :date last edited: 2024-03-06 21:48:09
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { DotScreenPass } from 'three/examples/jsm/postprocessing/DotScreenPass.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xff00ff);

const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(-1.8,0.6,2.7);

const renderer = new THREE.WebGLRenderer({
  antialias:true
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

// 后期后成
const effectComposer = new EffectComposer(renderer);
effectComposer.setSize(window.innerWidth,window.innerHeight);

const renderPass = new RenderPass(scene,camera);
effectComposer.addPass(renderPass);

const dotScreenPass = new DotScreenPass();
effectComposer.addPass(dotScreenPass);


const controls = new OrbitControls(camera,renderer.domElement);
scene.add(new THREE.AmbientLight(0xfffff,3));

const directionalLight = new THREE.DirectionalLight(0xffffff,1);
directionalLight.castShadow = true;
directionalLight.position.set(0,0,200);
scene.add(directionalLight);

const gltfLoader = new GLTFLoader();
gltfLoader.load('https://threejs.org/examples/models/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf',(gltf) => {
  const mesh = gltf.scene.children[0];
  scene.add(mesh);

});

window.addEventListener('resize',onWindowResize);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth,window.innerHeight);
  
}

function render() {
  requestAnimationFrame(render);
  // renderer.render(scene,camera);
  effectComposer.render(scene, camera);
}

render();



