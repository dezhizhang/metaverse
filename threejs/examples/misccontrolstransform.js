/*
 * :file description: 
 * :name: /threejs/examples/misccontrolstransform.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-31 19:43:03
 * :last editor: 张德志
 * :date last edited: 2023-08-31 19:43:23
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let cameraPersp, cameraOrtho, currentCamera;
let scene, renderer, control, orbit;

init();
render();

function init() {
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth,window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const aspect = window.innerWidth / window.innerHeight;
  const cameraPersp = new THREE.PerspectiveCamera(50,aspect,0.01,3000);
  cameraOrtho = new THREE.OrthographicCamera(- 600 * aspect, 600 * aspect, 600, - 600, 0.01, 30000);
  currentCamera = cameraPersp;

  currentCamera.position.set(5,2.5,5);

  scene = new THREE.Scene();
  scene.add(new THREE.GridHelper(5,10,0x888888, 0x444444));

  const ambientLight = new THREE.AmbientLight(0xffffff);
  scene.add(ambientLight);

  const light = new THREE.DirectionalLight(0xffffff,4);
  light.position.set(1,1,1);
  scene.add(light);

  const url = 'https://threejs.org/examples/textures/crate.gif';
  const texture = new THREE.TextureLoader().load(url,render);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshLambertMaterial({map:texture});


  orbit = new OrbitControls(currentCamera,renderer.domElement);
  orbit.update();
  orbit.addEventListener('change',render);

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  control.attach(mesh);
  scene.add(control);

  window.addEventListener('resize', onWindowResize);



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