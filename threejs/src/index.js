/*
 * :file description:
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-13 22:44:48
 * :last editor: 张德志
 * :date last edited: 2024-04-26 17:43:06
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(200,200,200);
camera.lookAt(scene.position);


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

document.body.appendChild(renderer.domElement);


const controls = new OrbitControls(camera,renderer.domElement);

scene.add(new THREE.AxesHelper(100));
scene.add(new THREE.AmbientLight(0xffffff,1));



const objLoader = new OBJLoader();
const textureLoader = new THREE.TextureLoader();

objLoader.load('/bracelet.obj',function(obj) {
  const material = new THREE.MeshBasicMaterial({
    map:textureLoader.load('/texture2.png')
  })
  obj.children[0].material = material;
  scene.add(obj);
})


function render() {
  requestAnimationFrame(render);
  renderer.render(scene,camera);
}

render();



