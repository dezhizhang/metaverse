/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-13 22:44:48
 * :last editor: 张德志
 * :date last edited: 2024-03-22 07:17:48
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(125,200,100);
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


// const gltfLoader = new GLTFLoader();
// const dracoLoader = new DRACOLoader();
// dracoLoader.setDecoderPath('/draco/');
// gltfLoader.setDRACOLoader(dracoLoader);

// gltfLoader.load('/fly.glb',(gltf) => {
//   const fly = gltf.scene;
//   fly.position.set(10,10,0);

//   const axesHelper = new THREE.AxesHelper(10);
//   fly.add(axesHelper);

//   const euler = new THREE.Euler();
//   euler.x = Math.PI / 3;
//   euler.y = Math.PI / 3;

//   fly.rotation.copy(euler);
  

  
//   scene.add(fly);
// })

const A = new THREE.Vector3(30,0,0);
// const group = new THREE.Group();

const mesh = createMesh(0xfff00,2);
mesh.position.copy(A);
scene.add(mesh);


function createMesh(color,R) {
  const geometry = new THREE.SphereGeometry(R);
  const material = new THREE.MeshLambertMaterial({
    color:color
  });
  const mesh = new THREE.Mesh(geometry,material);
  return mesh;

}

const quaternion = new THREE.Quaternion();

quaternion.setFromAxisAngle(new THREE.Vector3(0,0,1),Math.PI / 6);

const b = A.clone().applyQuaternion(quaternion);

mesh.position.copy(b);



console.log(quaternion);








function render() {
  requestAnimationFrame(render);
  renderer.render(scene,camera);
}

render();
