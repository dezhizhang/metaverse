/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-13 22:44:48
 * :last editor: 张德志
 * :date last edited: 2024-03-21 07:23:53
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(202,123,125);
camera.lookAt(0,0,0);

const geometry = new THREE.BoxGeometry(10,10,10);
const material = new THREE.MeshBasicMaterial({
  color:0x00ffff,
});
const mesh = new THREE.Mesh(geometry,material);
// mesh.position.set(-50,0,-50);

scene.add(mesh);

const p = mesh.geometry.attributes.position; // 顶点位置
const n = mesh.geometry.attributes.normal; // 顶点法线

for(let i=0;i < p.count;i++) {
  const m = new THREE.Vector3(p.getX(i),p.getY(i),p.getZ(i));
  const dir = new THREE.Vector3(n.getX(i),n.getY(i),n.getZ(i));
  
  const arrowHelper = new THREE.ArrowHelper(dir,m,10);
  mesh.add(arrowHelper);
}

const renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

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


const ambientLight = new THREE.AmbientLight(0xfffff,3);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff,3);
scene.add(directionalLight);



const model = new THREE.Group();

const gltfLoader = new GLTFLoader();
const person = new THREE.Group();
model.add(person);

gltfLoader.load('/人.glb',(gltf) => {
  console.log(gltf)
  person.add(gltf.scene);
});

person.position.set(0,0,2);
mesh.position.set(2,0,-3);

// const a = new THREE.Vector3(0,0,-1);

// const R = 20;
// const angle = 1;

// const b = mesh.position.clone().sub(person.position);

// const L = b.length();

// const cos = a.dot(b.normalize());

// const rad = THREE.MathUtils.degToRad(angle);

// const rangeCos = Math.cos(rad / 2);

// if(L < R) {
//   if(cos > rangeCos) {
//     console.log('物体在内');
//   }else {
//     console.log('物体在外')
//   }
// }



function render() {

  requestAnimationFrame(render);
  renderer.render(scene,camera)
}

render();



