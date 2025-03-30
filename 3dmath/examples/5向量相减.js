/*
 * :file description: 
 * :name: /3dmath/examples/5向量相减.js
 * :author:张德志
 * :copyright: (c) 2025, Xiaozhi
 * :date created: 2025-03-30 18:56:49
 * :last editor: 张德志
 * :date last edited: 2025-03-30 18:56:50
 */
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(100,100,100);
camera.lookAt(scene.position);


const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);


const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({
    color:0x00ff00
});
const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);

scene.add(new THREE.AxesHelper(100));

const a = new THREE.Vector3(30,30,0);
const b = new THREE.Vector3(130,80,0);

const ab = new THREE.Vector3();

ab.subVectors(a,b);

console.log('ab',ab.length());


function render() {
    requestAnimationFrame(render);
    renderer.render(scene,camera);
}

render();
