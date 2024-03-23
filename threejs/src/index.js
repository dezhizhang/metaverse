/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-13 22:44:48
 * :last editor: 张德志
 * :date last edited: 2024-03-23 15:53:25
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(200,200,200);
camera.lookAt(0,0,0);

const gridHelper = new THREE.GridHelper(30,25,0x004444,0x004444);
scene.add(gridHelper);


const directionalLight = new THREE.DirectionalLight(0xffffff,1);
directionalLight.position.set(100,60,50);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xffffff,0.4);
scene.add(ambientLight);


const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);

document.body.appendChild(renderer.domElement);

window.addEventListener('resize',() => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth,window.innerHeight);
});

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

const controls = new OrbitControls(camera,renderer.domElement);

const gltfLoader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/draco/');
gltfLoader.setDRACOLoader(dracoLoader);

const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array([
  100,25,0,
  100,-25,25,
  100,-25,-25
]);

const position = new THREE.BufferAttribute(vertices,3);
geometry.attributes.position = position;

const material = new THREE.MeshBasicMaterial({
  color:0x00ffff,
  side:THREE.DoubleSide,
});

const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);

const raycaster = new THREE.Raycaster();
raycaster.ray.origin.set(-100,0,0);
raycaster.ray.direction = new THREE.Vector3(1,0,0);

const result = raycaster.intersectObjects([mesh]);
if(result.length > 0) {
  result[0].object.material.color = new THREE.Color(0x00ff00)
}











function render() {
  requestAnimationFrame(render);
  renderer.render(scene,camera);
}

render();
