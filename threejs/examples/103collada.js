import * as THREE from 'three';
import Stats from 'stats.js';
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader.js';

let stats, clock;
let camera, scene, renderer, elf;

init();
animate();

function init() {
  camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,2000);
  camera.position.set(8,10,8);
  camera.lookAt(0,3,0);

  scene = new THREE.Scene();
  clock = new THREE.Clock();

  const loadingManager = new THREE.LoadingManager(function() {
    scene.add(elf);
  });

  const loader = new ColladaLoader(loadingManager);
  loader.load('https://threejs.org/examples/models/collada/elf/elf.dae',function(collada) {
    elf = collada.scene;
  });

  const ambientLight = new THREE.AmbientLight(0xcccccc,0.4);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff,0.8);
  directionalLight.position.set(1,1,0).normalize();
  scene.add(directionalLight);

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth,window.innerHeight);
  document.body.appendChild(renderer.domElement);

  stats = new Stats();
  document.body.appendChild(stats.dom);

  window.addEventListener('resize',onWindowResize);


}


function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

}

function animate() {

  requestAnimationFrame(animate);

  render();
  stats.update();

}

function render() {
  const delta = clock.getDelta();
  if(elf !== undefined) {
    elf.rotation.z += delta * 0.5;
  }
  renderer.render(scene,camera);
}
