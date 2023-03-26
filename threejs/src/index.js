/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-02-17 21:42:17
 * :last editor: 张德志
 * :date last edited: 2023-02-18 06:27:04
 */
import * as THREE from 'three';
import Stats from 'stats.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const stats = new Stats();

const scene = new THREE.Scene();
const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial();
const cube = new THREE.Mesh(geometry,material);
scene.add(cube);




const axes = new THREE.AxesHelper(2,2,2);
scene.add(axes);



const light = new THREE.AmbientLight();
scene.add(light);


const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(0,0,5);
camera.lookAt(scene.position);


const renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.render(scene,camera);

const orbitControls = new OrbitControls(camera,renderer.domElement);

let time = Date.now();
function tick() {
    let currentTime = Date.now();
    let deltaTime = currentTime - time;
    time = currentTime;

    cube.rotation.z += deltaTime * 0.001;
    renderer.render(scene,camera);
    requestAnimationFrame(tick);
    stats.update();
}

tick();

document.body.appendChild(renderer.domElement);
document.body.appendChild(stats.domElement);











