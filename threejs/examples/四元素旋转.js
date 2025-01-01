/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author:张德志
 * :copyright: (c) 2025, Xiaozhi
 * :date created: 2024-07-27 12:32:40
 * :last editor: 张德志
 * :date last edited: 2025-01-01 14:43:11
 */
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,3000);
camera.position.set(50,50,50);
camera.lookAt(scene.position);


const directionalLight = new THREE.DirectionalLight(0xffffff,0.8);
directionalLight.position.set(400,200,300);
scene.add(directionalLight);


const directionalLight2 = new THREE.DirectionalLight(0xffffff,0.8);
directionalLight.position.set(-400,-200,-300);
scene.add(directionalLight2);


scene.add(new THREE.AmbientLight(0xffffff,0.3));
scene.add(new THREE.AxesHelper(250));



const renderer = new THREE.WebGLRenderer({
  antialias:true
});
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera,renderer.domElement);


const loader = new GLTFLoader();
const group = new THREE.Group();

loader.load('/飞机.glb',(gltf) => {
  const fly = gltf.scene;
  fly.position.set(10,10,0);
  const axesHelper = new THREE.AxesHelper(10);
  fly.add(axesHelper);
  group.add(fly);

  const quaternion = new THREE.Quaternion();
  quaternion.setFromAxisAngle(new THREE.Vector3(0,0,1),Math.PI /2);
  fly.quaternion.copy(quaternion);

});

scene.add(group);

function render() {
  controls.update();
  renderer.render(scene,camera);
  requestAnimationFrame(render);
}

render();

