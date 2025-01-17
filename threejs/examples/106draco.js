/*
 * :file description: 
 * :name: /threejs/examples/106draco.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-05-07 17:28:10
 * :last editor: 张德志
 * :date last edited: 2023-05-07 18:06:20
 */
import * as THREE from 'three';

import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

let camera, scene, renderer;


// Configure and create Draco decoder.
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('https://threejs.org/examples/jsm/libs/draco/');
dracoLoader.setDecoderConfig({ type: 'js' });

init();
animate();

function init() {
  camera = new THREE.PerspectiveCamera(35,window.innerWidth / window.innerHeight,0.1,1000);
  camera.position.set(3,0.25,3);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x443333);
  scene.fog = new THREE.Fog(0x443333,1,4);

  //Ground
  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(8,8),
    new THREE.MeshPhongMaterial({color:0xcbcbcb,specular:0x101010})
  );
  plane.rotation.x = -Math.PI / 2;
  plane.position.y = 0.03;
  plane.receiveShadow = true;
  scene.add(plane);

  // lights
  const hemiLight = new THREE.HemisphereLight(0x8d7c7c,0x494966);
  scene.add(hemiLight);

  const spotLight = new THREE.SpotLight();
  spotLight.angle = Math.PI / 16;
  spotLight.penumbra = 0.5;
  spotLight.castShadow = true;
  spotLight.position.set(-1,1,1);
  scene.add(spotLight);

  dracoLoader.load('https://threejs.org/examples/models/draco/bunny.drc',function(geometry) {
    geometry.computeVertexNormals();
    const material = new THREE.MeshStandardMaterial({color:0xa5a5a5});
    const mesh = new THREE.Mesh(geometry,material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);

    dracoLoader.dispose();

  });

  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth,window.innerHeight);
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);
  window.addEventListener('resize',onWindowResize)



}


function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

}

function animate() {

  render();
  requestAnimationFrame(animate);

}

function render() {

  const timer = Date.now() * 0.0003;

  camera.position.x = Math.sin(timer) * 0.5;
  camera.position.z = Math.cos(timer) * 0.5;
  camera.lookAt(0, 0.1, 0);

  renderer.render(scene, camera);

}