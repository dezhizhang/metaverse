/*
 * :file description: 
 * :name: /threejs/examples/tween.js
 * :author:张德志
 * :copyright: (c) 2024, Xiaozhi
 * :date created: 2024-12-28 06:54:41
 * :last editor: 张德志
 * :date last edited: 2024-12-28 06:54:42
 */
/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author:张德志
 * :copyright: (c) 2024, Xiaozhi
 * :date created: 2024-07-27 12:32:40
 * :last editor: 张德志
 * :date last edited: 2024-12-28 06:54:20
 */
import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(202,123,125);
camera.lookAt(scene.position);


const dir = new THREE.Vector3();
// 获取相机的视线方向
camera.getWorldDirection(dir); 
console.log(dir);


const dis = dir.clone().multiplyScalar(200);
camera.position.add(dis);


new TWEEN.Tween(camera.position).to(camera.position.clone().add(dis),3000).start();


const geometry = new THREE.BoxGeometry(2,2,2);
const material = new THREE.MeshBasicMaterial({
  color:0x00ff00
});
const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);


scene.add(new THREE.AxesHelper(100));



const renderer = new THREE.WebGLRenderer({
  antialias:true,
  logarithmicDepthBuffer:true,
});

renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);




window.addEventListener('resize',() => {
  camera.aspect = window.innerWidth / window.innerHeight;
  renderer.setSize(window.innerWidth,window.innerHeight);
  camera.updateProjectionMatrix();
});


scene.add(new THREE.AmbientLight(0xffffff));

new OrbitControls(camera,renderer.domElement);



function render() {
  TWEEN.update();
  renderer.render(scene,camera);
  requestAnimationFrame(render)
}

render();



