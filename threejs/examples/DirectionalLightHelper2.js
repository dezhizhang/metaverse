/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author:张德志
 * :copyright: (c) 2024, Xiaozhi
 * :date created: 2024-07-27 12:32:40
 * :last editor: 张德志
 * :date last edited: 2024-12-22 10:23:49
 */
import * as THREE from 'three';
import {
  OrbitControls
} from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();


const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 30000);
camera.position.set(200, 200, 200);
camera.lookAt(scene.position);


const renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);


scene.add(new THREE.AxesHelper(100));


const geometry = new THREE.CircleGeometry(10);

const material = new THREE.MeshPhongMaterial({
  color:0xff0000,
  shininess:100,
  specular:0xffffff,
  side:THREE.DoubleSide
});

const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);


const ambient = new THREE.AmbientLight(0xffffff);
scene.add(ambient);



const directionLight = new THREE.DirectionalLight(0xffffff,1);
directionLight.position.set(20,10,10);
directionLight.target = scene;
scene.add(directionLight);

scene.add(new THREE.DirectionalLightHelper(directionLight))


const controls = new OrbitControls(camera, renderer.domElement);


function render() {
  controls.update();
  renderer.render(scene, camera)
  requestAnimationFrame(render);
}

render();


document.body.appendChild(renderer.domElement);