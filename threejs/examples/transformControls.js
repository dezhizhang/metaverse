/*
 * :file description: 
 * :name: /threejs/examples/transformControls.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-02-19 20:34:29
 * :last editor: 张德志
 * :date last edited: 2024-02-19 20:34:30
 */
import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';


let cameraPersp, cameraOrtho, currentCamera;
let scene, renderer, control, orbit;

init();
render();

function init() {
  renderer = new THREE.WebGLRenderer({
    antialias:true
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth,window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const aspect = window.innerWidth / window.innerHeight;
  cameraPersp = new THREE.PerspectiveCamera(50,aspect,0.01,30000);
  cameraOrtho = new THREE.OrthographicCamera(-600 * aspect,600 * aspect,600,-600,0.01,30000);
  currentCamera = cameraPersp;
  currentCamera.position.set(5, 2.5, 5);

  scene = new THREE.Scene();
  scene.add(new THREE.GridHelper(5,10,0x888888,0x444444));

  const ambientLight = new THREE.AmbientLight(0xffffff);
  scene.add(ambientLight);

  const light = new THREE.DirectionalLight(0xffffff,4);
  light.position.set(1,1,1);
  scene.add(light);

  const texture = new THREE.TextureLoader().load('https://threejs.org/examples/textures/crate.gif',render);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshLambertMaterial({map: texture});

  orbit = new OrbitControls(currentCamera,renderer.domElement);
  orbit.update();
  orbit.addEventListener('change',render);


  control = new TransformControls(currentCamera,renderer.domElement);
  control.addEventListener('change',render);
  control.addEventListener('dragging-changed',function(event) {
    orbit.enabled = !event.value;
  });

  const mesh = new THREE.Mesh(geometry,material);
  scene.add(mesh);

  control.attach(mesh);
  scene.add(control);

  window.addEventListener('resize',onWindowResize);

}



function onWindowResize() {
  const aspect = window.innerWidth / window.innerHeight;

  cameraPersp.aspect = aspect;
  cameraPersp.updateProjectionMatrix();

  cameraOrtho.left = cameraOrtho.bottom * aspect;
  cameraOrtho.right = cameraOrtho.top * aspect;
  cameraOrtho.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

  render();
}

function render() {
  renderer.render(scene, currentCamera);
}
