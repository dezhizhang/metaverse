/*
 * :file description: 
 * :name: /threejs/examples/颜色差值计算.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-05 17:51:24
 * :last editor: 张德志
 * :date last edited: 2024-04-05 17:51:25
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(200, 200, 200);
camera.lookAt(scene.position);

const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array([-25, 0, 0, 25, 0, 0, 0, 40, 0]);

geometry.attributes.position = new THREE.BufferAttribute(vertices, 3);

const colors = new Float32Array([1, 0, 0, 0, 0, 1, 0, 1, 0]);
geometry.attributes.color = new THREE.BufferAttribute(colors, 3);

const vertexShader = `
  varying vec3 vColor;
  void main() {
    // 投影矩阵 * 模型矩阵 * 视图矩阵
    vColor = color;
    gl_Position = projectionMatrix * modelMatrix * viewMatrix * vec4(position,1.0);
  }
`;

const fragmentShader = `
varying vec3 vColor;
  void main() {
    gl_FragColor = vec4(vColor,1.0);
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
