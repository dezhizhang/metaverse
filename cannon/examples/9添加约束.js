/*
 * :file description: 
 * :name: /cannon/examples/9添加约束.js
 * :author:张德志
 * :copyright: (c) 2025, Xiaozhi
 * :date created: 2025-04-09 23:19:58
 * :last editor: 张德志
 * :date last edited: 2025-04-09 23:19:59
 */
import * as THREE from "three";
import CannonDebugger from "cannon-es-debugger";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as CANNON from "cannon-es";


const GROUP1 = 1;
const GROUP2 = 2;
const GROUP3 = 4;

let previousBody;


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



for(let i=0;i < 10;i++) {
  const boxGeometry = new THREE.BoxGeometry(1,1,1);
  const boxMaterial = new THREE.MeshBasicMaterial({
    color:0x00ff00
  });
  const boxMesh = new THREE.Mesh(boxGeometry,boxMaterial);
  boxMesh.position.x = i;
  boxMesh.position.y = 1;
  scene.add(boxMesh);
  meshes.push(boxMesh);


  const boxBody = new CANNON.Body({
    mass:1,
    shape: new CANNON.Box(
      new CANNON.Vec3(0.5,0.5,0.5),
    ),
    position: new CANNON.Vec3(i,1,0),
    material:boxMaterialCon,
    collisionFilterGroup:GROUP2,
    collisionFilterMask:GROUP1 | GROUP2 | GROUP3
  });
  world.addBody(boxBody);
  phyMeshes.push(boxBody);

  if(previousBody) {
    const constraint = new CANNON.LockConstraint(boxBody,previousBody);
    world.addConstraint(constraint);
  }

  previousBody = boxBody;

}

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
