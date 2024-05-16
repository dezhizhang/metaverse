/*
 * :file description:
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2024-05-17 06:50:31
 */
import dat from 'dat.gui';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader.js';

//创建场影
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(200, 200, 200);
camera.lookAt(0, 0, 0);

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(100, 60, 50);
scene.add(directionalLight);

// scene.add(new THREE.CameraHelper(directionalLight.shadow.camera));

// const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight)

// scene.add(directionalLightHelper);

const ambient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambient);

// 初始化渲染器
const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.shadowMap.enabled = true;
// 设置渲染器大小
renderer.setSize(window.innerWidth, window.innerHeight);

// const p1 = new THREE.Vector3(100, 25, 0);
// const p2 = new THREE.Vector3(100, -25, 25);
// const p3 = new THREE.Vector3(100, -25, -25);

// const geometry = new THREE.BufferGeometry(); //创建一个几何体对象
// //类型数组创建顶点数据
// const vertices = new Float32Array([
//   100, 25, 0, //顶点1坐标
//   100, -25, 25, //顶点2坐标
//   100, -25, -25, //顶点3坐标
// ]);
// // 创建属性缓冲区对象
// const attribue = new THREE.BufferAttribute(vertices, 3); //3个为一组，表示一个顶点的xyz坐标
// // 设置几何体attributes属性的位置属性
// geometry.attributes.position = attribue;

// const material = new THREE.MeshBasicMaterial({
//   color: 0x00ffff, //材质颜色
//   side: THREE.FrontSide, //默认只有正面可见
//   // side: THREE.BackSide, //设置只有背面可见
//   // side: THREE.DoubleSide, //两面可见
// });
// // 网格模型本质：一个一个三角形(面)构成
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

// const ray = new THREE.Ray();
// ray.origin = new THREE.Vector3(0, 0, 0);
// ray.direction = new THREE.Vector3(1, 0, 0).normalize();

// const point = new THREE.Vector3();


// const result = ray.intersectTriangle(p1,p2,p3,false,point);

// console.log({result,point});


const p1 = new THREE.Vector3(100,25,0);
const p2 = new THREE.Vector3(100,-25.25);




const controls = new OrbitControls(camera, renderer.domElement);

window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

document.body.append(renderer.domElement);

function render() {
  requestAnimationFrame(render);
  // composer.render();
  renderer.render(scene, camera);
}

render();
