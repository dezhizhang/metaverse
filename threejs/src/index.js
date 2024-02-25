
import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


const clock = new THREE.Clock();
//创建场影
const scene = new THREE.Scene();

//创建相机
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);

// 设置相机位置
camera.position.set(0,0,10);
scene.add(camera);


const sphereGeometry = new THREE.SphereGeometry(1,20,20);
const sphereMaterial = new THREE.MeshStandardMaterial();
const sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);
sphere.castShadow = true;
scene.add(sphere);

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20,20),
  new THREE.MeshStandardMaterial(),
);
floor.position.set(0,-5,0)
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);


const ambientLight = new THREE.AmbientLight(0xffffff,0.5);
scene.add(ambientLight);


const directionalLight = new THREE.DirectionalLight(0xffffff,0.5);
directionalLight.castShadow = true;
scene.add(directionalLight);


const renderer = new THREE.WebGL1Renderer();

// 设置渲染器大小
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.shadowMap.enabled = true; 

document.body.append(renderer.domElement);


const controls = new OrbitControls(camera,renderer.domElement);


const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);


const world = new CANNON.World();
world.gravity.set(0,-9.8,0);
const sphereShape = new CANNON.Sphere(1);

const sphereBody = new CANNON.Body({
  shape:sphereShape,
  position:new CANNON.Vec3(0,0,0),
  mass:1,
  material:new CANNON.Material(),
});

world.addBody(sphereBody);


function render() {
  requestAnimationFrame(render);
  world.step(1 / 120,clock.getDelta());
  sphere.position.copy(sphereBody.position);
  renderer.render(scene,camera);
}

render();



