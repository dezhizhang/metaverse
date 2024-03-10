import * as THREE from 'three';
import Stat from 'stats.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(1,1,10);

const ambientLight = new THREE.AmbientLight(0xffffff,3);
scene.add(ambientLight);

const rgbLoader = new RGBELoader();
rgbLoader.load('/Alex_Hart-Nature_Lab_Bones_2k.hdr',(envMap) => {
  envMap.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = envMap;
  scene.background = envMap;
});

const stats = new Stat();
document.body.appendChild(stats.domElement);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const control = new OrbitControls(camera,renderer.domElement);

window.addEventListener('resize',() => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth,window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
});

function render() {
  const sphereGeometry = new THREE.SphereGeometry(2,Math.random() * 64,Math.random() * 64);
  const sphereMaterial = new THREE.MeshBasicMaterial({
    color:Math.random() * 0xfffff
  });
  const sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);
  scene.add(sphere);

  control.update();

  requestAnimationFrame(render);
  renderer.render(scene,camera);

  sphereGeometry.dispose();
  sphereMaterial.dispose();

  scene.remove(sphere);
}

render();


