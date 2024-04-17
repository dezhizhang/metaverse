/*
 * :file description: 
 * :name: /threejs/examples/信号波.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-17 08:51:02
 * :last editor: 张德志
 * :date last edited: 2024-04-17 08:51:07
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//创建场影
const scene = new THREE.Scene();

//创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(200, 200, 200);

const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
scene.add(ambientLight);

const geometry = new THREE.PlaneGeometry(100,100);
geometry.translate(-100 / 2,0,0);
const material = new THREE.MeshLambertMaterial({
  map:new THREE.TextureLoader().load('/信号波.png'),
  color:0x00ffff,
  transparent:true,
  side:THREE.DoubleSide
});

const plane = new THREE.Mesh(geometry,material);
scene.add(plane);

let S = 300;
let s = 1.0;


function animation() {
  s += 5;
  plane.scale.set(s,s,s);
  if(s < S *0.2) {
    plane.material.opacity = (s - 1) / (s * 0.2 -1);
  }else if(s > S * 0.2 && s <=S) {
    plane.material.opacity = 1 - (s - S * 0.2) / (S - S * 0.2);
  }else {
    s = 1.0;
  }

  requestAnimationFrame(animation);
}

animation();


const gridHelper = new THREE.GridHelper(500, 15, 0x003333, 0x003333);
scene.add(gridHelper);

// 初始化渲染器
const renderer = new THREE.WebGL1Renderer();

// 设置渲染器大小
renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, renderer.domElement);

document.body.append(renderer.domElement);

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

function render() {
  // mesh.rotateZ(0.02);
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
