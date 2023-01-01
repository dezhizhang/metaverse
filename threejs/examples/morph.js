import * as THREE from 'three';

import Stats from 'three/examples/jsm/libs/stats.module.js';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

let stats, clock, mixer;
let camera, scene, renderer, model;


init();
animate();

function init() {
  camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,1000);
  camera.position.set(-5,3,10);
  camera.lookAt(0,2,0);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xe0e0e0);
  scene.fog = new THREE.Fog(0xe0e0e0,20,100);

  clock = new THREE.Clock();

  const hemiLight = new THREE.HemisphereLight(0xffffff,0x444444);
  hemiLight.position.set(0,20,0);
  scene.add(hemiLight);

  // 添加平行光
  const dirLight = new THREE.DirectionalLight(0xffffff);
  dirLight.position.set(0,20,10);
  scene.add(dirLight);

  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(2000,2000),
    new THREE.MeshPhongMaterial({color:0x999999,depthWrite:false})
  );
  mesh.rotation.x = -Math.PI / 2;
  scene.add(mesh);

  const grid = new THREE.GridHelper(200,40,0x000000,0x000000);
  grid.material.opacity = 0.2;
  grid.material.transparent = true;
  scene.add(grid);

  const loader = new GLTFLoader();
  loader.load('https://threejs.org/examples/models/gltf/RobotExpressive/RobotExpressive.glb',(gltf) => {
    model = gltf.scene;
    scene.add(model);
  });

  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth,window.innerHeight);
  renderer.outputEncoding = THREE.sRGBEncoding;;
  document.body.appendChild(renderer.domElement);

  window.addEventListener('resize',onWindowResize);

  stats = new Stats();
  document.body.appendChild(stats.dom);

  
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth,window.innerHeight);

}

function animate() {
  const dt = clock.getDelta();

  if (mixer) mixer.update(dt);

  requestAnimationFrame(animate);

  renderer.render(scene, camera);

  stats.update();
}
