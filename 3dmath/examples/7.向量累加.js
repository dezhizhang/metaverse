/*
 * :file description: 
 * :name: /3dmath/examples/7.向量累加.js
 * :author:张德志
 * :copyright: (c) 2025, Xiaozhi
 * :date created: 2025-03-30 20:13:51
 * :last editor: 张德志
 * :date last edited: 2025-03-30 20:13:51
 */
import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(100,100,100);
camera.lookAt(scene.position);


const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);


const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({
    color:0x00ff00
});
const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);

scene.add(new THREE.AxesHelper(100));

const v = new THREE.Vector3(10,0,10);
const clock = new THREE.Clock();

const controls = new OrbitControls(camera,renderer.domElement);

const pos0 = mesh.position.clone();


function render() {
    const spt = clock.getDelta();
    const dis = v.clone().multiplyScalar(spt);
    const pos1 = pos0.clone().add(dis);
    mesh.position.add(pos1);
    

    requestAnimationFrame(render);
    renderer.render(scene,camera);
}

render();
