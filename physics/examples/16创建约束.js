/*
 * :file description:
 * :name: /physics/src/index.js
 * :author:张德志
 * :copyright: (c) 2024, Xiaozhi
 * :date created: 2024-12-04 06:44:13
 * :last editor: 张德志
 * :date last edited: 2024-12-09 06:55:35
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

// 创建渲染器
const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);



// 创建物理球
// const sphere = new THREE
const world = new CANNON.World();
world.gravity.set(0, -9.82, 0);
world.allowSleep = true;


for(let i=0;i < 15;i++) {
  const sphereShape = new CANNON.Sphere(0.45);
  const sphereBody = new CANNON.Body({
    mass:i === 0 ? 0:1,
    shape: sphereShape,
    position: new CANNON.Vec3(0,15 - i * 0.45,0)
  });
  world.addBody(sphereBody);
  physics.push(sphereBody);


  const sphereGeometry = new THREE.SphereGeometry(0.45,32,32);
  const sphereMaterial = new THREE.MeshBasicMaterial({
    color:0x00ff00
  });
  const sphereMesh = new THREE.Mesh(sphereGeometry,sphereMaterial);
  sphereMesh.position.copy(sphereBody.position);
  scene.add(sphereMesh);
  meshs.push(sphereMesh);

  if(i > 0) {
    const constraint = new CANNON.DistanceConstraint(
      sphereBody,
      physics[i - 1],
      0.9
    );
    world.addConstraint(constraint)
  }
}

window.addEventListener('click',() => {
  const sphereShape = new CANNON.Sphere(0.45);
  const sphereBody = new CANNON.Body({
    mass:1,
    shape: sphereShape,
    position: new CANNON.Vec3(5,10,0),
  });
  world.addBody(sphereBody);
  physics.push(sphereBody);
  sphereBody.velocity.set(-10,0,0);

  const sphereGeometry = new THREE.SphereGeometry(0.45,32,32);
  const sphereMaterial = new THREE.MeshBasicMaterial({
    color:0xff0000
  });
  const sphereMesh = new THREE.Mesh(sphereGeometry,sphereMaterial);
  sphereMesh.position.copy(sphereBody.position);
  meshs.push(sphereMesh);
  scene.add(sphereMesh);
  
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
