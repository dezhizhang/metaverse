/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-12 07:44:44
 * :last editor: 张德志
 * :date last edited: 2022-07-24 22:03:59
 */
import * as THREE from 'three';
import * as dat from 'dat.gui';
import { createMultiMaterialObject } from 'three/examples/jsm/utils/SceneUtils';

let step = 0;
// 创建场景
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);

// 创建渲染器 
const renderer = new THREE.WebGL1Renderer();
renderer.setClearColor(new THREE.Color(0xEEEEEE));
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.shadowMap = {
    enabled:true
}

// 创建几何体
const polyhedron = createMesh(new THREE.IcosahedronGeometry(10,0));
scene.add(polyhedron);


function createMesh(geom) {
    const meshMaterial = new THREE.MeshNormalMaterial();
    meshMaterial.side = THREE.DoubleSide;
    const wireFrameMat = new THREE.MeshBasicMaterial();
    wireFrameMat.wireframe = true;

    // 创建mesh
    const mesh = createMultiMaterialObject(geom,[meshMaterial,wireFrameMat]);
    return mesh;
    
}

// 设置相机位置
camera.position.x = -30;
camera.position.y = 40;
camera.position.z = 50;
camera.lookAt(new THREE.Vector3(10,0,0));

document.body.append(renderer.domElement);

function render() {
    polyhedron.rotation.y = step += 0.01;
    requestAnimationFrame(render);
    renderer.render(scene,camera);
}

render();
