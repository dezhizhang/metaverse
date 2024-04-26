/*
 * :file description: 
 * :name: /threejs/examples/OBJLoader和MTLLoader的加载多模型.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-26 17:00:07
 * :last editor: 张德志
 * :date last edited: 2024-04-26 17:00:15
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(200,200,200);
camera.lookAt(scene.position);


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

document.body.appendChild(renderer.domElement);


const objLoader = new OBJLoader();
const mtlLoader = new MTLLoader();

mtlLoader.load('/multiple-models/model1.mtl',function(material) {
  objLoader.setMaterials(material);
  objLoader.load('/multiple-models/model1.obj',function(obj) {
    obj.children[0].geometry.center();
    scene.add(obj);
  })
})


const controls = new OrbitControls(camera,renderer.domElement);

scene.add(new THREE.AxesHelper(100));
scene.add(new THREE.AmbientLight(0xffffff,1));





function render() {
  requestAnimationFrame(render);
  renderer.render(scene,camera);
}

render();



