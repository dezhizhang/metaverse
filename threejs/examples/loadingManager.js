/*
 * :file description: 
 * :name: /threejs/examples/loadingManager.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-02-15 21:48:14
 * :last editor: 张德志
 * :date last edited: 2024-02-24 19:36:38
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.01,10000);
camera.position.set(0,0,10);



const manager = new THREE.LoadingManager();
manager.onStart = function ( url, itemsLoaded, itemsTotal ) {
	console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
};

manager.onLoad = function ( ) {
	console.log( 'Loading complete!');
};

manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
	console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
};

manager.onError = function ( url ) {
	console.log( 'There was an error loading ' + url );
};


const textureLoader = new THREE.TextureLoader(manager);
const texture = textureLoader.load('./01.jpg');
const texture1 = textureLoader.load('./wood-2.jpg');



const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({
  // map:texture1,
  // displacementMap:texture,
  // roughness: 0,
  metalness:1,
  metalnessMap:texture1,
  // roughnessMap:texture,
});

const cube = new THREE.Mesh(geometry,material);
scene.add(cube);

const light = new THREE.AmbientLight(0xffffff,0.5);
scene.add(light);

const directionalLight = new THREE.DirectionalLight(0xffffff,0.5);
directionalLight.position.set(10,10,10);
scene.add(directionalLight);


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const controls = new OrbitControls(camera,renderer.domElement);

function render() {
  requestAnimationFrame(render);
  renderer.render(scene,camera);
}

render();

document.body.appendChild(renderer.domElement);



