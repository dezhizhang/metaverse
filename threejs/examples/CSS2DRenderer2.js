/*
 * :file description: 
 * :name: /threejs/examples/CSS2DRenderer2.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-05-19 15:51:49
 * :last editor: 张德志
 * :date last edited: 2024-05-19 15:51:50
 */
import * as dat from 'dat.gui';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

//骨骼动画
//创建场影
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(200, 200, 200);
camera.lookAt(0, 0, 0);

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(100, 60, 50);
scene.add(directionalLight);

const ambient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambient);

// 初始化渲染器
const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.shadowMap.enabled = true;
// 设置渲染器大小
renderer.setSize(window.innerWidth, window.innerHeight);

const geometry = new THREE.BoxGeometry(40, 40, 40);
const material = new THREE.MeshBasicMaterial({
  color: 0x00ffff,
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);


const tag = document.createElement('div');
tag.style.background = '#ccc';
tag.style.color = '#fff';
tag.style.position = 'absolute';
tag.style.borderRadius = '4px';
tag.style.padding = '4px';
tag.innerHTML = '标签';

const objMesh = new CSS2DObject(tag);
scene.add(objMesh);

const css2dRenderer = new CSS2DRenderer();
css2dRenderer.domElement.style.position = 'absolute';
css2dRenderer.domElement.style.left = '0px';
css2dRenderer.domElement.style.top = '0px';
css2dRenderer.domElement.style.pointerEvents = 'none';
css2dRenderer.setSize(window.innerWidth,window.innerHeight);

document.body.appendChild(css2dRenderer.domElement);







const controls = new OrbitControls(camera, renderer.domElement);

window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  renderer.setSize(width, height);
  css2dRenderer.setSize(width,height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

document.body.append(renderer.domElement);

const clock = new THREE.Clock();

function render() {
  // const frameT = clock.getDelta();
  requestAnimationFrame(render);
  // composer.render();
  renderer.render(scene, camera);
  css2dRenderer.render(scene,camera);

}

render();
