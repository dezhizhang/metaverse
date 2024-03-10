/*
 * :file description:
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-10 15:35:55
 * :last editor: 张德志
 * :date last edited: 2024-03-10 17:18:24
 */
import * as THREE from 'three';
import dat from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(1,1,10);
scene.add(camera);

const ambientLight = new THREE.AmbientLight(0xffffff,3);
scene.add(ambientLight);

const rgbLoader = new RGBELoader();

rgbLoader.load('/Alex_Hart-Nature_Lab_Bones_2k.hdr',(envMap) => {
  envMap.mapping = THREE.EquirectangularRefractionMapping;
  scene.environment = envMap;
  scene.background = envMap;
});

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const textureLoader = new THREE.TextureLoader();
const sheenColorMap = textureLoader.load('/colors.png');

const sphereGeometry = new THREE.SphereGeometry(1,32,32);

const sphereMaterial = new THREE.MeshPhysicalMaterial({
  color:0xffffff,
  roughness:0.05,
  transmission:1,
  thickness:0.1,
  iridescence:1,
  reflectivity:1,
  iridescenceThicknessRange:[200,600],
  iridescenceThicknessMap:sheenColorMap,
})

const sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);
scene.add(sphere);


const gui = new dat.GUI();
gui.add(sphereMaterial,'iridescence',0,1).name('彩虹色');
gui.add(sphereMaterial,'reflectivity',0,1).name('反射痃');



const controls = new OrbitControls(camera,renderer.domElement);
window.addEventListener('resize',() => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth,window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
});

function render() {
  requestAnimationFrame(render);
  renderer.render(scene,camera);
}

render();

