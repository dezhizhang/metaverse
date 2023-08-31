/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2023-08-31 19:24:11
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let scene, camera, renderer, mesh;


init();
animate();

function init() {
  camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);
  camera.position.set(4,2,4);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xa0a0a0);
  scene.fog = new THREE.Fog(0xa0a0a0,4,20);

  const hemiLight = new THREE.HemisphereLight(0xffffff,0x444444,3);
  hemiLight.position.set(0,20,0);
  scene.add(hemiLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff,3);
  directionalLight.position.set(0,20,10);
  directionalLight.castShadow = true;
  directionalLight.shadow.camera.top = 2;
  directionalLight.shadow.camera.bottom = -2;
  directionalLight.shadow.camera.left = -2;
  directionalLight.shadow.camera.right = 2;
  scene.add(directionalLight);

  const ground = new THREE.Mesh(new THREE.PlaneBufferGeometry(40,40),new THREE.MeshPhongMaterial({color: 0xbbbbbb, depthWrite: false}));
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  const grid = new THREE.GridHelper(40,20,0x000000, 0x000000);
  grid.material.opacity = 0.2;
  grid.material.transparent = true;
  scene.add(grid);

  const geometry = new THREE.TorusKnotGeometry(0.75,0.2,200,30);
  const material = new THREE.MeshPhongMaterial({color:0x00ff00});
  mesh = new THREE.Mesh(geometry,material);
  mesh.castShadow = true;
  mesh.position.y = 1.5;
  scene.add(mesh);

  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth,window.innerHeight);
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);


  const controls = new OrbitControls(camera,renderer.domElement);
  controls.target.set(0,1.5,0);
  controls.update();

  window.addEventListener('resize',onWindowResize);
  

}


function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

}

function animate() {

  requestAnimationFrame(animate);
  renderer.render(scene, camera);

}

