/*
 * :file description: 
 * :name: /threejs/examples/webgl_lensflares.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-02-27 20:01:21
 * :last editor: 张德志
 * :date last edited: 2024-02-27 20:01:22
 */
/*
 * :file description:
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2024-02-27 19:59:20
 */
import * as THREE from 'three';

import Stats from 'three/addons/libs/stats.module.js';

import { FlyControls } from 'three/addons/controls/FlyControls.js';
import { Lensflare, LensflareElement } from 'three/addons/objects/Lensflare.js';

let stats;

let camera, scene, renderer;
let controls;

const clock = new THREE.Clock();

init();
animate();

function init() {
  camera = new THREE.PerspectiveCamera(40,window.innerWidth / window.innerHeight,0.1,15000);
  camera.position.z = 250;

  scene = new THREE.Scene();
  scene.background = new THREE.Color().setHSL(0.51, 0.4, 0.01,THREE.SRGBColorSpace);
  scene.fog = new THREE.Fog(scene.background,3500,15000);

  const s = 250;
  const geometry = new THREE.BoxGeometry(s,s,s);
  const material = new THREE.MeshPhongMaterial({
    color:0xffffff,
    specular: 0xffffff,
    shininess: 50,
  });
  for(let i=0;i < 3000;i++) {
    const mesh = new THREE.Mesh(geometry,material);
    mesh.position.x = 8000 * (2.0 * Math.random() - 1.0);
    mesh.position.y = 8000 * (2.0 * Math.random() - 1.0);
    mesh.position.z = 8000 * (2.0 * Math.random() - 1.0);

    mesh.rotation.x = Math.random() * Math.PI;
    mesh.rotation.y = Math.random() * Math.PI;
    mesh.rotation.z = Math.random() * Math.PI;

    mesh.matrixAutoUpdate = false;
    mesh.updateMatrix();
    scene.add(mesh);
    
  }

  const directionalLight = new THREE.DirectionalLight(0xffffff,0.15);
  directionalLight.position.set(0,-1,0).normalize();
  directionalLight.color.setHSL(0.1,0.7,0.5);
  scene.add(directionalLight);
  

  const textureLoader = new THREE.TextureLoader();
  const textureFlare0 = textureLoader.load('https://threejs.org/examples/textures/lensflare/lensflare0.png');
  const textureFlare3 = textureLoader.load('https://threejs.org/examples/textures/lensflare/lensflare3.png');


  addLight(0.55, 0.9, 0.5, 5000, 0, -1000);
  addLight(0.08, 0.8, 0.5, 0, 0, -1000);
  addLight(0.995, 0.5, 0.9, 5000, 5000, -1000);

  function addLight(h, s, l, x, y, z) {
    const light = new THREE.PointLight(0xffffff, 1.5, 2000, 0);
    light.color.setHSL(h, s, l);
    light.position.set(x, y, z);
    scene.add(light);

    const lensflare = new Lensflare();
    lensflare.addElement(new LensflareElement(textureFlare0, 700, 0, light.color));
    lensflare.addElement(new LensflareElement(textureFlare3, 60, 0.6));
    lensflare.addElement(new LensflareElement(textureFlare3, 70, 0.7));
    lensflare.addElement(new LensflareElement(textureFlare3, 120, 0.9));
    lensflare.addElement(new LensflareElement(textureFlare3, 70, 1));
    light.add(lensflare);
  }


  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth,window.innerHeight);
  document.body.appendChild(renderer.domElement);


  controls = new FlyControls(camera, renderer.domElement);

  controls.movementSpeed = 2500;
  controls.domElement = document.body;
  controls.rollSpeed = Math.PI / 6;
  controls.autoForward = false;
  controls.dragToLook = false;

  stats = new Stats();
  document.body.appendChild(stats.dom);

  window.addEventListener('resize', onWindowResize);
  
}


function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

//

function animate() {
  requestAnimationFrame(animate);

  render();
  stats.update();
}

function render() {
  const delta = clock.getDelta();

  controls.update(delta);
  renderer.render(scene, camera);
}
