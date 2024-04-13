/*
 * :file description: 
 * :name: /threejs/project/手机展示加载.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-13 11:45:49
 * :last editor: 张德志
 * :date last edited: 2024-04-13 11:45:49
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';

let rotate = {
  bool: true,
};

let phoneMesh = null;

//创建场影
const scene = new THREE.Scene();
//创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
// 设置相机位置
camera.position.set(-28, -30, -205);

camera.lookAt(scene.position);

const textureLoader = new THREE.TextureLoader();

const dracoLoader = new DRACOLoader();
const gltfLoader = new GLTFLoader();
dracoLoader.setDecoderPath('/draco/');
gltfLoader.setDRACOLoader(dracoLoader);

const model = new THREE.Group();

gltfLoader.load('/手机.gltf', (gltf) => {
  const mesh = gltf.scene.getObjectByName('手机');
  phoneMesh = mesh;

  mesh.material = new THREE.MeshStandardMaterial({
    metalness: 1.0,
    roughness: 1.0,
    map: textureLoader.load('/model/basecolor.png'),
    roughnessMap: textureLoader.load('/model/roughness.png'),
    metalnessMap: textureLoader.load('/model/metallic.png'),
    normalMap: textureLoader.load('/model/normal.png'),
    alphaMap: textureLoader.load('/model/opacity.png'),

    transparent: true,
  });

  scene.add(gltf.scene);
});

const R = 60;
const geometry = new THREE.BufferGeometry();
const arc = new THREE.ArcCurve(0, 0, R, Math.PI / 2 + Math.PI / 6, Math.PI / 2 - Math.PI / 6);
const points = arc.getPoints(50);
geometry.setFromPoints(points);

const material = new THREE.LineBasicMaterial({
  color: 0xffffff,
});
const line = new THREE.Line(geometry, material);
line.rotateX(-Math.PI / 2);
line.position.y = -85;
scene.add(line);

const loader = new FontLoader();
loader.load('https://threejs.org/examples/fonts/helvetiker_bold.typeface.json', (font) => {
  const material = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
  });
  const shapes = font.generateShapes('abbc', 10);
  const geometry = new THREE.ShapeGeometry(shapes);
  const text = new THREE.Mesh(geometry, material);

  text.position.z = -R;
  text.position.x = -12;
  text.position.y = -85;

  scene.add(text);
});

const directionLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionLight.position.set(0, 50, 100);
scene.add(directionLight);

const directionLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
directionLight2.position.set(0, 50, -100);
scene.add(directionLight2);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

// 初始化渲染器
const renderer = new THREE.WebGLRenderer();

// 设置渲染器大小
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.append(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);
// controls.minDistance = 200;
// controls.maxDistance = 2000;

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
});

const mapTexture1 = textureLoader.load('/model/极光蓝.png');
const mapTexture2 = textureLoader.load('/model/幻夜黑.png');
const mapTexture3 = textureLoader.load('/model/珊瑚红.png');
const mapTexture4 = textureLoader.load('/model/极光蓝.png');
mapTexture1.flipY = false;
mapTexture2.flipY = false;
mapTexture3.flipY = false;
mapTexture4.flipY = false;

const map1 = document.getElementById('map1');
const map2 = document.getElementById('map2');
const map3 = document.getElementById('map3');
const map4 = document.getElementById('map4');

map1.addEventListener('click', () => {
  phoneMesh.material.map = mapTexture1;
});

map2.addEventListener('click', () => {
  phoneMesh.material.map = mapTexture2;
});

map3.addEventListener('click', () => {
  phoneMesh.material.map = mapTexture3;
});

map4.addEventListener('click', () => {
  phoneMesh.material.map = mapTexture4;
});

function render() {
  if (rotate.bool) {
    model.rotateY(0.01);
  }
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
