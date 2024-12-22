/*
 * :file description: 
 * :name: /threejs/examples/TextureLoader2.js
 * :author:张德志
 * :copyright: (c) 2024, Xiaozhi
 * :date created: 2024-12-23 06:11:37
 * :last editor: 张德志
 * :date last edited: 2024-12-23 06:11:38
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(200,200,200);
camera.lookAt(scene.position);


const renderer = new THREE.WebGLRenderer({
  antialias:true
});
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);


scene.add(new THREE.AxesHelper(100));


scene.add(new THREE.AmbientLight(0xffffff));


const geometry = new THREE.PlaneGeometry(100,100);
const loader = new THREE.TextureLoader();
const texture = loader.load('/earth.png');

const material = new THREE.MeshLambertMaterial({
  map:texture,
  side:THREE.DoubleSide,
});

const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);



const controls = new OrbitControls(camera,renderer.domElement);


function render() {
  controls.update();
  renderer.render(scene,camera);
  requestAnimationFrame(render);
}

render();


document.body.appendChild(renderer.domElement);

