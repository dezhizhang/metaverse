/*
 * :file description: 
 * :name: /threejs/examples/地形渐变.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-29 07:22:09
 * :last editor: 张德志
 * :date last edited: 2024-03-29 07:22:10
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
camera.position.set(550, 550, 550);
camera.lookAt(0, 0, 0);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(100, 60, 50);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);


const dracoLoader = new DRACOLoader();
const gltfLoader = new GLTFLoader
dracoLoader.setDecoderPath('/draco/');
gltfLoader.setDRACOLoader(dracoLoader);

gltfLoader.load('/地形.glb',(gltf) => {
  scene.add(gltf.scene);
  const mesh = gltf.scene.children[0];

  const position = mesh.geometry.attributes.position;

  const count = position.count;

  const yArr = [];

  for(let i=0;i < count;i++) {
    yArr.push(position.getY(i));
  }

  yArr.sort();

  const minY = yArr[0];
  const maxY = yArr[yArr.length - 1];

  const height = maxY - minY;

  const colorsArr = [];
  const c1 = new THREE.Color(0x0000ff);
  const c2 = new THREE.Color(0xff0000);

  for(let i=0;i < count;i++) {
    const percent = (position.getY(i) - minY) / height;
    const c = c1.clone().lerp(c2,percent);
    colorsArr.push(c.r,c.g,c.b);
  }

  const colors = new Float32Array(colorsArr);
  mesh.geometry.attributes.color = new THREE.BufferAttribute(colors,3);
  mesh.material = new THREE.MeshLambertMaterial({
    vertexColors:true,
    side:THREE.DoubleSide
  });
  

})


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
