/*
 * :file description: 
 * :name: /threejs/examples/颜色差值.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-05 20:00:11
 * :last editor: 张德志
 * :date last edited: 2024-04-05 20:00:12
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(200, 200, 200);
camera.lookAt(scene.position);

const geometry = new THREE.PlaneGeometry(100, 50);
const vertexShader = `
  varying vec3 vPosition;
  void main() {
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
  }
`;

const fragmentShader = `
  varying vec3 vPosition;
  void main() {
    // if(vPosition.y < 0.0) {
    //   gl_FragColor = vec4(1.0,0.0,0.0,1.0);
    // }else {
    //   gl_FragColor = vec4(0.0,0.0,1.0,1.0);
    // }

    float per = (vPosition.y + 25.0) / 50.0;
    gl_FragColor = vec4(per,1.0 - per,0.0,1.0);
  
  }
`;

const material = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  vertexColors: true,
  side: THREE.DoubleSide,
});

const mesh = new THREE.Mesh(geometry, material);
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
