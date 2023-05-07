/*
 * :file description:
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2023-05-08 04:39:09
 */
import * as THREE from "three";

import {RoomEnvironment} from 'three/examples/jsm/environments/RoomEnvironment.js'

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";

let camera, scene, renderer;

init();
render();

function init() {
  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth,window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  document.body.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,1,2000);
  camera.position.set(0,100,0);
  const environment = new RoomEnvironment();
  const pmremGenerator = new THREE.PMREMGenerator(renderer);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xbbbbbb);
  scene.environment = pmremGenerator.fromScene(environment).texture;
  environment.dispose();

  const grid = new THREE.GridHelper(500,10,0xffffff,0xffffff);
  grid.material.opacity = 0.5;
  grid.material.depthWrite = false;
  grid.material.transparent = true;
  scene.add(grid);

  const ktx2Loader = new KTX2Loader()
    .setTranscoderPath('https://threejs.org/examples/jsm/libs/basis/')
    .detectSupport(renderer);

    const loader = new GLTFLoader();
    loader.setKTX2Loader(ktx2Loader);
    loader.setMeshoptDecoder(MeshoptDecoder);
    loader.load('https://threejs.org/examples/models/gltf/coffeemat.glb',function(gltf) {
      gltf.scene.position.y = 8;
      scene.add(gltf.scene);
      render();
    });

  const controls = new OrbitControls(camera,renderer.domElement);
  controls.addEventListener('change',render);
  controls.minDistance = 400;
  controls.maxDistance = 1000;
  controls.target.set(10,90,-16);
  controls.update();

  window.addEventListener('resize',onWindowResize);  
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

  render();
}

//

function render() {
  renderer.render(scene, camera);
}
