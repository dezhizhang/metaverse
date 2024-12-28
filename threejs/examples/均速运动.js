/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author:张德志
 * :copyright: (c) 2024, Xiaozhi
 * :date created: 2024-07-27 12:32:40
 * :last editor: 张德志
 * :date last edited: 2024-12-29 05:03:14
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(202,200,200);
camera.lookAt(scene.position);


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
scene.add(new THREE.AxesHelper(100));

const geometry = new THREE.BoxGeometry(10,10,10);
geometry.translate(0,5,0);
const material = new THREE.MeshLambertMaterial({
  color:0x00ffff
});
const mesh = new THREE.Mesh(geometry,material);
mesh.position.set(-50,0,-50);
scene.add(mesh);


const v = new THREE.Vector3(10,0,10);
const clock = new THREE.Clock();

function render() {
  const spt = clock.getDelta();
  const dis = v.clone().multiplyScalar(spt);
  mesh.position.add(dis);

  renderer.render(scene,camera);
  requestAnimationFrame(render);
}

render();





