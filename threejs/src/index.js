import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { earth } from './earth'; // 绘制地球


const scene = new THREE.Scene();
scene.add(earth); // 地球插入场景中

// 平行光1
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
    renderer.render(scene,camera);
    requestAnimationFrame(render);
}

render();


const controls = new OrbitControls(camera,renderer.domElement);

