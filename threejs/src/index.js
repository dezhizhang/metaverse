import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import vertexShader from './light_vertex.glsl.js'
import fragmentShader from './light_fragment.glsl.js'


const scene = new THREE.Scene();

// 平行光1
const directionalLight = new THREE.DirectionalLight(0xffffff,0.8);
directionalLight.position.set(400, 200, 300);
scene.add(directionalLight);

// 平行光2
const directionalLight2 = new THREE.DirectionalLight(0xffffff,0.8);
directionalLight2.position.set(-400, -200, -300);
scene.add(directionalLight2);

// 环境光
const ambient = new THREE.AmbientLight(0xffffff,0.3);
scene.add(ambient);


const axesHelper = new THREE.AxesHelper(300);
scene.add(axesHelper);

// 声明一个组对象
const model = new THREE.Group();
const geometry = new THREE.SphereGeometry(40, 30,30);
const material = new THREE.ShaderMaterial({
  vertexShader:vertexShader,
  fragmentShader:fragmentShader,
  transparent:true
});

const mesh = new THREE.Mesh(geometry,material);
model.add(mesh);
mesh.position.y = 40;
scene.add(model);


function plane() {
  const gridHelper = new THREE.GridHelper(300,15, 0x003333, 0x003333);
  model.add(gridHelper);
  const geometry = new THREE.PlaneGeometry(310,310);
  const material = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    transparent:true,
    opacity: 0.1,
    side:THREE.DoubleSide
  });
  const mesh = new THREE.Mesh(geometry,material);
  gridHelper.position.y = -0.1;
  model.add(mesh);
  mesh.rotateX(-Math.PI / 2);
}

plane();


const width = window.innerWidth;
const height = window.innerHeight;
const camera = new THREE.PerspectiveCamera(30, width / height,1,3000);
camera.lookAt(scene.position);

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


