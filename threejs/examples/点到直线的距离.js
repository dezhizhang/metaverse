/*
 * :file description: 
 * :name: /threejs/examples/点到直线的距离.js
 * :author:张德志
 * :copyright: (c) 2024, Xiaozhi
 * :date created: 2024-12-29 11:28:30
 * :last editor: 张德志
 * :date last edited: 2024-12-29 11:28:31
 */
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(200, 200, 200);
camera.lookAt(scene.position);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

scene.add(new THREE.AxesHelper(100));
scene.add(new THREE.AmbientLight(0xffffff));

const A = new THREE.Vector3(0,0,0);
const B = new THREE.Vector3(100,0,0);

const p = new THREE.Vector3(50,0,30);


function createSphereMesh(R,color) {
  const geometry = new THREE.SphereGeometry(R);
  const material = new THREE.MeshBasicMaterial({
    color
  });
  return new THREE.Mesh(geometry,material);
}

const group = new THREE.Group();
const Amesh = createSphereMesh(2,0xffff00);
Amesh.position.copy(A);

const Bmesh = createSphereMesh(2,0xffff00);
Bmesh.position.copy(B);

const pMesh = createSphereMesh(2,0xffff00);
pMesh.position.copy(p);
group.add(Amesh,Bmesh,pMesh);
scene.add(group);


// 构建A和B边
const a = A.clone().sub(p);
const b = B.clone().sub(p);

const c = a.clone().cross(b);

const s = 0.5 * c.length();
const AB = B.clone().sub(A);
const width = AB.length();

const h = s / width * 2;
console.log('h',h);



window.addEventListener('resize',() => {
  renderer.setSize(window.innerWidth,window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

});


function render() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();
