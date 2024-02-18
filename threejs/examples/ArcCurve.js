
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

// 平行光1
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.position.set(400, 200, 300);
scene.add(directionalLight);

// 平行光2
const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight2.position.set(-400, -200, -300);
scene.add(directionalLight2);

// 环境光
const ambient = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambient);

const width = window.innerWidth;
const height = window.innerHeight;

const k = width / height;
const s = 200;

const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
camera.position.set(200, 300, 200);
camera.lookAt(scene.position);

// 创建渲染器对象
const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setSize(width, height);
renderer.setPixelRatio(window.devicePixelRatio);

document.body.appendChild(renderer.domElement);

function render() {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();

const axesHelper = new THREE.AxesHelper(250);
scene.add(axesHelper);

const geometry = new THREE.BufferGeometry();
const arc = new THREE.ArcCurve(0, 0, 50, 0, 2 * Math.PI);
const points = arc.getSpacedPoints(50);
geometry.setFromPoints(points);

const material = new THREE.LineBasicMaterial({
  color: 0x00ffff,
});
const line = new THREE.Line(geometry, material);
scene.add(line);

const controls = new OrbitControls(camera, renderer.domElement);

export { scene, renderer, camera };
