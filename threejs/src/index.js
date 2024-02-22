import gsap from 'gsap';
import *as dat from 'dat.gui';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//创建场影
const scene = new THREE.Scene();

const click = new THREE.Clock();

//创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// 设置相机位置
camera.position.set(0, 0, 10);
scene.add(camera);

// 创建几何体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
// cube.position.x = 2;
// cube.position.y = 3;
// cube.position.z = 1;

// cube.rotation.set(Math.PI / 4,0,0);

// console.log(cube);

// 将几何体添加到场景中
scene.add(cube);

// 初始化渲染器
const renderer = new THREE.WebGL1Renderer();

// 设置渲染器大小
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.append(renderer.domElement);

const axesHelper = new THREE.AxesHelper(250);
scene.add(axesHelper);

const controls = new OrbitControls(camera, renderer.domElement);
// 设置控制器阻尼
controls.enableDamping = true;

window.addEventListener('resize',onWindowResize);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth,window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

}

// 控制页面全屏
window.addEventListener('dblclick',function() {
  if(document.fullscreenElement) {
    document.webkitExitFullscreen();
  }
  renderer.domElement.requestFullscreen();

});

const gui = new dat.GUI();
gui.add(cube.position,"x").min(0).max(5).step(1).name('位置').onChange((value) => {
  cube.position.x = value;
});
gui.add(cube.rotation,'y').min(0).max(10).name('旋转').onChange((value) => {
  cube.rotation.y = value;
})






function render() {
  requestAnimationFrame(render);
  const delta = click.getDelta();

  // gsap.to(cube.position,{
  //   x:5,
  //   duration:5
  // });
  // gsap.to(cube.rotation,{
  //   x:Math.PI / 2,
  //   duration:5
  // });
  // controls.update();


  // cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

render();
