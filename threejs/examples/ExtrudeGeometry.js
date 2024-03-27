/*
 * :file description: 
 * :name: /threejs/examples/ExtrudeGeometry.JS
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-28 05:45:04
 * :last editor: 张德志
 * :date last edited: 2024-03-28 06:22:39
 */
/*
 * :file description:
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-13 22:44:48
 * :last editor: 张德志
 * :date last edited: 2024-03-28 05:41:52
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const width = window.innerWidth;
const height = window.innerHeight;

const k = width / height;
const s = 600;

const camera = new THREE.OrthographicCamera(-s * k,s * k,s,-s,1,8000);
camera.position.set(0,2000,0);
camera.lookAt(0,0,0);


// const gridHelper = new THREE.GridHelper(30, 25, 0x004444, 0x004444);
// scene.add(gridHelper);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(100, 60, 50);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const renderer = new THREE.WebGLRenderer();
// renderer.outputEncoding = THREE.sRGBEncoding;
// renderer.outputEncoding = THREE.sea
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);


const shape = new THREE.Shape([
  new THREE.Vector2(-50,-50),
  new THREE.Vector2(-50,50),
  new THREE.Vector2(50,50),
  new THREE.Vector2(50,-50)
]);
const geometry = new THREE.ExtrudeGeometry([shape],{
  depth:20
});
const material = new THREE.MeshLambertMaterial({
  color:0x00ffff

})
const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);



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

function render() {
  requestAnimationFrame(render);

  renderer.render(scene, camera);
}

render();
