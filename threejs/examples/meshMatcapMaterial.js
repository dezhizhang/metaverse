/*
 * :file description: 
 * :name: /threejs/examples/meshMatcapMaterial.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-09 22:19:40
 * :last editor: 张德志
 * :date last edited: 2024-03-09 22:19:41
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(1,1,10);
camera.lookAt(scene.position);

scene.add(new THREE.AmbientLight(0xffffff,3));
const directionalLight = new THREE.DirectionalLight(0xffffff,3);
directionalLight.position.set(1,1,1);
scene.add(directionalLight);

const renderer = new THREE.WebGLRenderer({
  antialias:true
});
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera,renderer.domElement);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const gltfLoader = new GLTFLoader();
gltfLoader.load('/Duck.glb',(gltf) => {
  scene.add(gltf.scene);

  const duckMesh = gltf.scene.getObjectByName('LOD3spShape');
  const matcapTexture = new THREE.TextureLoader().load('/matcaps/9.jpg');
  const preMaterial = duckMesh.material;

  duckMesh.material = new THREE.MeshMatcapMaterial({
    matcap:matcapTexture,
    map:preMaterial.map,
  });

});

const draciLoader = new DRACOLoader();
draciLoader.setDecoderPath('/draco/');
gltfLoader.setDRACOLoader(draciLoader);

const rgbLoader = new RGBELoader();
rgbLoader.load('/Alex_Hart-Nature_Lab_Bones_2k.hdr',(envMap) => {
  envMap.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = envMap;
  scene.background = envMap;

});

window.addEventListener('resize',() => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth,window.innerHeight);
});

function render() {
  requestAnimationFrame(render);
  renderer.render(scene,camera);
}

render();

