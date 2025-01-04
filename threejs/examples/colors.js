/*
 * :file description: 
 * :name: /threejs/examples/colors.js
 * :author:张德志
 * :copyright: (c) 2025, Xiaozhi
 * :date created: 2025-01-02 06:50:36
 * :last editor: 张德志
 * :date last edited: 2025-01-02 06:50:37
 */
/*
 * :file description:
 * :name: /threejs/src/index.js
 * :author:张德志
 * :copyright: (c) 2025, Xiaozhi
 * :date created: 2024-07-27 12:32:40
 * :last editor: 张德志
 * :date last edited: 2025-01-02 06:50:15
 */
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  3000
);
camera.position.set(200, 200, 200);
camera.lookAt(scene.position);

scene.add(new THREE.AmbientLight(0xffffff, 0.3));
scene.add(new THREE.AxesHelper(250));

const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);


// geometry.attributes.color = new THREE.BufferAttribute(colors,3);
// const material = new THREE.PointsMaterial({
//   color:0xffff00,
//   size:20
// });

// const points = new THREE.Points(geometry,material);
// scene.add(points);

// const geometry = new THREE.BufferGeometry();
// const vertices = new Float32Array([
//   0,0,0,
//   50,0,0,
//   0,25,0
// ]);

// const attribute = new THREE.BufferAttribute(vertices,3);
// geometry.attributes.position = attribute;

// const colors = new Float32Array([
//   1,0,0,
//   0,0,1,
//   0,1,0
// ]);

// geometry.attributes.color = new THREE.BufferAttribute(colors,3);
// const material = new THREE.PointsMaterial({
//   color:0xffff00,
//   size:20
// });

// const points = new THREE.Points(geometry,material);
// scene.add(points);

function render() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();
