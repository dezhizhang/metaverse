/*
 * :file description:
 * :name: /virtual-world/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-26 06:15:04
 * :last editor: 张德志
 * :date last edited: 2025-02-14 06:33:15
 */
import * as THREE from 'three';
import { Octree } from 'three/examples/jsm/math/Octree.js';
import { Capsule } from 'three/examples/jsm/math/Capsule.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(200, 200, 200);
camera.lookAt(scene.position);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const geometry = new THREE.PlaneGeometry(20, 20, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: 0x00ffff,
  size: THREE.DoubleSide,
});

const plane = new THREE.Mesh(geometry, material);
plane.receiveShadow = true;
plane.rotation.x = -Math.PI / 2;
scene.add(plane);




const capsuleGeometry = new THREE.CapsuleGeometry(0.35,0.35,32);
const material1 = new THREE.MeshBasicMaterial({
    color:0xffff00,
    side:THREE.DoubleSide
});

const  capsule = new THREE.Mesh(capsuleGeometry,material1);
capsule.position.set(0,0.85,0);
scene.add(capsule);


const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
