/*
 * :file description: 
 * :name: /threejs/examples/118gcode.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-05-11 23:03:02
 * :last editor: 张德志
 * :date last edited: 2023-05-11 23:03:35
 */
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {GCodeLoader} from 'three/examples/jsm/loaders/GCodeLoader.js';

let camera,scene,renderer;

init();

function init() {
  camera = new THREE.PerspectiveCamera(60,window.innerWidth / window.innerHeight,1,1000);
  camera.position.set(0,0,70);

  scene = new THREE.Scene();

  const loader = new GCodeLoader();
  loader.load('https://threejs.org/examples/models/gcode/benchy.gcode',function(object) {
    object.position.set(-100,-20,100);
    scene.add(object);
    render();
  });

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth,window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera,renderer.domElement);
  controls.addEventListener('change',render);
  controls.minDistance = 10;
  controls.maxDistance = 100;

  window.addEventListener('resize',resize);

}

function resize() {
  camera.aspect / window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth,window.innerHeight);
  render();
}

function render() {
  renderer.render(scene,camera);
}
