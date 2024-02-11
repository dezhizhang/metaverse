import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.position.set(400, 200, 300);
scene.add(directionalLight);

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight2.position.set(-400, -200, -300);
scene.add(directionalLight2);

const ambient = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambient);

const width = window.innerWidth;
const height = window.innerHeight;

const k = width / height;
const s = 90;
const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
camera.position.set(0, 0, 200);
camera.lookAt(scene.position);

const renderer = new THREE.WebGLRenderer({
  preserveDrawingBuffer: true,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000909, 1);

const controls = new OrbitControls(camera, renderer.domElement);

export { scene, renderer, camera };
