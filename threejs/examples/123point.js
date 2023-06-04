/*
 * :file description:
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2023-06-04 15:37:29
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// 创建场影
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(
    75,window.innerWidth / window.innerHeight,0.1,1000
);
camera.position.set(0,0,10);
scene.add(camera);


const sphereGeometey = new THREE.SphereGeometry(3,20,20);
const pointMaterial = new THREE.PointsMaterial();
pointMaterial.size = 0.06;
const points = new THREE.Points(sphereGeometey,pointMaterial);

scene.add(points);



const light = new THREE.AmbientLight(0xffffff,0.5);
scene.add(light);

const  pointLight = new THREE.SpotLight(0xff0000,1);
pointLight.position.set(2,2,2);
pointLight.castShadow = true;
pointLight.shadow.radius = 5;
scene.add(pointLight);


// 初始化渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);

document.body.appendChild(renderer.domElement);


const controls = new OrbitControls(camera,renderer.domElement);
controls.enableDamping = true;


const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);


function render() {
    controls.update();
    renderer.render(scene,camera);
    requestAnimationFrame(render);
}

render();

window.addEventListener('resize',() => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
})

