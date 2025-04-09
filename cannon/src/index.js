/*
 * :file description:
 * :name: /cannon/src/index.js
 * :author:张德志
 * :copyright: (c) 2025, Xiaozhi
 * :date created: 2025-04-02 06:25:26
 * :last editor: 张德志
 * :date last edited: 2025-04-10 06:18:57
 */
import * as THREE from "three";
import CannonDebugger from "cannon-es-debugger";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as CANNON from "cannon-es";


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(100, 100, 100);
camera.lookAt(scene.position);

let meshes = [];
let phyMeshes = [];

scene.add(new THREE.AmbientLight(0xffffff,10));


const boxMaterialCon = new CANNON.Material("boxMaterialCon");

const world = new CANNON.World();
world.gravity.set(0, -9.82, 0);
world.allowSleep = true;

const planeBody = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Plane(),
  position: new CANNON.Vec3(0, 0, 0),
  type: CANNON.Body.STATIC,
});
planeBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
world.addBody(planeBody);


// 创建车身
const chassisShape = new CANNON.Box(
  new CANNON.Vec3(5,0.5,2)
);
const chassisBody = new CANNON.Body({
  mass:1,
  shape:chassisShape,
});

// 创建刚性车子
const vehicle = new CANNON.RigidVehicle({
  chassisBody
});

const wheelBody1 = new CANNON.Body({
  mass:1,
  shape:new CANNON.Sphere(1.5)
});

vehicle.addWheel(
  {
    body:wheelBody1,
    position:new CANNON.Vec3(-4,-0.5,3.5),
    axis: new CANNON.Vec3(0,-1,0),
  }
);

world.addBody(wheelBody1);

const wheelMesh1 = new THREE.Mesh(
  new THREE.SphereGeometry(1.5,20,20),
  new THREE.MeshBasicMaterial({
    color:0x00ff00
  })
);
scene.add(wheelMesh1);
meshes.push(wheelMesh1);





world.addBody(chassisBody);
phyMeshes.push(chassisBody);


// 创建刚性车子
const chassisMesh = new THREE.Mesh(
  new THREE.BoxGeometry(10,1,4),
  new THREE.MeshBasicMaterial({
    color:0x660066
  })
)
scene.add(chassisMesh);
meshes.push(chassisMesh);








const renderer = new THREE.WebGLRenderer({});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

scene.add(new THREE.AxesHelper(100));

const cannonDebugger = CannonDebugger(scene, world, {
  color: 0xff0000,
  scale: 1.0,
});

const clock = new THREE.Clock();


function render() {
  const delta = clock.getDelta();
  world.step(1 / 60, delta);

  for (let i = 0; i < phyMeshes.length; i++) {
    meshes[i].position.copy(phyMeshes[i].position);
    meshes[i].quaternion.copy(phyMeshes[i].quaternion);
  }


  requestAnimationFrame(render);
  renderer.render(scene, camera);
  cannonDebugger.update();
}

render();
