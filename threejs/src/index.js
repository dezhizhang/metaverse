/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-12 07:44:44
 * :last editor: 张德志
 * :date last edited: 2022-11-14 07:20:15
 */
import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import * as dat from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

//创建gui
const gui = new dat.GUI();

// 创建场影
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(0,0,10);
scene.add(camera);



const shereGeometry = new THREE.SphereGeometry(1,20,20);
const shereMaterial = new THREE.MeshStandardMaterial();
const shere = new THREE.Mesh(shereGeometry,shereMaterial);
shere.castShadow = true;
scene.add(shere);


const planceGeometry = new THREE.PlaneGeometry(10,10);
const planceMaterial = new THREE.MeshStandardMaterial();
const plane = new THREE.Mesh(planceGeometry,planceMaterial);
plane.position.set(0,-5,0);
plane.rotation.x = -Math.PI / 2;
plane.receiveShadow = true;
scene.add(plane);


// 创建物理世界
const world = new CANNON.World({gravity:9.8});

const sphere = new CANNON.Sphere(1);
const shapeMaterial = new CANNON.Material();
const sphereBody = new CANNON.Body({
    shape:sphere,
    position:new CANNON.Vec3(0,0,0),
    mass:1,
    material:shapeMaterial,
});

world.addBody(sphereBody);

// 物理世界地面
const planeShape = new CANNON.Plane();
const planeBody = new CANNON.Body();
planeBody.mass = 0;
planeBody.addShape(planeShape);
planeBody.position.set(0,-5,0);
planeBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI / 2);
world.addBody(planeBody);


// 添加灯光
const litht = new THREE.AmbientLight(0xffffff,0.5);
scene.add(litht);

// 设置平行光
const directionalLight = new THREE.DirectionalLight(0xffffff,0.5);
directionalLight.position.set(10,10,10);
directionalLight.castShadow = true;
scene.add(directionalLight);



// 创建渲染器
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth,window.innerHeight);

document.body.appendChild(renderer.domElement);

// 创建控制器
const controls = new OrbitControls(camera,renderer.domElement);

// 创建坐标系
const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);

function render() {
    renderer.render(scene,camera);
    requestAnimationFrame(render);
}

render();





