/*
 * :file description: 
 * :name: /threejs/examples/ShaderMaterial2.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-05-26 21:48:56
 * :last editor: 张德志
 * :date last edited: 2024-05-26 21:50:49
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

//创建场影
const scene = new THREE.Scene();

//创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);

// 设置相机位置
camera.position.set(200, 200, 200);
camera.lookAt(scene.position);

// 初始化渲染器
const renderer = new THREE.WebGLRenderer();

const vertexShader = `
  void main() {
    gl_Position = projectionMatrix * modelMatrix * viewMatrix * vec4(position,1.0);
  }
`;

const fragmentShader = `
  uniform float opacity;
  uniform vec3 u_color;
  void main() {
    gl_FragColor = vec4(u_color,opacity);
  }
`;

const geometry = new THREE.PlaneGeometry(100, 50);
const material = new THREE.ShaderMaterial({
  uniforms: {
    opacity: { value: 0.5 },
    u_color: { value: new THREE.Color(0x00ffff) },
  },
  vertexShader,
  fragmentShader,
  side: THREE.DoubleSide,
  transparent: true,
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// 设置渲染器大小
renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, renderer.domElement);

document.body.append(renderer.domElement);

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();