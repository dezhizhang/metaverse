/*
 * :file description: 
 * :name: /threejs/project/漫游动画.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-05-12 19:59:30
 * :last editor: 张德志
 * :date last edited: 2024-05-12 19:59:44
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//创建场影
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(90,window.innerWidth / window.innerHeight,1,1000);
camera.position.set(200,200,200);
camera.lookAt(0,0,0);


const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

const directionalLight = new THREE.DirectionalLight(0xffffff,1);
directionalLight.position.set(100,60,50);
scene.add(directionalLight);

const ambient = new THREE.AmbientLight(0xffffff,1);
scene.add(ambient);


const path = new THREE.CatmullRomCurve3([
  new THREE.Vector3(-50, 20, 90),
  new THREE.Vector3(-10, 40, 40),
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(60, -60, 0),
  new THREE.Vector3(90, -40, 60),
  new THREE.Vector3(120, 30, 30),
]);

const geometry = new THREE.TubeGeometry(path,200,5,30);

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('/diffuse.jpg');
texture.colorSpace = THREE.SRGBColorSpace;
texture.wrapS = THREE.RepeatWrapping;
texture.repeat.x = 10;

const material = new THREE.MeshLambertMaterial({
  map:texture,
  side:THREE.DoubleSide
});

const mesh = new THREE.Mesh(geometry,material);

scene.add(mesh);

// 获取一定数量的点
const pointsArr = path.getSpacedPoints(500);
console.log(pointsArr);


let i =0;
function animation() {

  if(i < pointsArr.length - 1) {
    camera.position.copy(pointsArr[i]);
    camera.lookAt(pointsArr[i + 1]);
    i+=1;
  }else {
    i = 0;
  }
}


// 初始化渲染器
const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
// 设置渲染器大小
renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(pointsArr[i + 1])

window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

document.body.append(renderer.domElement);


function render() {
  animation();
  requestAnimationFrame(render);  
  renderer.render(scene, camera);
}

render();
