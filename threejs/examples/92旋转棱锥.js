import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

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

// 三维坐标轴
const axesHelper = new THREE.AxesHelper(300);
scene.add(axesHelper);

function createConeMesh(size) {
  const height = size * 4;
  const geometry = new THREE.ConeGeometry(size,height,4);
  geometry.rotateX(-Math.PI / 2);
  geometry.translate(0,0,height / 2);
  const material = new THREE.MeshLambertMaterial({
    color:0x22ffcc
  });
  const mesh = new THREE.Mesh(geometry,material);

  function animation() {
    mesh.rotateZ(0.05);
    requestAnimationFrame(animation);
  }
  animation();
  return mesh;
}

const model = new THREE.Group();
const coneMesh = createConeMesh(10);
model.add(coneMesh);
scene.add(model);

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(30, width / height,1,3000);
camera.position.set(292,233,285);
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

