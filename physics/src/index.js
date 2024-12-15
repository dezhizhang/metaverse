/*
 * :file description:
 * :name: /physics/src/index.js
 * :author:张德志
 * :copyright: (c) 2024, Xiaozhi
 * :date created: 2024-12-04 06:44:13
 * :last editor: 张德志
 * :date last edited: 2024-12-16 06:58:17
 */
import * as THREE from "three";
import * as CANNON from "cannon-es";
import CannonDebugger from 'cannon-es-debugger';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);


camera.position.set(1, 200, 200);

// 创建物理球
const world = new CANNON.World();
world.gravity.set(0, -9.82, 0);
world.allowSleep = true;

const cannonDebugger = new CannonDebugger(scene, world,{
  onInit:(body, mesh)=> {
    if( body.shapes[0] instanceof CANNON.Plane) {
      mesh.scale.set(10,10,1)
    }
  
  }
});

// 创建渲染器
const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);

// 创建地面
// 添加环境光
const ambientLight = new THREE.AmbientLight(0xffffff);
const directionLight = new THREE.DirectionalLight(
  0xffffff,1
);
directionLight.position.set(0,100,50);
directionLight.castShadow = true;
scene.add(ambientLight,directionLight);


const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(100,100),
  new THREE.MeshStandardMaterial({
    color:0x303030,
    side:THREE.DoubleSide
  })
);
ground.receiveShadow = true;
ground.rotation.x = -Math.PI / 2;
scene.add(ground);


let objects = [];







scene.add(new THREE.AxesHelper(5));

// 添加控制器
const controls = new OrbitControls(camera, renderer.domElement);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
});

const clock = new THREE.Clock();


function render() {
  controls.update();
  cannonDebugger.update();
  renderer.render(scene, camera);

  const delta = clock.getDelta();

  objects.forEach(({body,mesh}) => {
    mesh.position.copy(body.position);
    mesh.quaternion.copy(body.quaternion);
  })

  world.step(1 / 60, delta);


  requestAnimationFrame(render);
}

render();

document.body.appendChild(renderer.domElement);
