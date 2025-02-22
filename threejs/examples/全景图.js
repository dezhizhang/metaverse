/*
 * :file description: 
 * :name: /threejs/examples/全景图.js
 * :author:张德志
 * :copyright: (c) 2025, Xiaozhi
 * :date created: 2025-02-22 15:26:17
 * :last editor: 张德志
 * :date last edited: 2025-02-22 15:26:18
 */
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0x001111, 1);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  1,
  10000
);
camera.position.set(0,0,-1);
camera.lookAt(new THREE.Vector3(0,0,0));



const geometry = new THREE.SphereGeometry(100,50,50);
const textureLoader = new THREE.TextureLoader();
const material = new THREE.MeshBasicMaterial({
  map:textureLoader.load('/全景图.jpg'),
  side:THREE.DoubleSide
});

const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);


const axesHelper = new THREE.AxesHelper(300);
scene.add(axesHelper);

new OrbitControls(camera, renderer.domElement);

scene.add(new THREE.AxesHelper(1000));

function render() {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();
