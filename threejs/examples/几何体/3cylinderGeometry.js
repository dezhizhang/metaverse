/*
 * :file description: 
 * :name: /threejs/examples/几何体/3cylinderGeometry.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-25 07:31:47
 * :last editor: 张德志
 * :date last edited: 2022-07-25 07:31:48
 */
import * as THREE from 'three';
import * as dat from 'dat.gui';
import { createMultiMaterialObject } from 'three/examples/jsm/utils/SceneUtils';


let  step = 0;
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

function createMesh(geom) {
    const meshMaterial = new THREE.MeshNormalMaterial();
    meshMaterial.side = THREE.DoubleSide;
    const wireFrameMat = new THREE.MeshBasicMaterial();
    wireFrameMat.wireframe = true;

    const mesh = createMultiMaterialObject(geom,[meshMaterial,wireFrameMat]);
    return mesh;
    
}

const cylinder = createMesh(new THREE.CylinderGeometry(20,20,20));
scene.add(cylinder);

// 设置相机位置
camera.position.x =  -30;
camera.position.y = 40;
camera.position.z = 50;
camera.lookAt(new THREE.Vector3(10,0,0));


document.body.append(renderer.domElement);

const controls = new function() {
    this.radiusTop = 20;
    this.radiusBottom = 20;
    this.height = 20;

    this.radialSegments = 8;
    this.heightSegments = 8;

    this.openEnded = false;
    this.redraw = function() {
        scene.remove(cylinder);
        cylinder = createMesh(new THREE.CylinderGeometry(this.radiusTop,this.radiusBottom,this.height,this.radialSegments,this.heightSegments,this.openEnded))
       scene.add(cylinder);
    }

}

const gui = new dat.GUI();
gui.add(controls,'radiusTop',-40,40)

function render() {
    cylinder.rotation.y = step += 0.01;
    requestAnimationFrame(render);
    renderer.render(scene,camera);
}

render();