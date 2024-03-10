import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(1,1,10);
camera.lookAt(scene.position);


scene.add(new THREE.AmbientLight(0xffffff,0.3));
const directionalLight = new THREE.DirectionalLight(0xffffff,3);
directionalLight.position.set(1,1,1);
scene.add(directionalLight);

// 添加点光源
const pointLight = new THREE.PointLight(0xffffff,1);
pointLight.position.set(0,3,0);
scene.add(pointLight);



const renderer = new THREE.WebGLRenderer({
  antialias:true
});
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera,renderer.domElement);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// 添加纹理
const textureLoader = new THREE.TextureLoader();
const colorTexture = textureLoader.load('/watercover/CityNewYork002_COL_VAR1_1K.png');
colorTexture.colorSpace = THREE.SRGBColorSpace;

// 设置高光贴图 
const specularTexture = textureLoader.load(
  '/watercover/CityNewYork002_GLOSS_1K.jpg'
);


const planeGeometry = new THREE.PlaneGeometry(1,1);
const planeMaterial = new THREE.MeshPhongMaterial({
  map:colorTexture,
  transparent:true,
  specularMap:specularTexture
});
const plane = new THREE.Mesh(planeGeometry,planeMaterial);
plane.rotation.x = -Math.PI / 2;
scene.add(plane);



const rgbLoader = new RGBELoader();
rgbLoader.load('/Alex_Hart-Nature_Lab_Bones_2k.hdr',(envMap) => {
  envMap.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = envMap;
  scene.background = envMap;
  plane.envMap = envMap;
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

