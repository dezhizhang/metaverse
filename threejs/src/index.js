import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {  CSS2DObject, CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

const clock = new THREE.Clock();

const EARTH_RADIUS = 1;
const MOON_RADIUS = 0.27;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,2000);
camera.position.set(10,5,20);

scene.add(new THREE.AmbientLight(0xffffff,3));

const directionalLight = new THREE.DirectionalLight(0xffffff,3);
directionalLight.position.set(0,0,1);
scene.add(directionalLight);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);


const textureLoader = new THREE.TextureLoader();

const earthGeometry = new THREE.SphereGeometry(EARTH_RADIUS,16,16);
const earthMaterial = new THREE.MeshPhongMaterial({
  specular:0x333333,
  shininess:5,
  map:textureLoader.load('https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg'),
  specularMap:textureLoader.load('https://threejs.org/examples/textures/planets/earth_specular_2048.jpg'),
  normalMap:textureLoader.load('https://threejs.org/examples/textures/planets/earth_normal_2048.jpg'),
  normalScale:new THREE.Vector2(0.85, 0.85)
});
earthMaterial.map.colorSpace = THREE.SRGBColorSpace;
const earth = new THREE.Mesh(earthGeometry,earthMaterial);
scene.add(earth);

const moonGeometry = new THREE.SphereGeometry(MOON_RADIUS,16,16);
const moonMaterial = new THREE.MeshPhongMaterial({
  shininess: 5,
  map: textureLoader.load('https://threejs.org/examples/textures/planets/moon_1024.jpg'),
});
moonMaterial.map.colorSpace = THREE.SRGBColorSpace;
const moon = new THREE.Mesh(moonGeometry,moonMaterial);
scene.add(moon);

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

// 添加提示标签
const earthDiv = document.createElement('div');
earthDiv.className = 'label';
earthDiv.innerHTML = '地球';
const earthLabel = new CSS2DObject(earthDiv);
earthLabel.position.set(0,1,0);
earth.add(earthLabel);

const moonDiv = document.createElement('div');
moonDiv.className = 'label';
moonDiv.innerHTML = '月球';
const moonLabel = new CSS2DObject(moonDiv);
moonLabel.position.set(0,1,0);
moon.add(moonLabel);

// 实例化css2d渲染器
const labelRender = new CSS2DRenderer();
labelRender.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(labelRender.domElement);
labelRender.domElement.style.position = 'fixed';
labelRender.domElement.style.top = '0px';
labelRender.domElement.style.left = '0px';
labelRender.domElement.style.color = '#fff';
labelRender.domElement.style.zIndex = 10;

const controls = new OrbitControls(camera,labelRender.domElement);

window.addEventListener('resize',() => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth,window.innerHeight);
});

function render() {
  requestAnimationFrame(render);
  const elapsed = clock.getElapsedTime();

  moon.position.set(Math.sin(elapsed) * 5,0,Math.cos(elapsed) * 5);
  renderer.render(scene,camera);
  labelRender.render(scene,camera);
}

render();

