/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2023-09-13 06:38:54
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();


const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(0,0,10);
// scene.lookAt(0,0,0);

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.shadowMap.enabled = true;

document.body.appendChild(renderer.domElement);


const controls = new OrbitControls(camera,renderer.domElement);


// 创建球几何体
const sphereGeometry = new THREE.SphereGeometry(3,30,30);
// const material = new THREE.MeshBasicMaterial({color:0xff0000,wireframe:true});
const pointMaterial = new THREE.PointsMaterial();
pointMaterial.size = 0.01;
pointMaterial.color.set(0xff0000);

// 加入纹理
// const textureLoader = new THREE.TextureLoader();
// const texture = textureLoader.load('https://tugua.oss-cn-hangzhou.aliyuncs.com/model/point.png');
// pointMaterial.map = texture;
// pointMaterial.alphaMap = texture;
// pointMaterial.transparent = true;


// pointMaterial.sizeAttenuation = false;

const points = new THREE.Points(sphereGeometry,pointMaterial);
scene.add(points);


// const sphere = new THREE.Mesh(sphereGeometry,material);
// scene.add(sphere);





const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

function render() {
	requestAnimationFrame(render);
	renderer.render(scene,camera);
}

render();
