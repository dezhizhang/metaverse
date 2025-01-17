/*
 * :file description:
 * :name: /threejs/examples/transparent.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-13 22:44:48
 * :last editor: 张德志
 * :date last edited: 2024-03-23 21:35:27
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(10,10,10);
camera.lookAt(0,0,0);

const gridHelper = new THREE.GridHelper(30,30,0x004444,0x004444);
scene.add(gridHelper);

const directionalLight = new THREE.DirectionalLight(0xffffff,1);
directionalLight.position.set(100,50,50);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xffffff,0.4);
scene.add(ambientLight);

const renderer = new THREE.WebGL1Renderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);

document.body.appendChild(renderer.domElement);

window.addEventListener('resize',() => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
});

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

const controls = new OrbitControls(camera,renderer.domElement);

const boxGeometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({
    color:0xff00ff,
    opacity:0.5,
    transparent:true
});

const cube = new THREE.Mesh(boxGeometry,material);
scene.add(cube);

function render() {
    requestAnimationFrame(render);
    renderer.render(scene,camera);
}

render();
