import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// 创建场影
const scene = new THREE.Scene();

// 平行光
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(400, 200, 300);
scene.add(directionalLight);

// 平行光2
const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight2.position.set(-400, -200, -300);
scene.add(directionalLight2);

// 环境光
const ambient = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambient);

// 三维坐标轴
const axesHelper = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(axesHelper);

const model = new THREE.Group();
const W = 50;
const geometry = new THREE.PlaneGeometry(5000, W);
const material = new THREE.MeshLambertMaterial({
  color: 0x001111, //颜色
});
const mesh = new THREE.Mesh(geometry, material);
model.add(mesh);
scene.add(model);

const mesh2 = mesh.clone();
const texLoa = new THREE.TextureLoader();
const texture = texLoa.load(
  'https://tugua.oss-cn-hangzhou.aliyuncs.com/model/%E8%B7%AF%E9%9D%A2%E6%B5%81%E5%85%89.png',
);

// 设置阵列模式为 RepeatWrapping
texture.wrapS = THREE.RepeatWrapping;
texLoa.wrapT = THREE.RepeatWrapping;
texture.repeat.x = 10;

mesh2.material = new THREE.MeshLambertMaterial({
  color: 0x00ffff, //颜色
  map:texture,
  transparent:true,
  depthTest:false,
});
mesh2.material.color.set(0xffd700);
mesh2.scale.y *=0.1;
model.add(mesh2);
mesh2.position.y = W / 4;



var mesh3 = mesh2.clone();
mesh3.material = mesh2.material.clone();
mesh3.position.y = -W / 4;
var texture2 = texLoa.load(
  'https://tugua.oss-cn-hangzhou.aliyuncs.com/model/%E8%B7%AF%E9%9D%A2%E6%B5%81%E5%85%89.png',
);
// 设置阵列模式为 RepeatWrapping
texture2.wrapS = THREE.RepeatWrapping;
texture2.wrapT = THREE.RepeatWrapping;
texture2.repeat.x = 10; // x方向阵列
mesh3.material.map = texture2;
mesh3.material.color.set(0x00ffff);
model.add(mesh3);

function flowAnimation() {
  requestAnimationFrame(flowAnimation);
  //光带流动效果
  texture.offset.x -= 0.02;
  texture2.offset.x += 0.02;
}
flowAnimation();

mesh.renderOrder = 0;
mesh2.renderOrder = 10;
mesh3.renderOrder = 10;

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(30, width / height,1,3000);
camera.position.set(3.27, -820, 543);
camera.lookAt(scene.position);

// 创建渲染器
const renderer = new THREE.WebGLRenderer({
  antialias:true
})
renderer.setSize(width,height);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera,renderer.domElement);

window.onresize = function() {
  renderer.setSize(window.innerWidth,window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}


function render() {
  renderer.render(scene,camera);
  requestAnimationFrame(render);
}

render();
