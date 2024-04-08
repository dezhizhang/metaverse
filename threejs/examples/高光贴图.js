/*
 * :file description: 
 * :name: /threejs/examples/高光贴图.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-09 06:53:25
 * :last editor: 张德志
 * :date last edited: 2024-04-09 06:53:26
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(200, 200, 200);
camera.lookAt(scene.position);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(100, 100, 100); //点光源位置
scene.add(pointLight); //点光源添加到场景中

scene.add(new THREE.PointLightHelper(pointLight));

scene.add(new THREE.AxesHelper(200));

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('/specular.jpg');
const geometry = new THREE.PlaneGeometry(200, 200);
const material = new THREE.MeshPhongMaterial({
  color: 0x0000ff,
  shininess: 30,
  specular: 0xff0000,
  specularMap: texture,
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
