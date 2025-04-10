/*
 * :file description: 
 * :name: /3dmath/src/index.js
 * :author:张德志
 * :copyright: (c) 2025, Xiaozhi
 * :date created: 2025-03-02 10:32:29
 * :last editor: 张德志
 * :date last edited: 2025-04-10 08:00:59
 */
// 导入Three.js库
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(200,200,200);
camera.lookAt(scene.position);

scene.add(new THREE.AxesHelper(100));



const p = new THREE.Vector3(50,0,0);
const t = new THREE.Matrix4();
t.makeTranslation(50,0,0);

const r = new THREE.Matrix4();
r.makeRotationZ(Math.PI/2);

const modelMatrix = r.clone().multiply(t);
p.applyMatrix4(modelMatrix);




const geometry = new THREE.SphereGeometry(2);
const material = new THREE.MeshBasicMaterial({
    color:0x00ff00
});

const mesh = new THREE.Mesh(geometry,material);
mesh.position.copy(p);

scene.add(mesh);


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

new OrbitControls(camera,renderer.domElement);

function render() {
    requestAnimationFrame(render);
    renderer.render(scene,camera);
}

render();

