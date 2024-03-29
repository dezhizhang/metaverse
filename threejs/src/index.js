/*
 * :file description:
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-13 22:44:48
 * :last editor: 张德志
 * :date last edited: 2024-03-29 21:50:49
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const scene = new THREE.Scene();

const width = window.innerWidth;
const height = window.innerHeight;

const k = width / height;
const s = 1.5;

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.set(200, 200, 200);
camera.lookAt(0, 0, 0);

const directionalLight = new THREE.DirectionalLight(0xffffff,1);
directionalLight.position.set(100 * 2,60 * 2,50 * 2);
directionalLight.castShadow = true;
scene.add(directionalLight);

directionalLight.shadow.camera.left = -100;
directionalLight.shadow.camera.right = 100
directionalLight.shadow.camera.top = 100;
directionalLight.shadow.camera.bottom = -100;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 600;

const ambientLight = new THREE.AmbientLight(0xffffff,1);
scene.add(ambientLight);

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);


const dracoLoader = new DRACOLoader();
const gltfLoader = new GLTFLoader
dracoLoader.setDecoderPath('/draco/');
gltfLoader.setDRACOLoader(dracoLoader);

const geometry = new THREE.BoxGeometry(50,100,50);
const material = new THREE.MeshLambertMaterial({
  color:0x00ffff
});
const mesh = new THREE.Mesh(geometry,material);
mesh.position.y = 50;
mesh.castShadow = true;
scene.add(mesh);


const planeGeometry = new THREE.PlaneGeometry(400,800);
const planeMaterial = new THREE.MeshLambertMaterial({
  color:0xcccccc,
  side:THREE.DoubleSide
});
const plane = new THREE.Mesh(planeGeometry,planeMaterial);
plane.receiveShadow = true;
plane.rotateX(Math.PI / 2);

scene.add(plane);

for(let i=-3;i < 4;i++) {
  const mesh2 = mesh.clone();
  mesh2.castShadow = true;
  mesh2.position.z = 100 * i;
  scene.add(mesh2);
}



const cameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
scene.add(cameraHelper);



document.body.appendChild(renderer.domElement);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
