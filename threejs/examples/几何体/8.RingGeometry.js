/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-12 07:44:44
 * :last editor: 张德志
 * :date last edited: 2022-07-30 17:03:56
 */
// import * as dat from 'dat.gui';
// const gui = new dat.GUI();

// const controllObj = {
//     rotationObj:0,
// }

// gui.add(controllObj,'rotationObj',1)
// console.log('gui',gui);
import * as THREE from 'three';
import * as dat from 'dat.gui';
import Stats from 'stats.js';
import { createMultiMaterialObject } from 'three/examples/jsm/utils/SceneUtils';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; 

let step = 0;

function initStats() {
    const stats = new Stats();
    stats.setMode(0);

    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';

    document.getElementById('stats').appendChild(stats.domElement);
    return stats;
    
}

const stats = initStats();

// 创建场景
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);

// 创建渲染器
const renderer = new THREE.WebGL1Renderer();
renderer.setClearColor(new THREE.Color(0xEEEEEE));
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.shadowMap.enabled = true;




function createMesh(geom) {
    const meshMaterial = new THREE.MeshNormalMaterial();
    meshMaterial.side = THREE.DoubleSide;
    const wireFrameMat = new THREE.MeshBasicMaterial();
    wireFrameMat.wireframe = true;

    const mesh = createMultiMaterialObject(geom,[meshMaterial,wireFrameMat]);
    return mesh;
    
}


// 创建几何体
let torus = createMesh(new THREE.RingGeometry(10));
scene.add(torus);

camera.position.x = -30;
camera.position.y = 40;
camera.position.z = 50;
camera.lookAt(new THREE.Vector3(10,0,0));

const controls = new function() {
    this.innerRadius = 0;
    this.outerRadius = 50;
    this.thetaSegments = 8;
    this.phiSegments = 8;
    this.thetaStart = 0;
    this.thetaLength = Math.PI * 2;
    this.redraw = function() {
        scene.remove(torus);
        torus = createMesh(new THREE.RingGeometry(controls.innerRadius, controls.outerRadius, controls.thetaSegments, controls.phiSegments, controls.thetaStart, controls.thetaLength));
        scene.add(torus);
    }
}

const gui = new  dat.GUI();
gui.add(controls,'innerRadius',0,40).onChange(controls.redraw);
gui.add(controls,'outerRadius',0,100).onChange(controls.redraw);
gui.add(controls,'thetaSegments',1,40).onChange(controls.redraw);
gui.add(controls,'phiSegments',1,20).step(1).onChange(controls.redraw);
gui.add(controls,'thetaStart',0,Math.PI *2).onChange(controls.redraw);
gui.add(controls,'thetaLength',0,Math.PI *2).onChange(controls.redraw);


const control = new OrbitControls(camera,renderer.domElement)


document.body.append(renderer.domElement);

function render() {
    stats.update();

    torus.rotation.y = step += 0.01;
    requestAnimationFrame(render);
    renderer.render(scene,camera);
}

render();
