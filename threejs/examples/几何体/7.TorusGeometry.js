/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-12 07:44:44
 * :last editor: 张德志
 * :date last edited: 2022-07-30 16:17:53
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

//  创建场影
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);

// 创建渲染器
const renderer = new THREE.WebGL1Renderer();
renderer.setClearColor(new THREE.Color(0xEEEEEE));
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.shadowMap.enabled = true;

// 创建几何体
function createMesh(geom) {
    const materials = new THREE.MeshNormalMaterial();
    materials.side = THREE.DoubleSide;
    const wireFrameMat = new THREE.MeshBasicMaterial();
    wireFrameMat.wireframe = true;
    
    const mesh = createMultiMaterialObject(geom,[materials,wireFrameMat]);
    return mesh;
}


let torus = createMesh(new THREE.TorusGeometry(10,10,8,6,Math.PI *2));
scene.add(torus);

// 设置相机的位置
camera.position.x = -30;
camera.position.y = 40;
camera.position.z = 50;
camera.lookAt(new THREE.Vector3(10,0,0));
scene.add(camera);




const controls = new function() {
    this.radius = torus.children[0].geometry.parameters.radius;
    this.tube = torus.children[0].geometry.parameters.tube;
    this.radialSegments = torus.children[0].geometry.parameters.radialSegments;
    this.tubularSegments = torus.children[0].geometry.parameters.tubularSegments;
    this.arc = torus.children[0].geometry.parameters.arc;
    this.redraw = function() {
        scene.remove(torus);
        torus = createMesh(new THREE.TorusGeometry(controls.radius, controls.tube, Math.round(controls.radialSegments), Math.round(controls.tubularSegments), controls.arc));
        scene.add(torus);
    }
}

const gui = new dat.GUI();
gui.add(controls,'radius',0,40).onChange(controls.redraw);
gui.add(controls,'tube',0,40).onChange(controls.redraw);
gui.add(controls,'radialSegments',0,40).onChange(controls.redraw)
gui.add(controls,'tubularSegments',1,20).onChange(controls.redraw);
gui.add(controls,'arc',0,Math.PI * 2).onChange(controls.redraw);



document.body.append(renderer.domElement);

function render() {
    torus.rotation.y = step += 0.01;
    requestAnimationFrame(render);
    renderer.render(scene,camera);
}

render();
















