/*
 * :file description: 
 * :name: /threejs/examples/101.Glitch.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2023-05-07 15:12:13
 */

import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js';

THREE.ColorManagement.enabled = false; // TODO: Consider enabling color management.

let camera, scene, renderer, composer;
let object, light;

let glitchPass;

init();
animate();


function updateOptions() {

  const wildGlitch = document.getElementById('wildGlitch');
  glitchPass.goWild = wildGlitch.checked;

}

function init() {
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth,window.innerHeight);
  document.body.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(70,window.innerWidth / window.innerHeight,1,1000);
  camera.position.z = 400;

  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x000000,1,1000);
  
  object = new THREE.Object3D();
  scene.add(object);

  const geometry = new THREE.SphereGeometry(1,4,4);
  for(let i=0;i < 100;i++) {
    const material = new THREE.MeshPhongMaterial( { color: 0xffffff * Math.random(), flatShading: true } );

    const mesh = new THREE.Mesh( geometry, material );
    mesh.position.set( Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5 ).normalize();
    mesh.position.multiplyScalar( Math.random() * 400 );
    mesh.rotation.set( Math.random() * 2, Math.random() * 2, Math.random() * 2 );
    mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 50;
    object.add( mesh );
  }

  scene.add(new THREE.AmbientLight(0x222222));
  
  light = new THREE.DirectionalLight(0xffffff);
  light.position.set(1,1,1);
  scene.add(light);
  
  // postprocessing
  composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene,camera));

  glitchPass = new GlitchPass();
  composer.addPass(glitchPass);

  window.addEventListener('resize',onWindowResize);
  const wildGlitchOption = document.getElementById('wildGlitch');
  wildGlitchOption.addEventListener('change',updateOptions);

  updateOptions();

}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth,window.innerHeight);
    composer.setSize(window.innerWidth,window.innerHeight);
}



function animate() {
  requestAnimationFrame(animate);
  object.rotation.x += 0.005;
  object.rotation.y += 0.01;
  composer.render();
 
}