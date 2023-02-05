import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


const scene = new THREE.Scene();

// 添加光源
const directionalLight = new THREE.DirectionalLight(0xffffff,0.8);
directionalLight.position.set(400, 200, 300);
scene.add(directionalLight);

const directionalLight2 = new THREE.DirectionalLight(0xffffff,0.8);
directionalLight2.position.set(-400, -200, -300);
scene.add(directionalLight2);

// 环境光
const ambient = new THREE.AmbientLight(0xffffff,0.3);
scene.add(ambient);

// 三维坐标轴
const axesHelper = new THREE.AxesHelper(250);
scene.add(axesHelper);

const model = new THREE.Group();
const geometry = new THREE.PlaneGeometry(100,100);
const material = new THREE.MeshLambertMaterial({
  color:0x00ffff,
  map:new THREE.TextureLoader().load('https://tugua.oss-cn-hangzhou.aliyuncs.com/model/%E6%89%AB%E6%8F%8F%E9%9B%B7%E8%BE%BE.png'),
  side:THREE.DoubleSide,
  transparent: true,
  depthTest:false
});

const mesh = new THREE.Mesh(geometry,material);
const material2 = new THREE.MeshLambertMaterial({
  color:0x00cccc,
  map:new THREE.TextureLoader().load('https://tugua.oss-cn-hangzhou.aliyuncs.com/model/%E9%9B%B7%E8%BE%BE%E5%88%BB%E5%BA%A6.png'),
  transparent:true,
  depthTest:false
});

const mesh2 = new THREE.Mesh(geometry,material2);
mesh2.rotateX(-Math.PI / 2);
mesh2.add(mesh);
model.add(mesh2);
scene.add(model);

function rotateAnimation() {
  mesh.rotateZ(0.02);
  requestAnimationFrame(rotateAnimation);
}

rotateAnimation();

function plane() {
  const gridHelper = new THREE.GridHelper(300,15,0x003333,0x003333);
  model.add(gridHelper);

  const geometry = new THREE.PlaneGeometry(310,310);
  const material = new THREE.MeshLambertMaterial({
    color:0xffffff,
    transparent: true,
    opacity: 0.1,
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(geometry,material);
  mesh.position.y = -1;
  model.add(mesh);
  mesh.rotateX(-Math.PI / 2);
}

plane();


const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(30, width / height,1,3000);
camera.position.set(292,223,185);
camera.lookAt(scene.position);

// 创建渲染器
const renderer = new THREE.WebGLRenderer({
  antialias:true
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width,height);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera,renderer.domElement);

window.onresize = function() {
  renderer.setSize(window.innerWidth,window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

function render() {
  renderer.render(scene,camera);
  requestAnimationFrame(render);
}

render();
