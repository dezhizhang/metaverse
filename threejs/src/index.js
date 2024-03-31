/*
 * :file description:
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-13 22:44:48
 * :last editor: 张德志
 * :date last edited: 2024-04-01 06:21:18
 */
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(10, 10, 10);
camera.lookAt(scene.position);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: 0x00ffff,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);



const effectComposer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene,camera);
effectComposer.addPass(renderPass);

const v2 = new THREE.Vector2(window.innerWidth,window.innerHeight);
const outlinePass = new OutlinePass(v2,scene,camera);
outlinePass.selectedObjects = [cube];
outlinePass.visibleEdgeColor.set(0xffff00);
// 描边的宽度
outlinePass.edgeThickness = 4;
// 描边亮度
outlinePass.edgeStrength = 6;
// 描边烁
outlinePass.pulsePeriod = 2;



effectComposer.addPass(outlinePass);




const controls = new OrbitControls(camera, renderer.domElement);

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
});

function render() {
  effectComposer.render();
  requestAnimationFrame(render);
}

render();
