/*
 * :file description:
 * :name: /threejs/examples/130CSS2DRenderer.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2023-06-10 20:39:42
 */
import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/examples/jsm/renderers/CSS2DRenderer.js";

import * as dat from "dat.gui";

let gui;

let camera, scene, renderer, labelRenderer;

const layers = {
  "Toggle Name": function () {
    camera.layers.toggle(0);
  },
  "Toggle Mass": function () {
    camera.layers.toggle(1);
  },
  "Enable All": function () {
    camera.layers.enableAll();
  },

  "Disable All": function () {
    camera.layers.disableAll();
  },
};

const clock = new THREE.Clock();
const textureLoader = new THREE.TextureLoader();

let moon;

init();
animate();

function init() {
  const EARTH_RADIUS = 1;
  const MOON_RADIUS = 0.27;

  camera = new THREE.PerspectiveCamera(
    45,window.innerWidth / window.innerHeight,0.1,1000
  );
  camera.position.set(10,5,20);
  camera.layers.enableAll();
  
  scene = new THREE.Scene();

  // 设置平行光
  const dirLight = new THREE.DirectionalLight(0xffffff,1);
  dirLight.position.set(0,0,1);
  dirLight.layers.enableAll();
  scene.add(dirLight);
  
  const axesHelper = new THREE.AxesHelper(5);
  axesHelper.layers.enableAll();
  scene.add(axesHelper);

  const earthGeometry = new THREE.SphereGeometry(EARTH_RADIUS,16,16);
  const earthMaterial = new THREE.MeshPhongMaterial({
    specular:0x333333,
    shininess:5,
    map:textureLoader.load('https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg'),
    specularMap:textureLoader.load('https://threejs.org/examples/textures/planets/earth_specular_2048.jpg'),
    normalMap:textureLoader.load('https://threejs.org/examples/textures/planets/earth_normal_2048.jpg'),
    normalScale:new THREE.Vector2(0.85,0.85),
    
  });

  earthMaterial.map.colorSpace = THREE.SRGBColorSpace;
  const earth = new THREE.Mesh(earthGeometry,earthMaterial);
  scene.add(earth);

  const moonGeometry = new THREE.SphereGeometry(MOON_RADIUS,16,16);
  const moonMaterial = new THREE.MeshPhongMaterial({
    shininess:5,
    map:textureLoader.load('https://threejs.org/examples/textures/planets/moon_1024.jpg'),
   
  });
  moonMaterial.map.colorSpace = THREE.SRGBColorSpace;
  moon = new THREE.Mesh(moonGeometry,moonMaterial);
  scene.add(moon);

  earth.layers.enableAll();
  moon.layers.enableAll();

  const earthDiv = document.createElement('div');
  earthDiv.className = 'label';
  earthDiv.textContent = 'Earth';
  earthDiv.style.background = 'transparent';
  
  const earthLabel = new CSS2DObject(earthDiv);
  earthLabel.position.set(1.5 * EARTH_RADIUS, 0, 0);
  earthLabel.layers.set(0);
  earth.add(earthLabel);

  const earthMassDiv = document.createElement('div');
  earthMassDiv.className = 'label';
  earthMassDiv.textContent = '5.97237e24 kg';
  earthMassDiv.style.backgroundColor = 'transparent';

  const earthMassLabel = new CSS2DObject(earthMassDiv);
  earthMassLabel.position.set( 1.5 * EARTH_RADIUS, 0, 0);
  earth.add(earthMassLabel);
  earthMassLabel.layers.set(1);

  const moonDiv = document.createElement('div');
  moonDiv.className = 'label';
  moonDiv.textContent = 'Moon';
  moonDiv.style.backgroundColor =  'transparent';
  
  const moonLabel = new CSS2DObject(moonDiv);
  moonLabel.position.set( 1.5 * MOON_RADIUS, 0, 0);
  moon.add(moonLabel);
  moonLabel.layers.set(0);


  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  labelRenderer = new CSS2DRenderer();
  labelRenderer.setSize(window.innerWidth, window.innerHeight);
  labelRenderer.domElement.style.position = "absolute";
  labelRenderer.domElement.style.top = "0px";
  document.body.appendChild(labelRenderer.domElement);

  const controls = new OrbitControls(camera, labelRenderer.domElement);
  controls.minDistance = 5;
  controls.maxDistance = 100;

  //

  window.addEventListener("resize", onWindowResize);

  initGui();
  

  
  


}


function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

  labelRenderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);

  const elapsed = clock.getElapsedTime();

  moon.position.set(Math.sin(elapsed) * 5, 0, Math.cos(elapsed) * 5);

  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
}

//

function initGui() {
  gui = new dat.GUI();

  // gui.title( 'Camera Layers' );

  gui.add(layers, "Toggle Name");
  gui.add(layers, "Toggle Mass");
  gui.add(layers, "Enable All");
  gui.add(layers, "Disable All");

  gui.open();
}