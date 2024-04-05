/*
 * :file description: 
 * :name: /threejs/examples/uv贴图.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-05 21:26:32
 * :last editor: 张德志
 * :date last edited: 2024-04-05 21:26:32
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(200, 200, 200);
camera.lookAt(scene.position);

const textureLoder = new THREE.TextureLoader();
const texture = textureLoder.load('/earth.png');

const geometry = new THREE.SphereGeometry(60, 25, 25);

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D map;
  varying vec2 vUv;
  void main() {
    gl_FragColor = texture2D(map,vUv);
  }
`;

const material = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    map: { value: texture },
  },
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);


const ambientLight = new THREE.AmbientLight(0xffffff,1);
scene.add(ambientLight);


const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, renderer.domElement);

document.body.appendChild(renderer.domElement);

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
