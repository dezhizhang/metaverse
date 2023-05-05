/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2023-05-06 07:53:09
 */

import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass.js';
import { BloomPass } from 'three/examples/jsm/postprocessing/BloomPass.js';

let camera, renderer, composer, clock;

let uniforms, mesh;

init();
animate();

function init() {

  const container = document.getElementById('container');

  camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 3000);
  camera.position.z = 4;

  const scene = new THREE.Scene();

  clock = new THREE.Clock();

  const textureLoader = new THREE.TextureLoader();

  uniforms = {

    'fogDensity': { value: 0.45 },
    'fogColor': { value: new THREE.Vector3(0, 0, 0) },
    'time': { value: 1.0 },
    'uvScale': { value: new THREE.Vector2(3.0, 1.0) },
    'texture1': { value: textureLoader.load('https://threejs.org/examples/textures/lava/cloud.png') },
    'texture2': { value: textureLoader.load('https://threejs.org/examples/textures/lava/lavatile.jpg') }

  };

  uniforms['texture1'].value.wrapS = uniforms['texture1'].value.wrapT = THREE.RepeatWrapping;
  uniforms['texture2'].value.wrapS = uniforms['texture2'].value.wrapT = THREE.RepeatWrapping;

  const size = 0.65;

  const material = new THREE.ShaderMaterial({

    uniforms: uniforms,
    vertexShader: document.getElementById('vertexShader').textContent,
    fragmentShader: document.getElementById('fragmentShader').textContent

  });

  mesh = new THREE.Mesh(new THREE.TorusGeometry(size, 0.3, 30, 30), material);
  mesh.rotation.x = 0.3;
  scene.add(mesh);

  //

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);
  renderer.autoClear = false;


  //

  const renderModel = new RenderPass(scene, camera);
  const effectBloom = new BloomPass(1.25);
  const effectFilm = new FilmPass(0.35, 0.95, 2048, false);

  composer = new EffectComposer(renderer);

  composer.addPass(renderModel);
  composer.addPass(effectBloom);
  composer.addPass(effectFilm);

  //

  onWindowResize();

  window.addEventListener('resize', onWindowResize);

}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);

}

//

function animate() {

  requestAnimationFrame(animate);

  render();

}

function render() {

  const delta = 5 * clock.getDelta();

  uniforms['time'].value += 0.2 * delta;

  mesh.rotation.y += 0.0125 * delta;
  mesh.rotation.x += 0.05 * delta;

  renderer.clear();
  composer.render(0.01);

}