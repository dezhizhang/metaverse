/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author:张德志
 * :copyright: (c) 2024, Xiaozhi
 * :date created: 2024-07-27 12:32:40
 * :last editor: 张德志
 * :date last edited: 2024-12-29 06:17:47
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


const p1 = new THREE.Vector3(0,0,0);
const p2 = new THREE.Vector3(20,0,0);
const p3 = new THREE.Vector3(10,10,0);


const a = p3.clone().sub(p1);
const b = p2.clone().sub(p1);


const cos = a.normalize().dot(b.normalize());
const rad = Math.acos(cos);

const angle = THREE.MathUtils.radToDeg(rad);
console.log('angle',angle);



function render() {

  renderer.render(scene,camera);
  requestAnimationFrame(render);
}

render();





