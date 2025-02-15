/*
 * :file description:
 * :name: /virtual-world/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-26 06:15:04
 * :last editor: 张德志
 * :date last edited: 2025-02-15 21:30:57
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { lon2xyz } from './utils';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(200, 200, 200);
camera.lookAt(scene.position);


const geometry = new THREE.PlaneGeometry(200,160);
const textureLoader = new THREE.TextureLoader();
const material = new THREE.MeshBasicMaterial({
  map:textureLoader.load('/light.png'),
  color:0x44ffaa,
  transparent:true,
  depthWrite:false,
  side:THREE.DoubleSide
});

const mesh = new THREE.Mesh(geometry,material);
const group = new THREE.Group();

group.add(mesh,mesh.clone().rotateY(Math.PI/2));
scene.add(group);


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);


new OrbitControls(camera,renderer.domElement);


const axesHelper = new THREE.AxesHelper(1000);
scene.add(axesHelper);

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
