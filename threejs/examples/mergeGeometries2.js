/*
 * :file description: 
 * :name: /threejs/examples/mergeGeometries2.js
 * :author:张德志
 * :copyright: (c) 2025, Xiaozhi
 * :date created: 2025-02-22 17:48:08
 * :last editor: 张德志
 * :date last edited: 2025-02-22 17:48:09
 */
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

const width = window.innerWidth;
const height = window.innerHeight;

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
camera.position.set(200, 200, 200);
camera.lookAt(new THREE.Vector3(0, 0, 0));


scene.add(new THREE.AmbientLight(0xffffff,10));


const renderer = new THREE.WebGLRenderer({});
renderer.setSize(width, height);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

scene.add(new THREE.AxesHelper(100));



const geometries = [];
for(let i=0;i < 10000;i++) {
  const geometry = new THREE.BoxGeometry(5,5,5);
  const x = Math.random() - 0.5 * 2 * 100;
  const y = Math.random() - 0.5 * 2 * 100;
  const z = Math.random() - 0.5 * 2 * 100;

  geometry.translate(x,y,z);
  geometries.push(geometry);
}

const geometry= mergeGeometries(geometries);
const material = new THREE.MeshLambertMaterial({
  color:0x00ff00
});
const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);



new OrbitControls(camera, renderer.domElement);

function render() {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();
