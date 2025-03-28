/*
 * :file description: 
 * :name: /threejs/examples/reflectivity.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-10 15:35:55
 * :last editor: 张德志
 * :date last edited: 2024-03-10 15:40:53
 */

import * as THREE from 'three';
import dat from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(1,1,10);
scene.add(camera);

const ambientLight = new THREE.AmbientLight(0xffffff,3);
scene.add(ambientLight);

const rgbLoader = new RGBELoader();
rgbLoader.load('/Alex_Hart-Nature_Lab_Bones_2k.hdr',(envMap) => {
  envMap.mapping = THREE.EquirectangularRefractionMapping;
  scene.environment = envMap;
  scene.background = envMap;
});

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('/diamond/diamond_emissive.png');

const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshPhysicalMaterial({
  transform:true,
  color:0xffff00,
  // transmission:0.95,
  roughness:0.5,
//   thickness:2.0,
//   thicknessMap:texture,
//   attenuationColor:new THREE.Color(0.9,0.6,0),
//   attenuationDistance:1.0,

});

const box = new THREE.Mesh(geometry,material);
scene.add(box);

const gui = new dat.GUI();
gui.add(box.material,'attenuationDistance',0,10).name('衰减距离');
gui.add(box.material,'thickness',0,2).name('厚度');


// // ior
// gui.add(box.material,'ior',0,2).name('折射率');
// gui.add(box.material,'reflectivity',0,1).name('反射率');



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
