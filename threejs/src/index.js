/*
 * :file description:
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2023-06-04 19:30:19
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as CANNON from 'cannon-es';


// 创建场影
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(
    75,window.innerWidth / window.innerHeight,0.1,1000
);
camera.position.set(0,0,10);
scene.add(camera);

const sphereGeometey = new THREE.SphereGeometry(1,20,20);
const meshStandardMaterial = new THREE.MeshStandardMaterial();
const sphere = new THREE.Mesh(sphereGeometey,meshStandardMaterial);
sphere.castShadow = true;
scene.add(sphere);

const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20,20),
    new THREE.MeshStandardMaterial()
)
floor.receiveShadow = true;
floor.position.set(0,-5,0);
floor.rotation.x = -Math.PI / 2;

scene.add(floor);

// 创建物理世界
const world = new CANNON.World();
world.gravity.set(0,-9.8,0);

// 创建小球
const sphereShape = new CANNON.Sphere();
const sphereWorldMaterial = new CANNON.Material();

// 创建物理世界的物体
const sphereBody = new CANNON.Body({
    shape:sphereShape,
    position: new CANNON.Vec3(0,0,0),
    mass:1,
    material:sphereWorldMaterial
});

// 添加至物理世界
world.addBody(sphereBody);

// 创建地面
const floorSpape = new CANNON.Plane();
const floorBody = new CANNON.Body({
    mass:0,
    shape:floorSpape,
    position:new CANNON.Vec3(0,-5,0),
    material:sphereWorldMaterial,
    
});

floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0), -Math.PI / 2);
world.addBody(floorBody);


const light = new THREE.AmbientLight(0xffffff,0.5);
scene.add(light);

const  pointLight = new THREE.SpotLight(0xff0000,1);
pointLight.position.set(2,2,2);
pointLight.castShadow = true;
pointLight.shadow.radius = 5;
scene.add(pointLight);


// 初始化渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);

document.body.appendChild(renderer.domElement);


const controls = new OrbitControls(camera,renderer.domElement);
controls.enableDamping = true;

const clock = new THREE.Clock();


const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);


function render() {
    let deltaTime = clock.getDelta();
    controls.update();
    world.step(1/120,deltaTime)
    sphere.position.copy(sphereBody.position);
    renderer.render(scene,camera);
    requestAnimationFrame(render);
}

render();

window.addEventListener('resize',() => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
});


