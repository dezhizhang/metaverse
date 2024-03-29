/*
 * :file description: 
 * :name: /threejs/examples/css2DRenderer.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-30 06:13:31
 * :last editor: 张德志
 * :date last edited: 2024-03-30 06:13:32
 */
import * as THREE from 'three';
import { CSS2DObject, CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const width = window.innerWidth;
const height = window.innerHeight;

const k = width / height;
const s = 1.5;

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.set(20, 20, 20);
camera.lookAt(0, 0, 0);

const directionalLight = new THREE.DirectionalLight(0xffffff,1);
directionalLight.position.set(100 * 2,60 * 2,50 * 2);
directionalLight.castShadow = true;
scene.add(directionalLight);


const ambientLight = new THREE.AmbientLight(0xffffff,1);
scene.add(ambientLight);

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


const group = new THREE.Group();

const geometry = new THREE.BoxGeometry(10,10,10);
const material = new THREE.MeshBasicMaterial({
  color:0x00ff00
});

const mesh = new THREE.Mesh(geometry,material);
group.add(mesh);

const div = document.getElementById('tag');
const tag = new CSS2DObject(div);
tag.position.set(50,0,50);
group.add(tag);


const css2DRenderer = new CSS2DRenderer();
css2DRenderer.domElement.style.position = 'absolute';
css2DRenderer.domElement.style.top = '0px';
css2DRenderer.setSize(window.innerWidth,window.innerHeight);
// css2DRenderer.setPixelRatio(window.devicePixelRatio);
css2DRenderer.domElement.style.pointerEvents = 'none';
document.body.appendChild(css2DRenderer.domElement);

scene.add(group)



window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function render() {
  
  css2DRenderer.render(scene,camera);
  renderer.render(scene, camera);
  requestAnimationFrame(render);
 
}

render();
