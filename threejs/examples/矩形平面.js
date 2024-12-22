/*
 * :file description: 
 * :name: /threejs/examples/矩形平面.js
 * :author:张德志
 * :copyright: (c) 2024, Xiaozhi
 * :date created: 2024-12-22 16:22:11
 * :last editor: 张德志
 * :date last edited: 2024-12-22 16:22:12
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(30,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(200,200,200);
camera.lookAt(scene.position);

const renderer = new THREE.WebGLRenderer({
  antialias:true,
});
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array([
  0,0,0,
  80,0,0,
  80,80,0,

  0,0,0,
  80,80,0,
  0,80,0,
]);


const attribute = new THREE.BufferAttribute(vertices,3);
geometry.attributes.position = attribute;

const material = new THREE.MeshBasicMaterial({
  color:0x00ffff,
  side:THREE.DoubleSide,
});

const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);

scene.add(new THREE.AxesHelper(100));

const controls = new OrbitControls(camera,renderer.domElement);


function render() {
  renderer.render(scene,camera);
  requestAnimationFrame(render);
}

render();

document.body.appendChild(renderer.domElement);




