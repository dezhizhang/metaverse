/*
 * :file description: 
 * :name: /threejs/examples/105fbx.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-05-07 17:23:37
 * :last editor: 张德志
 * :date last edited: 2023-05-07 17:23:58
 */
import * as THREE from 'three';
import Stats from 'stats.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

let camera, scene, renderer, stats;

const clock = new THREE.Clock();

let mixer;

init();
animate();

function init() {
  camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,1,2000);
  camera.position.set(100,200,300);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xa0a0a0);
  scene.fog = new THREE.Fog(0xa0a0a0,200,1000);

  const hemiLight = new THREE.HemisphereLight(0xffffff,0x444444, 1.5);
  hemiLight.position.set(0,200,0);
  scene.add(hemiLight);

  const dirLight = new THREE.DirectionalLight(0xffffff,1.5);
  dirLight.position.set(0, 200, 100);
  dirLight.castShadow = true;
  dirLight.shadow.camera.top = 180;
  dirLight.shadow.camera.bottom = -100;
  dirLight.shadow.camera.left = -120;
  dirLight.shadow.camera.right = 120;
  scene.add(dirLight);

  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(2000,2000),
    new THREE.MeshPhongMaterial({color:0x999999,depthWrite:false})
  )
  mesh.rotation.x = -Math.PI / 2;
  mesh.receiveShadow = true;
  scene.add(mesh);

  const grid = new THREE.GridHelper(2000,20, 0x000000, 0x000000);
  grid.material.opacity = 0.2;
  grid.material.transparent = true;
  scene.add(grid);

  const loader = new FBXLoader();
  loader.load('https://threejs.org/examples/models/fbx/Samba%20Dancing.fbx',function(object) {
    mixer = new THREE.AnimationMixer(object);
    const action = mixer.clipAction(object.animations[0]);
    action.play();

    object.traverse(function(child) {
      if(child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    scene.add(object);

  });

  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth,window.innerHeight);
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera,renderer.domElement);
  controls.target.set(0,100,0);
  controls.update();

  window.addEventListener('resize',onWindowResize);
  stats = new Stats();
  document.body.appendChild(stats.dom);
}


function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

}

function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();
  if(mixer) mixer.update(delta);

  renderer.render(scene,camera);
  stats.update();

}