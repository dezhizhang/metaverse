/*
 * :file description:
 * :name: /3dmath/src/index.js
 * :author:张德志
 * :copyright: (c) 2025, Xiaozhi
 * :date created: 2025-03-02 10:32:29
 * :last editor: 张德志
 * :date last edited: 2025-03-30 19:42:41
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



// const A = new THREE.Vector3(-50,0,-50);
// const B = new THREE.Vector3(100,0,100);

// const AB = B.clone().sub(A);
// console.log(AB.normalize());

const A = new THREE.Vector3(-50,0,0);
const B = new THREE.Vector3(100,0,0);
const AB = B.clone().sub(A);
AB.normalize();

const T = AB.clone().multiplyScalar(100);
console.log('T',T.length());









function render() {
    requestAnimationFrame(render);
    renderer.render(scene,camera);
}

render();








