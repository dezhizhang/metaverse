
import * as THREE from 'three';
import vertexShader from './shader/baseic/vertex.glsl';
import fragmentShader from './shader/baseic/fragment.glsl';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);

camera.position.set(0,0,10);
scene.add(camera);

const geometry = new THREE.PlaneGeometry();

const shaderMaterial = new THREE.RawShaderMaterial({
  vertexShader,
  fragmentShader,
  side:THREE.DoubleSide,
});

const floor = new THREE.Mesh(geometry,shaderMaterial);
scene.add(floor);

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const controls = new OrbitControls(camera,renderer.domElement);

window.addEventListener('resize',function() {
  camera.aspect = window.innerWidth / this.window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth,window.innerHeight);
});

function render() {
  requestAnimationFrame(render);
  renderer.render(scene,camera);
}
render();



