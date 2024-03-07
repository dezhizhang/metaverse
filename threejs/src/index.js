import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
//创建场影
const scene = new THREE.Scene();

//创建相机
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);

// 设置相机位置
camera.position.set(1,1,10);
scene.add(camera);

const ambientLight = new THREE.AmbientLight(0xffffff,3);
scene.add(ambientLight);


const rgbLoader = new RGBELoader();
rgbLoader.load('Alex_Hart-Nature_Lab_Bones_2k.hdr',(envMap) => {
  envMap.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = envMap;
  scene.background = envMap;

})




const gltfLoader = new GLTFLoader();
gltfLoader.load('/柱子.glb',(gltf) => {
  const duckMesh = gltf.scene.getObjectByName('Scene');

  // console.log(duckMesh);

  const duckGeometry = duckMesh.geometry;


  duckGeometry.computeBoundingBox();

  const duckBox = duckGeometry.boundingBox;



  console.log('duckBox',duckBox);
})




// 初始化渲染器
const renderer = new THREE.WebGL1Renderer();

// 设置渲染器大小
renderer.setSize(window.innerWidth,window.innerHeight);

document.body.append(renderer.domElement);

const controls = new OrbitControls(camera,renderer.domElement);


function render() {
  requestAnimationFrame(render);
  renderer.render(scene,camera);
}

render();



