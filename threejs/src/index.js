import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(72,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(1,1,10);
scene.add(camera);

const ambientLight = new THREE.AmbientLight(0xffffff,3);
scene.add(ambientLight);

const sphere1 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5,32,32),
  new THREE.MeshBasicMaterial({
    color:0xff0000,
  })
);

sphere1.position.x = -3;
scene.add(sphere1);

const sphere2 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5,32,32),
  new THREE.MeshBasicMaterial({
    color:0x00ff00,
  })
);
sphere2.position.x = 0;
scene.add(sphere2);

const sphere3 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5,32,32),
  new THREE.MeshBasicMaterial({
    color:0x0000ff
  })
);
sphere3.position.x = 3;
scene.add(sphere3);


const box = new THREE.Box3();

const arrSphere = [sphere1,sphere2,sphere3];

for(let i=0;i < arrSphere.length;i++) {
  arrSphere[i].geometry.computeBoundingBox();
  const box3 = arrSphere[i].geometry.boundingBox;

  arrSphere[i].updateWorldMatrix();
  box3.applyMatrix4(arrSphere[i].matrixWorld);

  // 合并包围合
  box.union(box3);

}

const boxHelper = new THREE.Box3Helper(box,0xffff00);
scene.add(boxHelper);


console.log(box);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);



const controls = new OrbitControls(camera,renderer.domElement);

window.addEventListener('resize',() => {
  camera.aspect= window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth,window.innerHeight);
});

function render() {
  requestAnimationFrame(render);
  renderer.render(scene,camera);
}

render();
