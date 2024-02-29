import * as THREE from 'three';
import vertexShader from './shader/deep/vertex.glsl';
import fragmentShader from './shader/deep/fragment.glsl';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


const clock = new THREE.Clock();

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(0,0,10);
scene.add(camera);

const textureLoader = new THREE.TextureLoader();
const uTexture = textureLoader.load('./01.jpg');

const geometry = new THREE.PlaneGeometry(1,1,64,64);

const shaderMaterial = new THREE.RawShaderMaterial({
  vertexShader,
  fragmentShader,
  side:THREE.DoubleSide,
  wireframe:true,
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
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth,window.innerHeight);
});

function render() {
  requestAnimationFrame(render);
  // const elapsedTime = clock.getElapsedTime();
  // shaderMaterial.uniforms.uTime.value = elapsedTime;
  renderer.render(scene,camera);
}

render();

