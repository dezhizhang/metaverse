/*
 * :file description: 
 * :name: /physics/examples/自由落体.js
 * :author:张德志
 * :copyright: (c) 2024, Xiaozhi
 * :date created: 2024-11-26 06:42:07
 * :last editor: 张德志
 * :date last edited: 2024-11-26 06:42:07
 */
import * as THREE from 'three';
import {
    OrbitControls
} from 'three/examples/jsm/controls/OrbitControls.js';
import * as CANNON from 'cannon-es';

// 初始化物理世界
const world = new CANNON.World();
world.gravity.set(0, -9.82, 0);


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 3;


const renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);

const sphereShape = new CANNON.Sphere(0.5);
//创建一个刚体
const sphereBody = new CANNON.Body({
    mass: 1,
    shape: sphereShape,
    position: new CANNON.Vec3(0, 5, 0),
});

world.addBody(sphereBody);



const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const sphereMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ff00
});

const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphereMesh);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;


const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);



const clock = new THREE.Clock();

function render() {
    const delta = clock.getDelta();
    world.step(1 / 60);
    // 更新位置和旋转
    console.log('sphereBody', sphereBody.position);

    sphereMesh.position.copy(sphereBody.position);
    sphereMesh.quaternion.copy(sphereBody.quaternion);

    controls.update();
    
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

render();




document.body.appendChild(renderer.domElement);