/*
 * :file description:
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-07 14:25:08
 * :last editor: 张德志
 * :date last edited: 2024-04-21 21:05:35
 */

import * as THREE from 'three';
import { BatchedParticleRenderer, ParticleSystem,IntervalValue,RandomColor,ConstantValue,RenderMode } from 'three.quarks';
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

const particles = new ParticleSystem({
  duration: 5,
  looping: false,
  // 粒子开始的时间
  startLife:new IntervalValue(0,1),
  // 粒子开始的速度
  startSpeed:new IntervalValue(0,1),
  // 粒子开始的大小
  startSize: new IntervalValue(0.1,0.1),

  startColor: new RandomColor(
    new THREE.Vector4(1,0.91,0.51,1),
    new THREE.Vector4(1,0.44,0.16,1),
  ),
  worldSpace:true,
  maxParticles:1000,
  emissionOverTime:new ConstantValue(1000),
  material:new THREE.MeshBasicMaterial({
    map:texture,
    blending:THREE.AdditiveBlending,
    transparent:true,
    side:THREE.DoubleSide,
  }),
  renderMode:RenderMode.BillBoard,
});

particles.emitter.name = 'particles';
scene.add(particles.emitter);
batchRenderer.addSystem(particles)


scene.add(batchRenderer);

scene.add(new THREE.AxesHelper(100));

// 初始化渲染器
const renderer = new THREE.WebGLRenderer();

const controls = new OrbitControls(camera, renderer.domElement);

// 设置渲染器大小
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.append(renderer.domElement);

const clock = new THREE.Clock()

function render() {
  const delta = clock.getDelta()
  requestAnimationFrame(render);
  renderer.render(scene, camera);

  if(batchRenderer) {
    batchRenderer.update(delta)
  }
}

render();
