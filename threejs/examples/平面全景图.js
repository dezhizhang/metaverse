/*
 * :file description: 
 * :name: /threejs/examples/平面全景图.js
 * :author:张德志
 * :copyright: (c) 2025, Xiaozhi
 * :date created: 2025-02-22 15:47:46
 * :last editor: 张德志
 * :date last edited: 2025-02-22 15:47:47
 */
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0x001111, 1);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  1,
  10000
);
camera.position.set(0, 0, -1);
camera.lookAt(new THREE.Vector3(0, 0, 0));

const L = 100;
const textureLoader = new THREE.TextureLoader();
const arr = ["front", "back", "up", "down", "left", "right"];

arr.forEach((name) => {
  const geometry = new THREE.PlaneGeometry(L, L);
  const material = new THREE.MeshBasicMaterial({
    map: textureLoader.load("/panorama/" + name + ".jpg"),
    side:THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  if (name === "front") {
    mesh.position.z = -L / 2;
  }
  if(name === 'back') {
    mesh.position.z = L / 2;
    mesh.rotateY(Math.PI);
  }
  if(name === 'up') {
    mesh.rotateX(Math.PI / 2);
    mesh.position.y = L / 2;
  }

  if(name === 'down') {
    mesh.rotateX(-Math.PI / 2);
    mesh.position.y = -L / 2;
  }

  if(name == 'left') {
    mesh.rotateY(Math.PI / 2);
    mesh.position.x = -L / 2;
  }

  if(name === 'right') {
    mesh.rotateY(-Math.PI / 2);
    mesh.position.x = L / 2;
  }
 
});

const gridHelper = new THREE.GridHelper(300, 25, 0x004444, 0x00444);

const axesHelper = new THREE.AxesHelper(300);
scene.add(axesHelper);

new OrbitControls(camera, renderer.domElement);

scene.add(new THREE.AxesHelper(1000));

function render() {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();

