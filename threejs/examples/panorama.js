/*
 * :file description: 
 * :name: /threejs/examples/panorama.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-01-01 19:09:41
 * :last editor: 张德志
 * :date last edited: 2023-01-01 19:17:28
 */
import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let camera, controls;
let renderer;
let scene;

init();
animate();

function init() {
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    90,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.z = 0.01;

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.enableDamping = true;
  controls.rotateSpeed = -0.25;

  const textures = getTexturesFromAtlasFile(
    'https://threejs.org/examples/textures/cube/sun_temple_stripe.jpg',
    6,
  );

  const materials = [];
  for(let i =0;i < 6;i++) {
    materials.push(new THREE.MeshBasicMaterial({map:textures[i]}));
  }
  const skyBox = new THREE.Mesh(new THREE.BoxGeometry(1,1,1),materials);
  skyBox.geometry.scale(1,1,-1);
  scene.add(skyBox);

  window.addEventListener('resize',onWindowResize);

}


function getTexturesFromAtlasFile(atlasImgUrl, tilesNum) {
  const textures = [];
  for (let i = 0; i < tilesNum; i++) {
    textures[i] = new THREE.Texture();
  }

  new THREE.ImageLoader().load(atlasImgUrl, (image) => {
    let canvas, context;
    let tileWidth = image.height;
    for (let i = 0; i < textures.length; i++) {
      canvas = document.createElement('canvas');
      context = canvas.getContext('2d');
      canvas.height = tileWidth;
      canvas.width = tileWidth;
      context.drawImage(
        image,
        tileWidth * i,
        0,
        tileWidth,
        tileWidth,
        0,
        0,
        tileWidth,
        tileWidth,
      );
      textures[i].image = canvas;
      textures[i].needsUpdate = true;
    }
  });
  return textures;
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);

  controls.update(); // required when damping is enabled

  renderer.render(scene, camera);
}
