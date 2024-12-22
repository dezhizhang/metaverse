/*
 * :file description: 
 * :name: /threejs/examples/uv贴图2.js
 * :author:张德志
 * :copyright: (c) 2024, Xiaozhi
 * :date created: 2024-12-23 06:24:44
 * :last editor: 张德志
 * :date last edited: 2024-12-23 06:24:45
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(200,200,200);
camera.lookAt(scene.position);


const renderer = new THREE.WebGLRenderer({
  antialias:true
});
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);


scene.add(new THREE.AxesHelper(100));


scene.add(new THREE.AmbientLight(0xffffff));



const geometry = new THREE.BufferGeometry();

const vertices = new Float32Array([
  0,0,0,
  160,0,0,
  160,80,0,
  0,80,0,
]);

const attribute = new THREE.BufferAttribute(vertices,3);
geometry.attributes.position = attribute;

const indexes = new Uint16Array([
  0,1,2,
  0,2,3,
]);

const uvs = new Float32Array([
  0,0,
  1,0,
  1,1,
  0,1
]);

const loader = new THREE.TextureLoader();
const texture = loader.load('/earth.png');

geometry.attributes.uv = new THREE.BufferAttribute(uvs,2);

geometry.index = new THREE.BufferAttribute(indexes,1);

const material = new THREE.MeshLambertMaterial({
  color:0x00ff00,
  map:texture,
});

const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);


const controls = new OrbitControls(camera,renderer.domElement);


function render() {
  controls.update();
  renderer.render(scene,camera);
  requestAnimationFrame(render);
}

render();


document.body.appendChild(renderer.domElement);

