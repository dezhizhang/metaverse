
/*
 * :file description: 小车移动
 * :name: /physics/src/index.js
 * :author:张德志
 * :copyright: (c) 2024, Xiaozhi
 * :date created: 2024-12-04 06:44:13
 * :last editor: 张德志
 * :date last edited: 2024-12-12 05:49:13
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
//world.addBody(chassisBody);

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
const wheelBody1 = new CANNON.Body({
  mass:1,
  shape: wheelShape,
});

vehicle.addWheel({
  body:wheelBody1,
  position: new CANNON.Vec3(-3,-0.5,3.5),
  // 轮子旋转轴
  axis: new CANNON.Vec3(0,0,-1),
  direction: new CANNON.Vec3(0,-1,0)
});
//world.addBody(wheelBody1);
physics.push(wheelBody1);

// 第二个车轮
const wheelBody2 = new CANNON.Body({
  mass:1,
  shape: wheelShape
});

vehicle.addWheel({
  body: wheelBody2,
  position: new CANNON.Vec3(4,-0.5,3.5),
  axis: new CANNON.Vec3(0,0,-1),
  direction: new CANNON.Vec3(0,-1,0)
});
//world.addBody(wheelBody2);
physics.push(wheelBody2);


const wheelBody3 = new CANNON.Body({
  mass:1,
  shape:wheelShape
});

vehicle.addWheel({
  body: wheelBody3,
  position: new CANNON.Vec3(-4,-0.5,-3.5),
  axis: new CANNON.Vec3(0,0,-1),
  direction: new CANNON.Vec3(0,-1,0)
});
//world.addBody(wheelBody3);
physics.push(wheelBody3);

const wheelBody4 = new CANNON.Body({
  mass:1,
  shape: wheelShape
});

vehicle.addWheel({
  body: wheelBody4,
  position: new CANNON.Vec3(4,-0.5,-3.5),
  axis: new CANNON.Vec3(0,0,-1),
  direction: new CANNON.Vec3(0,-1,0)
});
//world.addBody(wheelBody4);
physics.push(wheelBody4);




// 添加three轮子
const wheelMesh1 = new THREE.Mesh(
  new THREE.SphereGeometry(1.5,8,8),
  new THREE.MeshBasicMaterial({
    color:0x66000,
    wireframe:true,
  })
);
scene.add(wheelMesh1);
meshs.push(wheelMesh1);


const wheelMesh2 = new THREE.Mesh(
  new THREE.SphereGeometry(1.5,8,8),
  new THREE.MeshBasicMaterial({
    color:0x660000,
    wireframe:true,
  })
);
scene.add(wheelMesh2);
meshs.push(wheelMesh2);

const wheelMesh3 = new THREE.Mesh(
  new THREE.SphereGeometry(1.5,8,8),
  new THREE.MeshBasicMaterial({
    color:0x660000,
    wireframe:true,
  })
);
scene.add(wheelMesh3);
meshs.push(wheelMesh3);

const wheelMesh4 = new THREE.Mesh(
  new THREE.SphereGeometry(1.5,8,8),
  new THREE.MeshBasicMaterial({
    color:0x660000,
    wireframe:true,
  })
);
scene.add(wheelMesh4);
meshs.push(wheelMesh4);




window.addEventListener('keydown',(event) => {
  console.log(event.key);
  if(event.key === 'w') {
    vehicle.setWheelForce(100,0);
    vehicle.setWheelForce(100,2);
  }else if(event.key === 's') {
    vehicle.setWheelForce(-100,0);
    vehicle.setWheelForce(-100,2);
  }
});

window.addEventListener('keyup',() => {
  if(event.key === 'w') {
    vehicle.setWheelForce(0,0);
    vehicle.setWheelForce(0,2);
  }
});

vehicle.addToWorld(world);

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
