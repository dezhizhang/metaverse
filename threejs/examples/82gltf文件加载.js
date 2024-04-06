

import * as THREE from 'three';
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//创建场景对象Scene
const scene = new THREE.Scene();
const loader = new GLTFLoader();
loader.load(' /%E4%B8%8A%E6%B5%B7%E5%A4%96%E6%BB%A9.glb',function(gltf) {
  scene.add(gltf.scene);

  const box3 = new THREE.Box3();
  box3.expandByObject(gltf.scene);

  console.log('查看包围盒box3',box3);

  const v3 = new THREE.Vector3();
  box3.getSize(v3);
  console.log('查看返回的包围盒尺寸',v3);

});

// 光源设置
const directionalLight = new THREE.DirectionalLight(0xffffff,0.8);
directionalLight.position.set(400,200,300);
scene.add(directionalLight);

// 平行光2
const directionalLight2 = new THREE.DirectionalLight(0xffffff,0.8);
directionalLight2.position.set(-400,-200,-300);
scene.add(directionalLight2);

// 环境光
const ambient = new THREE.AmbientLight(0xffffff,2.9);
scene.add(ambient);

// 三维坐标轴 三个坐标轴颜色RGB分别对应xyz轴
const axesHelper = new THREE.AxesHelper(300);
scene.add(axesHelper);

const width = window.innerWidth;
const height = window.innerHeight;

const fov = 30; //视场角度
const aspect = width / height;
const near = 1; //近裁截面
const far = 3000; //远裁截面

const camera = new THREE.PerspectiveCamera(fov,aspect,near,far);
camera.position.set(318,162,204);
camera.lookAt(0,0,0);


// 创建沉浸器
const renderer = new THREE.WebGLRenderer({
  antialias:true ////开启锯齿
});

//设置设备像素比率,防止Canvas画布输出模糊
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width,height);
document.body.appendChild(renderer.domElement);


function render() {
  renderer.render(scene,camera);
  requestAnimationFrame(render);
}

render();

const controls = new OrbitControls(camera,renderer.domElement);
