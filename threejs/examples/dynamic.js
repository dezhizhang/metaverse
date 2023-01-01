/*
 * :file description: 
 * :name: /threejs/examples/dynamic.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-01-01 14:48:13
 * :last editor: 张德志
 * :date last edited: 2023-01-01 17:32:14
 */
import * as THREE from 'three';

import Stats from 'stats.js';

let camera,  scene, renderer, stats;

let mesh, geometry, material, clock;

const worldWidth = 128,
  worldDepth = 128;

init();
animate();

function init() {
  camera = new THREE.PerspectiveCamera(60,window.innerWidth / window.innerHeight,1,2000);
  camera.position.y = 200;
  
  clock = new THREE.Clock();

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xaaccff);
  scene.fog = new THREE.FogExp2(0xaaccff, 0.0007);

  geometry = new THREE.PlaneGeometry(20000,20000,worldWidth - 1,worldDepth - 1);
  geometry.rotateX(-Math.PI / 2);

  const position = geometry.attributes.position;
  position.usage = THREE.DynamicCopyUsage;

  for(let i = 0;i < position.count;i++) {
    const y = 35 * Math.sin(i / 2);
    position.setY(i,y);

  }
  const texture = new THREE.TextureLoader().load('https://threejs.org/examples/textures/water.jpg');
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set( 5, 5 );

  material = new THREE.MeshBasicMaterial({color:0x0044ff,map:texture});
  mesh = new THREE.Mesh(geometry,material);
  scene.add(mesh);

  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth,window.innerHeight);
  document.body.appendChild(renderer.domElement);

  stats = new Stats();
  document.body.appendChild(stats.dom);

  window.addEventListener('resize',onWindowResize);
}


function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

//

function animate() {
  requestAnimationFrame(animate);

  render();
  stats.update();
}

function render() {
  const delta = clock.getDelta();
  const time = clock.getElapsedTime() * 10;

  const position = geometry.attributes.position;

  for (let i = 0; i < position.count; i++) {
    const y = 35 * Math.sin(i / 5 + (time + i) / 7);
    position.setY(i, y);
  }

  position.needsUpdate = true;

  // controls.update(delta);
  renderer.render(scene, camera);
}
