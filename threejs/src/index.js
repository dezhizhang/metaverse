import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(2, 10, 2);

const renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('/watercover/CityNewYork002_COL_VAR1_1K.png')

const planeGeometry = new THREE.PlaneGeometry(1, 1);
const planeMaterial = new THREE.MeshBasicMaterial({
  // color: 0xff00ff,
  side:THREE.DoubleSide,
  map:texture
});
const plane = new THREE.Mesh(planeGeometry,planeMaterial);
scene.add(plane);
texture.offset.set(0.5,0.5);

texture.repeat.set(4,4);
// texture.wrapS = THREE.RepeatWrapping;
texture.wrapS = THREE.MirroredRepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.center.set(0.5,0.5);
texture.rotation = Math.PI / 4;


const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);


window.addEventListener('resize',() => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth,window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
})



const control = new OrbitControls(camera, renderer.domElement);

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
