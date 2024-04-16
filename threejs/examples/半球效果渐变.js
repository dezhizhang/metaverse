/*
 * :file description: 
 * :name: /threejs/examples/半球效果渐变.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-17 07:26:05
 * :last editor: 张德志
 * :date last edited: 2024-04-17 07:26:11
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//创建场影
const scene = new THREE.Scene();

//创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(200, 200, 200);

const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
scene.add(ambientLight);


const vertexShader = `
varying vec3 vNormal;
void main() {
  vNormal = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
}
`;

const fragmentShader = `
varying vec3 vNormal;
void main() {
  vec3 z = vec3(0.0,0.0,1.0);
  float x = abs(dot(vNormal,z));

  float alpha = pow(1.0 - x,2.0);
  gl_FragColor = vec4(vec3(0.0,1.0,1.0),alpha); 
}

`;


const geometry = new THREE.SphereGeometry(40,30,30);
const material = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  transparent:true
});

const mesh = new THREE.Mesh(geometry,material);
mesh.position.y = 40;
scene.add(mesh);



const gridHelper = new THREE.GridHelper(500,15,0x003333,0x003333);
scene.add(gridHelper);





// 初始化渲染器
const renderer = new THREE.WebGL1Renderer();

// 设置渲染器大小
renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, renderer.domElement);

document.body.append(renderer.domElement);

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

function render() {

  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
