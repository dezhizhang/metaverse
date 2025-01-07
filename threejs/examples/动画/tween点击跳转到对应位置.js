/*
 * :file description: 
 * :name: /threejs/examples/动画/tween点击跳转到对应位置.js
 * :author:张德志
 * :copyright: (c) 2025, Xiaozhi
 * :date created: 2025-01-08 05:56:17
 * :last editor: 张德志
 * :date last edited: 2025-01-08 05:56:18
 */
import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let tween;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(200,200,200);
camera.lookAt(scene.position);

const cameraPos = new THREE.Vector3(200,200,200);
const targetPos = new THREE.Vector3(0,0,0);



const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);


const control = new OrbitControls(camera,renderer.domElement);


scene.add(new THREE.AmbientLight(0xffffff));

const group = new THREE.Group();


const loader = new GLTFLoader();
loader.load('/工厂.glb',(gltf) => {
  group.add(gltf.scene);
  scene.add(group);
});



function createCameraTween(endPos,endTarget) {
  tween = new TWEEN.Tween({
    x:camera.position.x,
    y:camera.position.y,
    z:camera.position.z,
    tx:control.target.x,
    ty:control.target.y,
    tz:control.target.z
  }).to({
    x:endPos.x,
    y:endPos.y,
    z:endPos.z,
    tx:endTarget.x,
    ty:endTarget.y,
    tz:endTarget.z
  },2000).onUpdate(function(obj) {
    camera.position.set(obj.x,obj.y,obj.z);
    control.target.set(obj.tx,obj.ty,obj.tz);
    control.update();
  }).start();
}




const aBtn = document.getElementById('A');
aBtn.addEventListener('click',() => {
  const A = group.getObjectByName('设备A001')
  const pos = new THREE.Vector3();
  A.getWorldPosition(pos);

  const pos2 = pos.clone().addScalar(30);

  createCameraTween(pos2,pos);
});


window.addEventListener('click',(event) => {
  const sx = event.clientX;
  const sy = event.clientY;

  const x = (sx / window.innerWidth) * 2 - 1;
  const y = -(sy / window.innerHeight) * 2 + 1;

  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(new THREE.Vector2(x,y),camera);
  const intersects = raycaster.intersectObjects([group]);
  if(intersects.length > 0) {
    const chooseObj = intersects[0].object;

    const pos = new THREE.Vector3();
    chooseObj.getWorldPosition(pos);
    const endPos = pos.clone().addScalar(30);
    createCameraTween(endPos,pos);
  }
});

const allBtn = document.getElementById('all');
allBtn.addEventListener('click',() => {
  createCameraTween(cameraPos,targetPos);
});

scene.add(new THREE.AxesHelper(100));


function render() {
  control.update();
  if(tween) {
    tween.update();
  }

  renderer.render(scene,camera);
  requestAnimationFrame(render);
}

render();




