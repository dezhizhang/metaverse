/*
 * :file description:
 * :name: /threejs/examples/gridHelper.js
 * :author:张德志
 * :copyright: (c) 2025, Xiaozhi
 * :date created: 2024-07-27 12:32:40
 * :last editor: 张德志
 * :date last edited: 2025-02-22 10:38:31
 */
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';



const R = 2;
const rangeSize = 3000;
const divisions = 50;

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0x001111,1);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,10000);
camera.position.set(400,400,400);
camera.lookAt(scene.position);


const gridHelper = new THREE.GridHelper(3000,50,0x004444,0x004444);
scene.add(gridHelper);



const geometry = new THREE.CircleGeometry(R,20,20);
geometry.rotateX(Math.PI / 2);
const material = new THREE.MeshBasicMaterial({
  color:0x00ff00,
  side:THREE.DoubleSide
});

const row = rangeSize / divisions;
const column = rangeSize / 2;

const group = new THREE.Group();
scene.add(group);

for(let i=0;i < divisions;i++) {
  for(let j=0;j < divisions;j++) {
    const mesh = new THREE.Mesh(geometry,material);
    mesh.translateX(-column + i * row);
    mesh.translateZ(-column + j * row);
    group.add(mesh);
  }
}





new OrbitControls(camera,renderer.domElement);

scene.add(new THREE.AxesHelper(1000));



function render() {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();
