import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,10000);
camera.position.set(0,0,10);
scene.add(camera);

const textureLoader = new THREE.TextureLoader();
const snowflake = textureLoader.load('./snowflake1.png');

const geometry = new THREE.BufferGeometry();


const count = 5000;

const colors = new Float32Array(count * 3);
const positions = new Float32Array(count * 3);

for(let i=0;i < count * 3;i++) {
  colors[i] = new THREE.Color(0xffffff * Math.random());
  positions[i] = (Math.random()  - 0.5) * 100;
  
}

geometry.setAttribute('position',new THREE.BufferAttribute(positions,3));
geometry.setAttribute('color',new THREE.BufferAttribute(colors,3))


// const sphereGeometry = new THREE.SphereGeometry(3,30,30);
const pointMaterial = new THREE.PointsMaterial();
pointMaterial.size = 1;
pointMaterial.color.set(0xff0000);
pointMaterial.map = snowflake;
pointMaterial.alphaMap = snowflake;
pointMaterial.transparent = true;
pointMaterial.sizeAttenuation = true;
pointMaterial.depthWrite = false;
pointMaterial.vertexColors = true;
pointMaterial.blendAlpha = THREE.AdditiveBlending;

const sphere = new THREE.Points(geometry,pointMaterial);
scene.add(sphere);

const light = new THREE.AmbientLight(0xfffff);
scene.add(light);

const pointLight = new THREE.PointLight(0xfffff,0.5);
pointLight.position.set(3,3,3);
scene.add(pointLight);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;

const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);

function render() {
  requestAnimationFrame(render);
  renderer.render(scene,camera);
}

render();

const controls = new OrbitControls(camera,renderer.domElement);

document.body.appendChild(renderer.domElement);
