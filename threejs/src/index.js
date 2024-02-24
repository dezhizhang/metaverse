import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.01,1000);
camera.position.set(0,0,10);

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('./01.jpg');

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({
  map:texture
});


const cube = new THREE.Mesh(geometry,material);
scene.add(cube);

const light = new THREE.AmbientLight(0xffffff,0.5);
scene.add(light);

// 平行光
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




