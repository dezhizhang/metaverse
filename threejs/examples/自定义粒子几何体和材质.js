/*
 * :file description: 
 * :name: /threejs/examples/自定义粒子几何体和材质.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-22 06:28:27
 * :last editor: 张德志
 * :date last edited: 2024-04-22 06:28:28
 */
import dat from 'dat.gui';
import * as THREE from 'three';
import {
  BatchedParticleRenderer,
  ParticleSystem,
  IntervalValue,
  RandomColor,
  ConstantValue,
  RenderMode,
  SphereEmitter,
  HemisphereEmitter,
  CircleEmitter,
} from 'three.quarks';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//创建场影
const scene = new THREE.Scene();

//创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// 设置相机位置
camera.position.set(10, 10, 10);
scene.add(camera);

// 创建粒子系统
let batchRenderer = new BatchedParticleRenderer();
const texture = new THREE.TextureLoader().load('/texture/particle_default.png');

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({
  roughness:0.5,
  metalness:0.5,
  color:0x00ffff
});


const ambientLight = new THREE.AmbientLight(0xffffff,1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff,1);
directionalLight.position.set(10,10,10);
scene.add(directionalLight);




const particles = new ParticleSystem({
  instancingGeometry: geometry,
  duration: 5,
  looping: true,
  // 粒子开始的时间
  startLife: new IntervalValue(0, 1),
  // 粒子开始的速度
  startSpeed: new IntervalValue(0, 10),
  // 粒子开始的大小
  startSize: new IntervalValue(0.1, 0.1),
  startColor: new RandomColor(
    new THREE.Vector4(1, 0.91, 0.51, 1),
    new THREE.Vector4(1, 0.44, 0.16, 1),
  ),
  worldSpace: true,
  maxParticles: 1000,
  emissionOverTime: new ConstantValue(1000),
  material:material,
  renderMode: RenderMode.Mesh,
});
particles.emitter.name = 'particles';
scene.add(particles.emitter);
batchRenderer.addSystem(particles);

const gui = new dat.GUI();

const options = {
  emitParticles: function () {
    particles.emitEnded = false;
    particles.time = 0;
  },
};

gui.add(options, 'emitParticles');

scene.add(batchRenderer);

scene.add(new THREE.AxesHelper(100));

// 初始化渲染器
const renderer = new THREE.WebGLRenderer();

const controls = new OrbitControls(camera, renderer.domElement);

// 设置渲染器大小
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.append(renderer.domElement);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
});

const clock = new THREE.Clock();

function render() {
  const delta = clock.getDelta();
  requestAnimationFrame(render);
  renderer.render(scene, camera);

  if (batchRenderer) {
    batchRenderer.update(delta);
  }
}

render();
