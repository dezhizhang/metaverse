import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let camera,scene,renderer;
let textureEquirec,textureCube;
let sphereMesh,sphereMaterial;

init();
animate();

function init() {
  camera = new THREE.PerspectiveCamera(70,window.innerWidth / window.innerHeight,0.1,1000);
  camera.position.set(0,0,2.5);

  scene = new THREE.Scene();

  // Textures
  const loader = new THREE.CubeTextureLoader();
  loader.setPath('https://threejs.org/examples/textures/cube/Bridge2/');
  textureCube = loader.load([
    'posx.jpg',
    'negx.jpg',
    'posy.jpg',
    'negy.jpg',
    'posz.jpg',
    'negz.jpg',
  ]);

  const textureLoader = new THREE.TextureLoader();
  textureEquirec = textureLoader.load('https://threejs.org/examples/textures/2294472375_24a3b8ef46_o.jpg');
  textureEquirec.mapping = THREE.EquirectangularReflectionMapping;
  textureEquirec.colorSpace = THREE.SRGBColorSpace;

  scene.background = textureCube;

  const geometry = new THREE.IcosahedronGeometry(1,15);
  sphereMaterial = new THREE.MeshBasicMaterial({envMap:textureCube});
  sphereMesh = new THREE.Mesh(geometry,sphereMaterial);
  scene.add(sphereMesh);

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth,window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera,renderer.domElement);
  controls.minDistance = 1.5;
  controls.maxDistance = 6;

  window.addEventListener('resize',onWindowResize);
  

}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth,window.innerHeight);
}


function animate() {
  requestAnimationFrame(render);
  render();
}

function render() {
  camera.lookAt(scene.position);
  renderer.render(scene,camera);
}
