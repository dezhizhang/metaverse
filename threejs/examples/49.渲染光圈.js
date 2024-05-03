/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2022-07-12 07:44:44
 * :last editor: 张德志
 * :date last edited: 2023-01-10 06:45:33
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const geometry = new THREE.PlaneBufferGeometry(60,60);
const textureLoader = new THREE.TextureLoader();
const material = new THREE.MeshBasicMaterial({
  map:textureLoader.load('/%E8%B4%B4%E5%9B%BE.png'),
  transparent:true,
  side:THREE.DoubleSide
});

const mesh = new THREE.Mesh(geometry,material);
mesh.rotateX(-Math.PI / 2);
scene.add(mesh);

const gridHelper = new THREE.GridHelper(300,25,0x004444,0x004444);
gridHelper.position.y = -0.5;
scene.add(gridHelper);

const axesHelper = new THREE.AxesHelper(300);
scene.add(axesHelper);
axesHelper.position.y = -0.2;

var width = window.innerWidth; //窗口宽度
var height = window.innerHeight; //窗口高度
var k = width / height; //窗口宽高比
var s = 150; //三维场景显示范围控制系数，系数越大，显示的范围越大
//创建相机对象
var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
camera.position.set(200, 300, 200); //设置相机位置
// camera.position.set(0, 0, 200); //设置相机位置
camera.lookAt(scene.position); //设置相机方向(指向的场景对象)

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width,height);
document.body.appendChild(renderer.domElement);

function render() {
  renderer.render(scene,camera);
  requestAnimationFrame(render);
}

render();

const controls = new OrbitControls(camera,renderer.domElement);
