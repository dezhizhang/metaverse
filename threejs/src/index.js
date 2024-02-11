/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2021-01-13 18:38:16
 * :last editor: 张德志
 * :date last edited: 2024-02-11 15:18:08
 */
// 引入Three.js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { earth } from './earth.js'//绘制地球


const scene = new THREE.Scene();
scene.add(earth);

//  平行光1
const directionalLight = new THREE.DirectionalLight(0xffffff,0.6);
directionalLight.position.set(400, 200, 300);
scene.add(directionalLight);

// 平行光2
const directionalLight2 = new THREE.DirectionalLight(0xffffff,0.6);
directionalLight2.position.set(-400, -200, -300);
scene.add(directionalLight2);


// 环境光
const ambient = new THREE.AmbientLight(0xffffff,0.6);
scene.add(ambient);

// width和height用来设置Three.js输出Canvas画布尺寸，同时用来辅助设置相机渲染范围
const width = window.innerWidth;
const height = window.innerHeight;

const k = width / height;
const s = 120;
const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
camera.position.set(-102, 205, -342);
camera.lookAt(scene.position);

// 创建渲染器对象
const renderer = new THREE.WebGLRenderer({
    antialias: true, //开启锯齿
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width,height);
document.body.appendChild(renderer.domElement);


function render() {
    earth.rotateY(0.001);
    renderer.render(scene,camera);
    requestAnimationFrame(render);
}

render();

const axesHelper = new THREE.AxesHelper(250);
scene.add(axesHelper);

const controls = new OrbitControls(camera,renderer.domElement);

export {scene,renderer,camera};

