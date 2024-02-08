// 引入Three.js
import * as THREE from 'three';
// 引入Three.js扩展库
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { earth } from './earth.js'//绘制地球


const scene = new THREE.Scene();
scene.add(earth);

// 平行光1
const directionalLight = new THREE.DirectionalLight(0xffffff,0.6);
directionalLight.position.set(400,200,300);
scene.add(directionalLight);

// 平行光2
const directionalLight2 = new THREE.DirectionalLight(0xffffff,0.6);
directionalLight2.position.set(-400,-200,-300);
scene.add(directionalLight2);

// 环境光
const ambient = new THREE.AmbientLight(0xffffff,0.6);
scene.add(ambient);

const width = window.innerWidth; //窗口文档显示区的宽度
const height = window.innerHeight;//窗口文档显示区的高度

// 相机设置
const k = width;
const s = 200;
const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
camera.position.set(200, 300, 200);
camera.lookAt(0,0,0);

// 创建渲染器对象
const renderer = new THREE.WebGLRenderer({
	antialias: true, //开启锯齿
});
renderer.setPixelRatio(window.devicePixelRatio); // /设置设备像素比率,防止Canvas画布输出模糊。
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setClearColor(0xb9d3ff,1);
document.body.appendChild(renderer.domElement);

function render() {
	renderer.render(scene,camera);
	requestAnimationFrame(render);
}

render();

const axesHelper = new THREE.AxesHelper(250);
scene.add(axesHelper);


const controls = new OrbitControls(camera,renderer.domElement);

document.body.appendChild(renderer.domElement);
