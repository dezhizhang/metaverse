/*
 * :file description: 
 * :name: /threejs/examples/生成环形带.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-07 11:41:54
 * :last editor: 张德志
 * :date last edited: 2024-04-07 11:41:55
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//创建场影
const scene = new THREE.Scene();
//创建相机
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);
// 设置相机位置
camera.position.set(200,200,200);


const ambientLight = new THREE.AmbientLight(0xffffff,1);
scene.add(ambientLight);

const c = [
  0,0,
  60,0,
  60,80,
  40,120,
  -20,80,
  0,0
];

const geometry = new THREE.BufferGeometry();
const pointsArr = [];
const height = 20;


for(let i=0;i < c.length - 2;i+=2) {
  pointsArr.push(c[i],c[i + 1],0,c[i + 2],c[i + 3],0,c[i + 2],c[i + 3],height);
  pointsArr.push(c[i],c[i + 1],0,c[i + 2],c[i + 3],height,c[i],c[i + 1],height);
}

geometry.attributes.position = new THREE.BufferAttribute(new Float32Array(pointsArr),3);
geometry.computeVertexNormals();

const material = new THREE.MeshLambertMaterial({
  color:0xffff00,
  side:THREE.DoubleSide
});

const mesh = new THREE.Mesh(geometry,material);
mesh.rotateX(Math.PI / 2);
scene.add(mesh);


const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);



// 初始化渲染器
const renderer = new THREE.WebGL1Renderer();

// 设置渲染器大小
renderer.setSize(window.innerWidth,window.innerHeight);

document.body.append(renderer.domElement);
const controls = new OrbitControls(camera,renderer.domElement);

window.addEventListener('resize',() => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth,window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
})


function render() {
  requestAnimationFrame(render);
  renderer.render(scene,camera);
}

render();




