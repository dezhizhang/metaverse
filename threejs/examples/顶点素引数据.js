import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(30,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(200,200,200);
camera.lookAt(scene.position);


const renderer = new THREE.WebGLRenderer({
  antialias:true,
});
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array([
  0,0,0,
  80,0,0,
  80,80,0,
  0,80,0
]);

const attribute = new THREE.BufferAttribute(vertices,3);
geometry.attributes.position = attribute;

const indexes = new Uint16Array([
  0,1,2,0,2,3
]);

geometry.index = new THREE.BufferAttribute(indexes,1);

const material = new THREE.MeshBasicMaterial({
  color:0x00ff00,
  side:THREE.DoubleSide
});


const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);


const controls = new OrbitControls(camera,renderer.domElement);



function render() {
  requestAnimationFrame(render);
  renderer.render(scene,camera);
}

render();


document.body.appendChild(renderer.domElement);










