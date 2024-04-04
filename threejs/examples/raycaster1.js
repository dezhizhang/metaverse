/*
 * :file description: 
 * :name: /threejs/examples/Raycaster1.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-04 14:38:05
 * :last editor: 张德志
 * :date last edited: 2024-04-04 14:38:06
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(300, 300, 200);
camera.lookAt(scene.position);


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const boxGeometry = new THREE.BoxGeometry(30,30,30);
const boxMaterial = new THREE.MeshBasicMaterial({
  color:0xffff00
});
const box = new THREE.Mesh(boxGeometry,boxMaterial);
box.translateZ(-80);
scene.add(box);

const sphereGeometry = new THREE.SphereGeometry(20,40,40);
const sphereMaterial = new THREE.MeshPhongMaterial({
  color:0xff00ff
});
const sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);
sphere.translateX(-80);
scene.add(sphere);


const cylinderGeometry = new THREE.CylinderGeometry(15,15,100,40);
const cylinderMaterial = new THREE.MeshPhongMaterial({
  color:0x00ffff
});
const cylinder = new THREE.Mesh(cylinderGeometry,cylinderMaterial);
cylinder.translateX(80);
scene.add(cylinder);

const controls = new OrbitControls(camera,renderer.domElement);


window.addEventListener('click',(event) => {
  const sx = event.clientX;
  const sy = event.clientY;

  const x = (sx / window.innerWidth) * 2 - 1;
  const y = -(sy / window.innerHeight) * 2 + 1;

  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(new THREE.Vector2(x,y),camera);

  const intersect = raycaster.intersectObjects([box,sphere,cylinder]);

  console.log('intersect',intersect);
  
  if(intersect.length > 0) {
    intersect[0].object.material.transparent = true;
    intersect[0].object.material.opacity = 0.6;
    intersect[0].object.material.color = new THREE.Color(0x00ff00);
  }

})


const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
});

function render() {
  renderer.render(scene, camera);
  // effectComposer.render();
  requestAnimationFrame(render);
}

render();
