
import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import CannonDebugger from 'cannon-es-debugger';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const sphere = new CANNON.Sphere(1);
const sphereMaterial = new CANNON.Material('sphereMaterial');
const groundMaterial = new CANNON.Material('groundMaterial');

const body = new CANNON.Body({
  mass:0.3,
  position: new CANNON.Vec3(0,100,0),
  shape:sphere,
  material:sphereMaterial,
});

const world = new CANNON.World();
world.gravity.set(0,-9.8,0);
world.addBody(body);

const groundBody = new CANNON.Body({
  shape: new CANNON.Plane(),
  mass:0.0,
  material:groundMaterial,
});
groundBody.quaternion.setFromEuler(-Math.PI / 2,0,0);
world.addBody(groundBody);


const contact =  new CANNON.ContactMaterial(sphereMaterial,groundMaterial,{
  restitution:0.7,
});
world.addContactMaterial(contact);




const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(30,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(200,200,200);
camera.lookAt(scene.position);


const renderer = new THREE.WebGLRenderer({
  antialias:true
});
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);


const geometry = new THREE.SphereGeometry(1.5);
const material = new THREE.MeshLambertMaterial({
  color:0x00ff00
});
const mesh = new THREE.Mesh(geometry,material);
// mesh.position
scene.add(mesh);


const planeGeometry = new THREE.PlaneGeometry(200,200);
const material1 = new THREE.MeshLambertMaterial({
  color:0x777777
});

const planeMesh = new THREE.Mesh(planeGeometry,material1);
scene.add(planeMesh);
planeMesh.rotateX(-Math.PI / 2);



scene.add(new THREE.AxesHelper(100));



scene.add(new THREE.AmbientLight(0xffffff));

const controls = new OrbitControls(camera,renderer.domElement);


function render() {
  world.step(1/60);
  mesh.position.copy(body.position);
  mesh.quaternion.copy(body.quaternion);


  console.log(body.position);

  renderer.render(scene,camera);
  requestAnimationFrame(render);
}

render();

document.body.appendChild(renderer.domElement);