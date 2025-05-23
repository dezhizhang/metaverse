/*
 * :file description: 
 * :name: /threejs/examples/setScissor2.js
 * :author:张德志
 * :copyright: (c) 2025, Xiaozhi
 * :date created: 2025-02-18 07:49:42
 * :last editor: 张德志
 * :date last edited: 2025-02-18 07:57:17
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

scene.add(new THREE.AxesHelper(1000));

const controls = new OrbitControls(camera, renderer.domElement);

const geometry = new THREE.BoxGeometry(10,10,10);
const material = new THREE.MeshBasicMaterial({
  antialias:true
});
const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);




const width = window.innerWidth;
const height = window.innerHeight;

renderer.setScissorTest(true);

function render() {
    renderer.render(scene,camera);

    renderer.setScissor(0,0,width,height);
    renderer.setViewport(0,0,width,height);
    renderer.setClearColor(0x000000,1);
    renderer.render(scene,camera);

    renderer.setScissor(width - width / 3 - 10,height - height / 3- 10,width / 3,height / 3);
    renderer.setViewport(width - width / 3 - 10,height - height / 3  - 10,width / 3,height / 3);
    renderer.setClearColor(0x202020,1);
    renderer.render(scene,camera);

    mesh.rotateY(0.01);
    requestAnimationFrame(render);
}

render();
