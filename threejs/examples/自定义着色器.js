/*
 * :file description: 
 * :name: /threejs/examples/自定义着色器.js
 * :author:张德志
 * :copyright: (c) 2024, Xiaozhi
 * :date created: 2024-12-22 05:20:48
 * :last editor: 张德志
 * :date last edited: 2024-12-22 05:20:49
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,1,1000);
camera.position.set(200,200,200);
camera.lookAt(scene.position);


const vertexShader = `
  void main() {
    gl_PointSize = 20.0;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
  }
`;

const fragmentShader = `
  void main() {
    gl_FragColor = vec4(1.0,0.0,0.0,1.0);
  }
`

const geometry = new THREE.PlaneGeometry(100,50);
const material = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
});

const mesh = new THREE.Points(geometry,material);
scene.add(mesh);

scene.add(new THREE.AxesHelper(100));


// 初始化渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);

const controls = new OrbitControls(camera, renderer.domElement);


function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();

document.body.append(renderer.domElement);
