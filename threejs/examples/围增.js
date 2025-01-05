/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author:张德志
 * :copyright: (c) 2025, Xiaozhi
 * :date created: 2024-07-27 12:32:40
 * :last editor: 张德志
 * :date last edited: 2025-01-06 05:12:34
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(200,200,200);
camera.lookAt(scene.position);


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);


const control = new OrbitControls(camera,renderer.domElement);


const c = [
  0,0,
  60,0,
  60,80,
  40,120,
  -20,80,
  0,0
];

const geometry = new THREE.BufferGeometry();
const h = 20;
const posArr = [];
for(let i=0;i < c.length - 2;i+=2) {
  posArr.push(c[i],c[i+1],0,c[i+2],c[i+3],0,c[i+2],c[i+3],h);
  posArr.push(c[i],c[i+1],0,c[i+2],c[i+3],h,c[i],c[i + 1],h);
}

geometry.attributes.position = new THREE.BufferAttribute(new Float32Array(posArr),3);
geometry.computeVertexNormals();

const material = new THREE.MeshBasicMaterial({
  color:0x00ff00,
  side:THREE.DoubleSide
});
const mesh = new THREE.Mesh(geometry,material);
mesh.rotateX(-Math.PI / 2);
scene.add(mesh);





scene.add(new THREE.AxesHelper(500));

function render() {
  renderer.render(scene,camera);
  requestAnimationFrame(render);
}

render();
