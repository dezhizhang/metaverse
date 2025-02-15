/*
 * :file description:
 * :name: /virtual-world/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-26 06:15:04
 * :last editor: 张德志
 * :date last edited: 2025-02-15 15:51:10
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(200, 200, 200);
camera.lookAt(scene.position);


const earthR = 100;

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('earth.png');
const textureLight = textureLoader.load('earth-light.png');


const spriteMaterial = new THREE.SpriteMaterial({
  map:textureLight,
  transparent:true,
});

const sprite = new THREE.Sprite(spriteMaterial);
sprite.scale.set(earthR * 3,earthR * 3,1);
scene.add(sprite);





const geometry = new THREE.SphereGeometry(100,40,40);
const material = new THREE.MeshBasicMaterial({
  map:texture
});

const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);


const controls = new OrbitControls(camera,renderer.domElement);







const axesHelper = new THREE.AxesHelper(1000);
scene.add(axesHelper);

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
