/*
 * :file description:
 * :name: /physics/src/index.js
 * :author:张德志
 * :copyright: (c) 2024, Xiaozhi
 * :date created: 2024-12-04 06:44:13
 * :last editor: 张德志
 * :date last edited: 2024-12-12 06:55:00
 */
import * as THREE from "three";
import * as CANNON from "cannon-es";
import CannonDebugger from 'cannon-es-debugger';
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

const cannonDebugger = new CannonDebugger(scene, world);




// 创建渲染器
const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);


// 创建物理地面
const groundShape = new CANNON.Box(
  new CANNON.Vec3(50,0.5,50)
);
const groundBody = new CANNON.Body({
  mass:0,
  shape: groundShape
});

world.addBody(groundBody);


// 创建threejs地面
const groundMesh = new THREE.Mesh(
  new THREE.BoxGeometry(100,1,100),
  new THREE.MeshBasicMaterial({
    color:0x888888
  })
);
scene.add(groundMesh);

// 创建车身
const chassisShape = new CANNON.Box(
  new CANNON.Vec3(2,0.5,1),
);
const chassisBody = new CANNON.Body({
  mass:150,
  shape: chassisShape,
});

chassisBody.position.set(0,5,0);
world.addBody(chassisBody);
physics.push(chassisBody);


// 创建threejs车身
const chassisMesh = new THREE.Mesh(
  new THREE.BoxGeometry(4,1,2),
  new THREE.MeshBasicMaterial({
    color:0x00ff00
  })
);
scene.add(chassisMesh);
meshs.push(chassisMesh);


// 创建具有悬架的车辆
const vehicle = new CANNON.RaycastVehicle({
  chassisBody:chassisBody,
});

// 设置车轮的配置
const wheelOptions = {
  radius:1,
  directionLocal:new CANNON.Vec3(0,-1,0),
  // 设置悬架的刚度
  suspensionStiffness:30,
  // 设置悬架的休息长度
  suspensionRestLength:0.3,
  // 设置车轮的滑动摩擦力
  frictionSlip:1.4,
  // 设置拉伸的阻尼
  dampingRelaxation:2.3,
  // 设置压缩的阻尼
  dampingCompression:4.4,
};

vehicle.addWheel(
  {
    ...wheelOptions,
    chassisConnectionPointLocal:new CANNON.Vec3(-1,0,1),
  }
);
vehicle.addWheel(
  {
    ...wheelOptions,
    chassisConnectionPointLocal:new CANNON.Vec3(-1,0,-1),
  }
);

vehicle.addWheel(
  {
    ...wheelOptions,
    chassisConnectionPointLocal:new CANNON.Vec3(1,0,1),
  }
);

vehicle.addWheel(
  {
    ...wheelOptions,
    chassisConnectionPointLocal:new CANNON.Vec3(1,0,-1),
  }
);

// 创建threejs车轮
const wheelBodies = [];

// 车轮形状
const wheelShape = new CANNON.Cylinder(1,1,0.2,30);
const wheelGeometry = new THREE.CylinderGeometry(1,1,0.2,20);
const wheelMaterial = new THREE.MeshBasicMaterial({
  color:0x888888
});


for(let i=0;i < vehicle.wheelInfos.length;i++) {
  const wheel = vehicle.wheelInfos[i];
  const cylinderBody = new CANNON.Body({
    mass:0,
    shape: wheelShape,
  });
  cylinderBody.addShape(wheelShape);
  // cylinderBody.position.copy(wheel.chassisConnectionPointWorld);
  // cylinderBody.quaternion.copy(chassisBody.quaternion);
  // world.addBody(chassisBody);
  physics.push(cylinderBody);
  wheelBodies.push(cylinderBody);
  



  const cylinderMesh = new THREE.Mesh(wheelGeometry,wheelMaterial);
  const wheelObj = new THREE.Object3D();
  cylinderMesh.rotation.x = -Math.PI / 2;
  wheelObj.add(cylinderMesh);

  scene.add(cylinderMesh);
  meshs.push(cylinderMesh);

  wheelObj.add(cylinderMesh);


}

world.addEventListener('postStep',() => {
  for(let i=0;i < vehicle.wheelInfos.length;i++) {
    vehicle.updateWheelTransform(i);
    const t = vehicle.wheelInfos[i].worldTransform;
    const wheelBody = wheelBodies[i];
    wheelBody.position.copy(t.position);
    wheelBody.quaternion.copy(t.quaternion);
    
  }
})



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
  world.step(1 / 60, delta);

  for (let i = 0; i < physics.length; i++) {
    meshs[i].position.copy(physics[i].position);
    meshs[i].quaternion.copy(physics[i].quaternion);
  }

  requestAnimationFrame(render);
}

render();

document.body.appendChild(renderer.domElement);
