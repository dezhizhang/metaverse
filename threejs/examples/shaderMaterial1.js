/*
 * :file description: 
 * :name: /threejs/examples/shaderMaterial1.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-05 11:50:31
 * :last editor: 张德志
 * :date last edited: 2024-04-05 11:50:32
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(scene.position);



const vertexShader = `
 void main() {
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position,1.0);
 }
`;

const fragmentShader = `
 void main() {
  gl_FragColor = vec4(1.0,1.0,0.0,1.0);
 }
`;

const planeGeometry = new THREE.PlaneGeometry(1,1);
const planeMaterial = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  side:THREE.DoubleSide
});

const mesh = new THREE.Mesh(planeGeometry,planeMaterial);
scene.add(mesh);


const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, renderer.domElement);

document.body.appendChild(renderer.domElement);

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
