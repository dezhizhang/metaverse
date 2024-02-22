
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//创建场影
const scene = new THREE.Scene();

//创建相机
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);

// 设置相机位置
camera.position.set(0,0,10);
scene.add(camera);

// 创建几何体
const cubeGeometry = new THREE.BoxGeometry(1,1,1);
const cubeMaterial = new THREE.MeshBasicMaterial({color:0xffff00});
const cube = new THREE.Mesh(cubeGeometry,cubeMaterial);
// cube.position.x = 2;
// cube.position.y = 3;
// cube.position.z = 1;


console.log(cube);


// 将几何体添加到场景中
scene.add(cube);

// 初始化渲染器
const renderer = new THREE.WebGL1Renderer();


// 设置渲染器大小
renderer.setSize(window.innerWidth,window.innerHeight);

document.body.append(renderer.domElement);


const axesHelper = new THREE.AxesHelper(250);
scene.add(axesHelper);

const controls = new OrbitControls(camera,renderer.domElement);

function render(){
  requestAnimationFrame(render);

  // 缩放
  // cube.scale.x += 0.001;
  // cube.scale.y += 0.001;
  // cube.scale.z += 0.001;

  // 旋转
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene,camera);

}




render();
