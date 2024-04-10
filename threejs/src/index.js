/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-07 13:40:22
 * :last editor: 张德志
 * :date last edited: 2024-04-10 21:29:46
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//创建场影
const scene = new THREE.Scene();
//创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// 设置相机位置
camera.position.set(200, 200, 200);
camera.lookAt(scene.position);

const geometry = new THREE.BoxGeometry(6,40,6);
const material = new THREE.MeshLambertMaterial({
  color:0x0000ff
});
const mesh = new THREE.Mesh(geometry,material);
mesh.name = 'Box';
scene.add(mesh);


const posTrack = new THREE.KeyframeTrack('Box.position',[0,20],[0,0,0,0,200,0]);
const clip = new THREE.AnimationClip('default',20,[posTrack]);

const mixer = new THREE.AnimationMixer(mesh);
const AnimationAction = mixer.clipAction(clip);

AnimationAction.play();

scene.add(new THREE.AxesHelper(200));

scene.add(new THREE.AmbientLight(0xffffff,1));

const btn = document.getElementById('btn');
btn.addEventListener('click',() => {

})








const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

// 初始化渲染器
const renderer = new THREE.WebGLRenderer();

// 设置渲染器大小
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.append(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
});

const clock = new THREE.Clock();

function render() {
  mixer.update(clock.getDelta());
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
