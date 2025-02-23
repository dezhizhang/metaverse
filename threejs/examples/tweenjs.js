/*
 * :file description: 
 * :name: /threejs/examples/tweenjs.js
 * :author:张德志
 * :copyright: (c) 2025, Xiaozhi
 * :date created: 2025-02-24 05:56:30
 * :last editor: 张德志
 * :date last edited: 2025-02-24 05:56:31
 */
import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,1,3000);
camera.position.set(200,200,200);
camera.lookAt(scene.position);



const geometry = new THREE.BoxGeometry(10,10,10);
const material = new THREE.MeshBasicMaterial({
  color:0x00ff00
});
const box = new THREE.Mesh(geometry,material);
scene.add(box);



const renderer = new THREE.WebGLRenderer({
  
});
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);


new OrbitControls(camera,renderer.domElement);

scene.add(new THREE.AxesHelper(100));



const pos = {
  x:0,
  y:0,
  z:0
}

const tween = new TWEEN.Tween(pos);
tween.to({
  x:100,
  y:0,
  z:0
});

tween.onUpdate(function(){
  box.position.set(pos.x,pos.y,pos.z);
});

tween.start();


function render() {
  TWEEN.update();
  renderer.render(scene,camera);
  requestAnimationFrame(render);
}

render();



