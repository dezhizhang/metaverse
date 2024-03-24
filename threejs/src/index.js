/*
 * :file description:
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-13 22:44:48
 * :last editor: 张德志
 * :date last edited: 2024-03-24 14:32:01
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(200, 200, 200);
camera.lookAt(0, 0, 0);

const gridHelper = new THREE.GridHelper(30, 25, 0x004444, 0x004444);
scene.add(gridHelper);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(100, 60, 50);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

const controls = new OrbitControls(camera, renderer.domElement);

const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array([0, 0, 0, 160, 0, 0, 160, 80, 0, 0, 80, 0]);

const attribute = new THREE.BufferAttribute(vertices, 3);

geometry.attributes.position = attribute;

const indexs = new Uint16Array([0, 1, 2, 0, 2, 3]);

const uvs = new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]);

geometry.index = new THREE.BufferAttribute(indexs, 1);
geometry.attributes.uv = new THREE.BufferAttribute(uvs, 2);

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('/earth.png');

const material = new THREE.MeshBasicMaterial({
  map: texture,
  side: THREE.DoubleSide,
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
