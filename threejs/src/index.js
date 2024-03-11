 import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(2,10,2);

const renderer = new THREE.WebGL1Renderer({
  antialias:true
});
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.toneMapping = THREE.ACESFilmicToneMapping;

document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera,renderer.domElement);

const ktx2loader = new KTX2Loader();
ktx2loader.setTranscoderPath('/basis/').detectSupport(renderer);

ktx2loader.load('/ktx2/Alex_Hart-Nature_Lab_Bones_2k_etc1s-nomip.ktx2',(envMap) => {
  scene.environment = envMap;
  scene.background = envMap;
});

window.addEventListener('resize',() => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth,window.innerHeight);
});

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('/brick/brick_diffuse.jpg');

const planeGeometry = new THREE.PlaneGeometry(1,1,64,64);
const planeMaterial = new THREE.MeshBasicMaterial({
  side:THREE.DoubleSide,
  map:texture,
  transparent:true
});

const plane = new THREE.Mesh(planeGeometry,planeMaterial);
scene.add(plane);

texture.colorSpace = THREE.SRGBColorSpace;
texture.magFilter = THREE.LinearFilter;

texture.anisotropy = 4;

function render() {
  requestAnimationFrame(render);
  renderer.render(scene,camera);
}

render();





