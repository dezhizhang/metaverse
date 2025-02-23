

import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(200,200,200);
camera.lookAt(scene.position);


const renderer = new THREE.WebGLRenderer({
  
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);


scene.add(new THREE.AxesHelper(100));

const geometry = new THREE.BoxGeometry(10,10,10);
const material = new THREE.MeshBasicMaterial({
  color:0x00ff00
});
const box = new THREE.Mesh(geometry,material);
scene.add(box);

const obj = {
  r:1,
  g:0,
  b:0
}

const tween = new TWEEN.Tween(obj);
tween.to({r:0,g:1,b:1},2000);
tween.onUpdate(function() {
  box.material.color.setRGB(obj.r,obj.g,obj.b);
});
tween.start();



function render() {
  TWEEN.update();
  renderer.render(scene,camera);
  requestAnimationFrame(render);
}

render();

