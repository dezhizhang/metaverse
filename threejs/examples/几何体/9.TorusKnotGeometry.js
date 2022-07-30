/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-12 07:44:44
 * :last editor: 张德志
 * :date last edited: 2022-07-30 17:41:54
 */
import * as THREE from 'three';
import * as dat from 'dat.gui';
import Stats from 'stats.js';
import { createMultiMaterialObject } from 'three/examples/jsm/utils/SceneUtils';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; 

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


let step = 0;

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
    const meshMaterial = new THREE.MeshNormalMaterial({});
    meshMaterial.side = THREE.DoubleSide;

    // 创建材质
    const mesh = createMultiMaterialObject(geom,[meshMaterial]);
    return mesh;
}

// 创建几何体
let knot = createMesh(new THREE.TorusKnotGeometry(10, 1, 64, 8, 2, 3, 1));
scene.add(knot);

// 设置相机位置
camera.position.x = -30;
camera.position.y = 40;
camera.position.z = 50;
camera.lookAt(new THREE.Vector3(10,0,0));

document.body.append(renderer.domElement);

let controls = new function() {
    this.radius = knot.children[0].geometry.parameters.radius;
    this.tube = 0.3;
    this.radialSegments = knot.children[0].geometry.parameters.radialSegments;
    this.tubularSegments = knot.children[0].geometry.parameters.tubularSegments;
    this.p = knot.children[0].geometry.parameters.p;
    this.q = knot.children[0].geometry.parameters.q;

    this.heightScale = knot.children[0].geometry.heightScale;

    this.redraw = function() {
        scene.remove(knot);

        knot = createMesh(new THREE.TorusKnotGeometry(controls.radius, controls.tube, Math.round(controls.radialSegments), Math.round(controls.tubularSegments), Math.round(controls.p), Math.round(controls.q), controls.heightScale));
        scene.add(knot);

    }
}

let gui = new dat.GUI();
gui.add(controls,'radius',0,40).onChange(controls.redraw);
gui.add(controls,'tube',0,40).onChange(controls.redraw);
gui.add(controls,'radialSegments',0,400).step(1).onChange(controls.redraw);
gui.add(controls,'tubularSegments',1,20).step(1).onChange(controls.redraw);
gui.add(controls,'p',1,10).step(1).onChange(controls.redraw);
gui.add(controls,'q',1,15).step(1).onChange(controls.redraw);
// gui.add(controls,'heightScale',0,5).onChange(controls.redraw);




function render() {
    stats.update();

    knot.rotation.y = step += 0.01;
    requestAnimationFrame(render);
    renderer.render(scene,camera);
}

render();
