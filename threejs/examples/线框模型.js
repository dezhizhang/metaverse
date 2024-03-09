/*
 * :file description: 
 * :name: /threejs/examples/线框模型.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-04 22:01:21
 * :last editor: 张德志
 * :date last edited: 2024-03-09 20:46:00
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(1,1,10);
camera.lookAt(scene.position);

scene.add(new THREE.AmbientLight(0xffffff,3));
const directionalLight = new THREE.DirectionalLight(0xffffff,3);
directionalLight.position.set(1,1,1);
scene.add(directionalLight);


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera,renderer.domElement);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const gltfLoader = new GLTFLoader();
const draciLoader = new DRACOLoader();
draciLoader.setDecoderPath('/draco/');
gltfLoader.setDRACOLoader(draciLoader);

gltfLoader.load('/city.glb',(gltf) => {
  scene.add(gltf.scene);

  gltf.scene.traverse((child) => {
    if(child.isMesh) {
    
      const geometry = child.geometry;

      // 获取边缘geometry
      const edgesGeometry = new THREE.EdgesGeometry(geometry);
      const edgesMaterial = new THREE.LineBasicMaterial({
        color:0xffffff
      });
      const edges = new THREE.LineSegments(edgesGeometry,edgesMaterial);
      child.updateWorldMatrix(true,true);
      edges.matrix.copy(child.matrixWorld);
      edges.matrix.decompose(edges.position,edges.quaternion,edges.scale);
      scene.add(edges);
    }
  });
});

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

function remder() {
  requestAnimationFrame(remder);
  renderer.render(scene,camera);
}

remder();
