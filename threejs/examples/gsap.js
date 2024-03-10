import * as THREE from 'three';
import Stat from 'stats.js';
import gsap from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(1, 1, 10);

const ambientLight = new THREE.AmbientLight(0xffffff, 3);
scene.add(ambientLight);

const stats = new Stat();
document.body.appendChild(stats.domElement);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const boxGemonetry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial = new THREE.MeshBasicMaterial({
  color: 0xff00ff,
});
const box = new THREE.Mesh(boxGemonetry, boxMaterial);
scene.add(box);

gsap.to(box.position, { x: 5, duration: 5,ease:'power1.inOut' });
gsap.to(box.rotation, { x: Math.PI * 2, duration: 5 });

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const control = new OrbitControls(camera, renderer.domElement);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
});

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
