/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-12 07:44:44
 * :last editor: 张德志
 * :date last edited: 2022-07-24 20:11:14
 */
import * as THREE from 'three';
import * as dat from 'dat.gui';
import { SceneUtils } from 'three/examples/jsm/utils/SceneUtils';



let gui = new dat.GUI();
let step = 0;

// 创建场影
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);

// 创建沉浸器
const renderer = new THREE.WebGL1Renderer();
renderer.setClearColor(new THREE.Color(0xEEEEEE));
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.shadowMap = {
    enabled:true
}

const circle = createMesh(new THREE.CircleGeometry(4,10,0.3 * Math.PI * 2,0.3 *Math.PI *2));
scene.add(circle);

// 创建几何体

function createMesh(geom) {
    const meshMaterial = new THREE.MeshNormalMaterial();
    meshMaterial.side = THREE.DoubleSide;
    const wireFrameMat = new THREE.MeshBasicMaterial;
    wireFrameMat.wireframe = true;

    const mesh = SceneUtils.(geom,[meshMaterial,wireFrameMat]);
    return mesh
}

// 设置相机位置
camera.position.x = - 20;
camera.position.y = 30;
camera.position.z = 40;
camera.lookAt(new THREE.Vector3(10,0,0));

document.body.append(renderer.domElement);

// 添加灯光
const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(-40,60,10);
scene.add(spotLight);


// 添加gui
let controls = new function() {
    this.radius = 4;
    this.thetaStart = 0.3 * Math.PI * 2;
    this.thetaLength = 0.3 * Math.PI * 2;
    this.segments = 10;

    this.redraw = function() {
        scene.remove(circle);
        circle = createMesh(new THREE.CircleGeometry(controls.radius,controls.segments,controls.thetaStart,controls.thetaLength));
        scene.add(circle);
        
    }
}


console.log('gui',gui);

gui.add(controls,'radius',0,40).onChange(controls.redraw);
gui.add(controls, 'radius', 0, 40).onChange(controls.redraw);
gui.add(controls, 'segments', 0, 40).onChange(controls.redraw);
gui.add(controls, 'thetaStart', 0, 2 * Math.PI).onChange(controls.redraw);
gui.add(controls, 'thetaLength', 0, 2 * Math.PI).onChange(controls.redraw);

function render() {
    circle.rotation.y = step += 0.01;
    requestAnimationFrame(render);
    renderer.render(scene,camera);
}

render();
