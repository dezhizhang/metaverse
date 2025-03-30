/*
 * :file description: 
 * :name: /3dmath/examples/4.quaternion.js
 * :author:张德志
 * :copyright: (c) 2025, Xiaozhi
 * :date created: 2025-03-30 15:31:04
 * :last editor: 张德志
 * :date last edited: 2025-03-31 07:16:35
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(200,200,200);
camera.lookAt(scene.position);


scene.add(new THREE.AmbientLight(0xffffff,100));

scene.add(new THREE.AxesHelper(100));


const quaternion = new THREE.Quaternion();
quaternion.setFromAxisAngle(new THREE.Vector3(0,1,0),Math.PI/2);




const loader = new GLTFLoader();
loader.load('/fly.glb',function(gltf) {
    const fly = gltf.scene;
    fly.position.set(10,10,0);
    const ax = new THREE.AxesHelper(10);
    fly.add(ax);
    fly.applyQuaternion(quaternion);
    
    scene.add(fly);
})

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

new OrbitControls(camera,renderer.domElement);

function render() {
    requestAnimationFrame(render);
    renderer.render(scene,camera);
}

render();