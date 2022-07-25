/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-12 07:44:44
 * :last editor: 张德志
 * :date last edited: 2022-07-26 07:50:42
 */
import * as THREE from 'three';
import * as dat from 'dat.gui';
import { createMultiMaterialObject } from 'three/examples/jsm/utils/SceneUtils';

let step = 0;
let spGroup;
let latheMesh;
// 创建场影
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

// 设置相机位置
camera.position.x = -30;
camera.position.y = 40;
camera.position.z = 50;
camera.lookAt(new THREE.Vector3(10,0,0));

document.body.append(renderer.domElement);


generatePoints(12, 2, 2 * Math.PI);

function generatePoints(segments,phiStart,phiLength) {
    let points = [];
    let height = 5;
    let count = 30;
    for(let i=0;i < count;i++) {
        points.push(new THREE.Vector3((Math.sin(i * 0.2) + Math.cos(i * 0.3)) * height + 12, 0, ( i - count ) + count / 2));
    }
    spGroup = new  THREE.Object3D();
    let material = new THREE.MeshBasicMaterial({color:0xff0000,transparent:false});
    points.forEach((point) => {
        let spGeom = new  THREE.SphereGeometry(0.2);
        let spMesh = new THREE.Mesh(spGeom,material);
        spMesh.position.copy(point);
        spGroup.add(spMesh);
    });
    var latheGeometry = new THREE.LatheGeometry(points, segments, phiStart, phiLength);
    latheMesh = createMesh(latheGeometry);
    scene.add(spGroup);


}

function createMesh(geom) {
    let meshMaterial = new THREE.MeshNormalMaterial();
    meshMaterial.side = THREE.DoubleSide;
    let wireFrameMat = new THREE.MeshBasicMaterial();
    wireFrameMat.wireframe = true;

    let mesh = createMultiMaterialObject(geom,[meshMaterial,wireFrameMat]);
    return mesh;
}

function render() {
    spGroup.rotation.x = step;
    latheMesh.rotation.x = step += 0.01;
    requestAnimationFrame(render)
    renderer.render(scene,camera);
}


render();

