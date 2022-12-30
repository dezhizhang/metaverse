/*
 * :file description: 
 * :name: /threejs/examples/29灯光.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-12-30 06:13:11
 * :last editor: 张德志
 * :date last edited: 2022-12-30 06:16:33
 */
// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// let scene,cube,camera,renderer;

// let axesHelper;


// function init() {
//   scene = new THREE.Scene();
//   const geometry = new THREE.BoxGeometry(1,1,1);
//   const material = new THREE.MeshBasicMaterial({color:0xffff00});
//   cube = new THREE.Mesh(geometry,material);

//   scene.add(cube);

//   axesHelper = new THREE.AxesHelper(100);
//   scene.add(axesHelper);

//   camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);
//   camera.position.z = 5;
//   camera.position.x = 2;
//   camera.position.y = 1;

//   renderer = new THREE.WebGLRenderer();
//   renderer.setSize(window.innerWidth,window.innerHeight);

//   new OrbitControls(camera,renderer.domElement);

//   document.body.appendChild(renderer.domElement);


// }


// // function init() {
// //   scene = new THREE.Scene();
// //   const geometry = new THREE.BoxGeometry(1,1,1);
// //   const material = new THREE.MeshBasicMaterial({color:0xffff00});
// //   cube = new THREE.Mesh(geometry,material);

// //   scene.add(cube);

// //   axesHelper = new THREE.AxesHelper(100);

// //   scene.add(axesHelper);

// //   // 
// //   camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);
// //   camera.position.z = 5;
// //   camera.position.x = 2;
// //   camera.position.y = 1;


// //   renderer = new THREE.WebGL1Renderer();
// //   renderer.setSize(window.innerWidth,window.innerHeight);
// //   new OrbitControls(camera,renderer.domElement);
// //   document.body.appendChild(renderer.domElement);
// // }


// function render() {
//   cube.rotation.y += 0.01;
//   requestAnimationFrame(render);
//   renderer.render(scene,camera);

// }


// init();
// render();

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

let camera,scene,renderer,axesHelper,controls,ambientLight,cylinder,spotLight;

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);
  camera.position.set(0,120,200);
  camera.lookAt(0,0,0);

  axesHelper = new THREE.AxesHelper(100);
  scene.add(axesHelper);

  ambientLight = new THREE.AmbientLight(0xffffff,0.2);
  scene.add(ambientLight);

  spotLight = new THREE.SpotLight(0xffffff,1);
  spotLight.position.set(-50,80,0);
  spotLight.angle = Math.PI / 6;
  spotLight.penumbra = 0.2;
  scene.add(spotLight);


  const geometry = new THREE.PlaneGeometry(2000,200);
  const material = new THREE.MeshPhongMaterial({color:0x808080});
  const plane = new THREE.Mesh(geometry,material);
  plane.rotation.x = - Math.PI / 2;
  plane.position.set(0,-10,0);
  scene.add(plane);

  const cylinderGeometry = new THREE.CylinderGeometry(5,5,2,24,false);
  const cylinderMaterial = new THREE.MeshPhongMaterial({color:0x408080});
  cylinder = new THREE.Mesh(cylinderGeometry,cylinderMaterial);
  cylinder.position.set(0,10,0);
  scene.add(cylinder);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth,window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  
  controls = new OrbitControls(camera,renderer.domElement);

  document.body.appendChild(renderer.domElement);
}



function render() {
  requestAnimationFrame(render)
  renderer.render(scene,camera);
}
init();
render();

