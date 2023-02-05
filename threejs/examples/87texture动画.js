import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

// 光源设置
const directionalLight = new THREE.DirectionalLight(0xffffff,0.8);
directionalLight.position.set(400, 200, 300);
scene.add(directionalLight);

// 平行光2
const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(-400, -200, -300);
scene.add(directionalLight2);

// 环境兴
const ambient = new THREE.AmbientLight(0xffffff,0.3);
scene.add(ambient);

// 坐标系
const axesHelper = new THREE.AxesHelper(300);
scene.add(axesHelper);


const model = new THREE.Group();

const h = 20;

// var model = new THREE.Group(); //声明一个组对象，用来添加加载成功的三维场景

const c = [
  0, 0, //顶点1坐标
  60, 0, //顶点2坐标
  60, 80, //顶点3坐标
  40, 120, //顶点4坐标
  -20, 80, //顶点5坐标
  0, 0, //顶点6坐标  和顶点1重合
];

const posArr = [];
const uvArr = [];
for(let i=0;i < c.length - 2;i+=2) {
  posArr.push(c[i], c[i + 1], 0, c[i + 2], c[i + 3], 0, c[i + 2], c[i + 3], h);
  posArr.push(c[i], c[i + 1], 0, c[i + 2], c[i + 3], h, c[i], c[i + 1], h);

  uvArr.push(0, 0, 1, 0, 1, 1);
  uvArr.push(0, 0, 1, 1, 0, 1);
}


const geometry = new THREE.BufferGeometry();
geometry.attributes.position = new THREE.BufferAttribute(new Float32Array(posArr),3);
geometry.attributes.uv = new THREE.BufferAttribute(new Float32Array(uvArr),2);
geometry.computeVertexNormals();

const texture = new THREE.TextureLoader().load('https://tugua.oss-cn-hangzhou.aliyuncs.com/model/flow.png');
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;


function flowAnimation() {
  requestAnimationFrame(flowAnimation); 
  texture.offset.y -= 0.06;
}

flowAnimation();

const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
  map:texture,
  side:THREE.DoubleSide,
  depthTest:false
});

const mesh = new THREE.Mesh(geometry,material);
mesh.rotateX(-Math.PI / 2);
model.add(mesh);
scene.add(model);

function plane() {
  const gridHelper = new THREE.GridHelper(300,15, 0x003333, 0x003333);
  model.add(gridHelper);
  const geometry = new THREE.PlaneGeometry(310,310);
  const material = new THREE.MeshLambertMaterial({
    color:0xffffff,
    transparent: true,
    opacity:0.1,
    side:THREE.DoubleSide
  });
  const mesh = new THREE.Mesh(geometry,material);
  mesh.position.y = 1;
  model.add(mesh);
  mesh.rotateX(-Math.PI / 2);
}
plane(); //设置一个地面

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(30, width / height,1,3000);
camera.position.set(292, 223, 185);
camera.lookAt(scene.position);

//创建渲染对像
const renderer = new THREE.WebGLRenderer({
  antialias:true
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width,height);

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
