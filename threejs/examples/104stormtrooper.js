import * as THREE from "three";

import Stats from "stats.js";

import { ColladaLoader } from "three/examples/jsm/loaders/ColladaLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

let stats, clock, controls;
let camera, scene, renderer, mixer;

init();
animate();

function init() {
  camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight,1,1000);
  camera.position.set(15,10,-15);
  scene = new THREE.Scene();
  clock = new THREE.Clock();

  const loader = new  ColladaLoader();
  loader.load('https://threejs.org/examples/models/collada/stormtrooper/stormtrooper.dae',function(collada) {
    const avatar = collada.scene;
    const animations = avatar.animations;

    mixer = new THREE.AnimationMixer(avatar);
    mixer.clipAction(animations[0]).play();
    scene.add(avatar);
  });

  const gridHelper = new THREE.GridHelper(10,20,0xc1c1c1, 0x8d8d8d);
  scene.add(gridHelper);

  const ambientLight = new THREE.AmbientLight(0xffffff,0.8);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff,0.8);
  scene.add(camera);
  camera.add(pointLight);

  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth,window.innerHeight);
  document.body.appendChild(renderer.domElement);

  controls = new OrbitControls(camera,renderer.domElement);
  controls.screenSpacePanning = true;
  controls.minDistance = 5;
  controls.maxDistance = 40;
  controls.target.set(0,2,0);
  controls.update();

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
  if(mixer !== undefined) {
    mixer.update(delta);
  }

  renderer.render(scene,camera);
}
