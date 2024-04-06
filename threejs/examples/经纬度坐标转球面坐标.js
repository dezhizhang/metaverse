/*
 * :file description: 
 * :name: /threejs/examples/经纬度坐标转球面坐标.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-06 10:51:33
 * :last editor: 张德志
 * :date last edited: 2024-04-06 10:51:34
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { lon2xyz } from './math';

const scene = new THREE.Scene();

const width = window.innerWidth;
const height = window.innerHeight;

const k = width / height;
const s = 200;
const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
camera.position.set(200, 300, 200);
camera.lookAt(scene.position);

// 灯光
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
directionalLight1.position.set(400, 200, 300);
scene.add(directionalLight1);

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
directionalLight2.position.set(-400, -200, -300);
scene.add(directionalLight2);


const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('/earth.png');
texture.colorSpace = THREE.SRGBColorSpace;
const geometry = new THREE.SphereGeometry(100,40,40);
const material = new THREE.MeshLambertMaterial({
  map:texture
});
const sphere = new THREE.Mesh(geometry,material);
scene.add(sphere);

const {x,y,z} = lon2xyz(100,113.5,34.5);

const geometry1 = new THREE.SphereGeometry(1,25,25);
const material1 = new THREE.MeshLambertMaterial({
  color:0xff0000
});
const mesh = new THREE.Mesh(geometry1,material1);
mesh.position.set(x,y,z);
scene.add(mesh);




const axesHelper = new THREE.AxesHelper(200);
scene.add(axesHelper);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, renderer.domElement);

document.body.appendChild(renderer.domElement);

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
