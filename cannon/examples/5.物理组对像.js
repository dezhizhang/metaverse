/*
 * :file description: 
 * :name: /cannon/examples/5.物理组对像.js
 * :author:张德志
 * :copyright: (c) 2025, Xiaozhi
 * :date created: 2025-04-09 06:33:11
 * :last editor: 张德志
 * :date last edited: 2025-04-09 06:33:12
 */
import * as THREE from "three";
import CannonDebugger from 'cannon-es-debugger';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as CANNON from "cannon-es";


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(100,100,100);
camera.lookAt(scene.position);


let meshes = [];
let phyMeshes = [];

const group1 = 1;
const group2 = 2;
const group3 = 4;
const group4 = 8;


const world = new CANNON.World();
world.gravity.set(0,-9.82,0);


const boxMaterialCon = new CANNON.Material('boxMaterialCon'); 


const sphereBody = new CANNON.Body({
    shape:new CANNON.Sphere(0.5),
    position:new CANNON.Vec3(0,10,0),
    mass:1,
    material:boxMaterialCon,
    collisionFilterGroup: group2
});
world.addBody(sphereBody);
phyMeshes.push(sphereBody);

// 创建物理圆柱体
const cylinderShape = new CANNON.Cylinder(0.5,0.5,1,32);
const cylinderBody = new CANNON.Body({
    shape:cylinderShape,
    position: new CANNON.Vec3(2,0.5,0),
    mass:1,
    material:boxMaterialCon,
    collisionFilterGroup:group3
});
world.addBody(cylinderBody);
phyMeshes.push(cylinderBody);

// 创建物理平面
const planeShape = new CANNON.Box(
    new CANNON.Vec3(5,0.1,5)
);
const planeBody = new CANNON.Body({
    shape:planeShape,
    position: new CANNON.Vec3(0,-0.1,0),
    type:CANNON.Body.STATIC,
    material:boxMaterialCon,
    collisionFilterGroup:group4,
    collisionFilterMask: group1 | group2 | group3 | group4
});
world.addBody(planeBody);



const planeGeometry = new THREE.BoxGeometry(10,0.2,10);
const planeMaterial = new THREE.MeshBasicMaterial({
    color:0xffff00
});
const planeMesh = new THREE.Mesh(planeGeometry,planeMaterial);
scene.add(planeMesh);


const boxBody = new CANNON.Body({
    shape:new CANNON.Box(new CANNON.Vec3(0.5,0.5,0.5)),
    position: new CANNON.Vec3(-2,10,0),
    mass:1,
    material:boxMaterialCon,
    collisionFilterGroup:group1,
});

world.addBody(boxBody);
phyMeshes.push(boxBody);



sphereBody.addEventListener('collide',(event) => {
    console.log('event',event);
})






const boxGeometry = new THREE.BoxGeometry(1,1,1);
const boxMaterial = new THREE.MeshBasicMaterial({
    color:0x00ff00
});
const boxMesh = new THREE.Mesh(boxGeometry,boxMaterial);
scene.add(boxMesh);
meshes.push(boxMesh);

const renderer = new THREE.WebGLRenderer({
    
});
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera,renderer.domElement);

scene.add(new THREE.AxesHelper(100));


const cannonDebugger = CannonDebugger(scene, world, {
    color: 0xff0000,  
    scale: 1.0       
});

const clock = new THREE.Clock();





function render() {
    const delta = clock.getDelta();
    world.step(1/60,delta);

    for(let i=0;i < phyMeshes.length;i++) {
        // meshes[i].position.copy(phyMeshes[i].position);
        // meshes[i].quaternion.copy(phyMeshes[i].quaternion);
    }



    requestAnimationFrame(render);
    renderer.render(scene,camera);   
    cannonDebugger.update(); 
}

render();


