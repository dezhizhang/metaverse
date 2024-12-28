/*
 * :file description: 
 * :name: /threejs/examples/法向量.js
 * :author:张德志
 * :copyright: (c) 2024, Xiaozhi
 * :date created: 2024-12-28 08:14:26
 * :last editor: 张德志
 * :date last edited: 2024-12-28 08:14:27
 */
import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(202,200,200);
camera.lookAt(scene.position);


const A = new THREE.Vector3(0,30,0);
const B = new THREE.Vector3(80,0,0);

const aMesh = createSphereMesh(0x00ff00,5);
aMesh.position.copy(A);
scene.add(aMesh);

const bMesh = createSphereMesh(0xff0000,5);
bMesh.position.copy(B);
scene.add(bMesh);


const AB = B.clone().sub(A);
const L = AB.length();

const dir = AB.clone().normalize();

const arrowHelper = new THREE.ArrowHelper(dir,A,L);
scene.add(arrowHelper);

function createSphereMesh(color,R) {
  const geometry = new THREE.SphereGeometry(R);
  const material = new THREE.MeshBasicMaterial({
    color:color
  });
  const mesh = new THREE.Mesh(geometry,material);
  return mesh;
}

const renderer = new THREE.WebGLRenderer({
  antialias:true,
  logarithmicDepthBuffer:true,
});

renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);



window.addEventListener('resize',() => {
  camera.aspect = window.innerWidth / window.innerHeight;
  renderer.setSize(window.innerWidth,window.innerHeight);
  camera.updateProjectionMatrix();
});


scene.add(new THREE.AmbientLight(0xffffff));

new OrbitControls(camera,renderer.domElement);

function render() {
  TWEEN.update();
  renderer.render(scene,camera);
  requestAnimationFrame(render)
}

render();



