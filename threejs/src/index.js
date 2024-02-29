import * as THREE from 'three';
import vertexShader from './shader/water/vertex.glsl';
import fragmentShader from './shader/water/fragment.glsl';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


const clock = new THREE.Clock();
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75,window.innerWidth/ window.innerHeight,0.1,10000);
camera.position.set(0,0,10);
scene.add(camera);



const shaderMaterial = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader
});


const geometry = new THREE.PlaneGeometry();

const floor = new THREE.Mesh(geometry,shaderMaterial);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera,renderer.domElement);


const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);


window.addEventListener('resize',function() {
  camera.aspect = window.innerWidth / this.window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth,window.innerHeight);
})

function render() {
  requestAnimationFrame(render);
  renderer.render(scene,camera);
}

render();



