/*
 * :file description:
 * :name: /physics/src/index.js
 * :author:张德志
 * :copyright: (c) 2024, Xiaozhi
 * :date created: 2024-12-04 06:44:13
 * :last editor: 张德志
 * :date last edited: 2024-12-11 07:28:40
 */
import * as THREE from "three";
import * as CANNON from "cannon-es";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

let physics = [];
let meshs = [];

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);


camera.position.set(1, 2, 10);

// 创建物理球
const world = new CANNON.World();
world.gravity.set(0, -9.82, 0);
world.allowSleep = true;



// 创建渲染器
const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);

// 创建物理平面
const groundShape = new CANNON.Plane();
const groundBody = new CANNON.Body({
  mass:0,
  shape: groundShape,
  material: new CANNON.Material,
});

groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0), -Math.PI / 2);
world.addBody(groundBody);
physics.push(groundBody);

const groundMesh = new THREE.Mesh(
  new THREE.PlaneGeometry(100,100),
  new THREE.MeshBasicMaterial({
    color:0x00ff00
  })
)
groundMesh.rotation.x = -Math.PI / 2;
scene.add(groundMesh);
meshs.push(groundMesh);



// 创建车身
const chassisShape = new CANNON.Box(
  new CANNON.Vec3(5,0.5,2)
);

const chassisBody = new CANNON.Body({
  mass:1,
  shape:chassisShape
});
chassisBody.position.set(0,1,0);
world.addBody(chassisBody);

// threejs车身
const chassisMesh = new THREE.Mesh(
  new THREE.BoxGeometry(10,1,4),
  new THREE.MeshBasicMaterial({
    color:0x660066
  })
);
scene.add(chassisMesh);
meshs.push(chassisMesh);
physics.push(chassisBody);

// 创建刚性车轮
const vehicle = new CANNON.RigidVehicle({
  chassisBody
});

// 创建轮子
const wheelShape = new CANNON.Sphere(1.5);
const wheelBody = new CANNON.Body({
  mass:1,
  shape: wheelShape,
});

vehicle.addWheel({
  body:wheelBody,
  position: new CANNON.Vec3(-3,-0.5,3.5),
  // 轮子旋转轴
  axis: new CANNON.Vec3(0,0,-1),
  direction: new CANNON.Vec3(0,-1,0)
});
world.addBody(wheelBody);

// 添加three轮子
const wheelMesh1 = new THREE.Mesh(
  new THREE.SphereGeometry(1.5,20,20),
  new THREE.MeshBasicMaterial({
    color:0x66000
  })
);
scene.add(wheelMesh1);
meshs.push(wheelMesh1);

// 添加第二个车轮
const wheelMesh2 = new CANNON.Body({
  mass:1,
  shape:wheelShape
});

vehicle.addWheel({
  body: wheelMesh2,
  position: new CANNON.Vec3(4,-0.5,3.5),
  axis: new CANNON.Vec3(0,0,-1),
  direction: new CANNON.Vec3(0,-1,0)
});
world.addBody(wheelMesh2);
physics.push(wheelMesh2);
scene.add(wheelMesh2);
meshs.push(wheelMesh2);




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
  renderer.render(scene, camera);

  const delta = clock.getDelta();
  world.step(1 / 60, delta);

  for (let i = 0; i < physics.length; i++) {
    meshs[i].position.copy(physics[i].position);
    meshs[i].quaternion.copy(physics[i].quaternion);
  }

  requestAnimationFrame(render);
}

render();

document.body.appendChild(renderer.domElement);
