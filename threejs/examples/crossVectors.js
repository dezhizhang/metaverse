/*
 * :file description: 
 * :name: /threejs/examples/crossVectors.js
 * :author:张德志
 * :copyright: (c) 2024, Xiaozhi
 * :date created: 2024-12-29 07:30:24
 * :last editor: 张德志
 * :date last edited: 2024-12-29 07:30:25
 */
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(200, 200, 200);
camera.lookAt(scene.position);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

scene.add(new THREE.AxesHelper(100));

// const group = new THREE.Group();
// const a = new THREE.Vector3(50,0,0);
// const b = new THREE.Vector3(30,0,30);

// // 向量A
// const o = new THREE.Vector3(0,0,0);
// const arrowA = new THREE.ArrowHelper(a.clone().normalize(),o,a.length(),0xff0000);
// group.add(arrowA);
// scene.add(group);

// // 向量B 
// const arrowB = new THREE.ArrowHelper(b.clone().normalize(),o,b.length(),0x00ff00);
// group.add(arrowB);


// // 向量C
// const c = new THREE.Vector3();
// c.crossVectors(a,b);

// const arrowC = new THREE.ArrowHelper(c.clone().normalize(),o,c.length(),0x00ff00);
// group.add(arrowC);










function render() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();
