/*
 * :file description: 
 * :name: /threejs/examples/50缩放动画.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2022-07-12 07:44:44
 * :last editor: 张德志
 * :date last edited: 2023-01-10 07:02:54
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// * 创建场景对象Scene
const scene = new THREE.Scene();

const geometry = new THREE.PlaneBufferGeometry(60,60);
const textureLoader = new THREE.TextureLoader();
const material = new THREE.MeshBasicMaterial({
  color: 0x00ffff,//设置光圈颜色
  map: textureLoader.load('https://tugua.oss-cn-hangzhou.aliyuncs.com/%E8%B4%B4%E5%9B%BE.png'),
  transparent: true, //使用背景透明的png贴图，注意开启透明计算
});

const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);

const gridHelper = new THREE.GridHelper(300,25,0x004444,0x004444);
gridHelper.position.y = -0.5;
scene.add(gridHelper);
const axesHelper = new THREE.AxesHelper(300);
scene.add(axesHelper);
axesHelper.position.y = -0.2;

const width = window.innerWidth;
const height = window.innerHeight;
const k = width / height; //窗口宽高比
const s = 150; //三维场景显示范围控制系数，系数越大，显示的范围越大
//创建相机对象
const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
camera.position.set(200, 300, 200); //设置相机位置
// camera.position.set(0, 0, 200); //设置相机位置
camera.lookAt(scene.position); //设置相机方向(指向的场景对象)

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width,height);
document.body.appendChild(renderer.domElement);



 // 光圈大小在1~2.5倍之间变化
 var _s = 2.5;
 // 渲染函数
 function render() {
   _s += 0.01;
   mesh.scale.set(_s, _s, _s);
   mesh.material.opacity = 1 - (_s - 1) / 1.5;//缩放2.5对应0 缩放1.0对应1
   if (_s > 2.5) _s = 1;
   renderer.render(scene, camera); //执行渲染操作
   requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧
 }
 render();
 //创建控件对象  相机对象camera作为参数   控件可以监听鼠标的变化，改变相机对象的属性
 var controls = new OrbitControls(camera, renderer.domElement);