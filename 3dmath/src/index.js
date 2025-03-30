/*
 * :file description: 
 * :name: /3dmath/src/index.js
 * :author:张德志
 * :copyright: (c) 2025, Xiaozhi
 * :date created: 2025-03-02 10:32:29
 * :last editor: 张德志
 * :date last edited: 2025-03-30 22:25:17
 */
// 导入Three.js库
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(100,100,100);
camera.lookAt(scene.position);


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);


new OrbitControls(camera,renderer.domElement);


const a = new THREE.Vector3(50,0,0);
const b = new THREE.Vector3(50,0,30);
const o = new THREE.Vector3(0,0,0);
const c = new THREE.Vector3();

c.crossVectors(a,b);


const arrowA = new THREE.ArrowHelper(
    a.clone().normalize(),
    o,
    a.length(),
    0x00ff00
);
scene.add(arrowA);

const arrowB = new THREE.ArrowHelper(
    b.clone().normalize(),
    o,
    b.length(),
    0xff00ff
);
scene.add(arrowB);


const arrowC = new THREE.ArrowHelper(
    c.clone().normalize(),
    o,
    c.length() / 30,
    0x00ff00
);
scene.add(arrowC);


scene.add(new THREE.AxesHelper(100));


function render() {
    renderer.render(scene,camera);
    requestAnimationFrame(render);
}

render();










