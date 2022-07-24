/*
 * :file description: 
 * :name: /threejs/examples/12.八面体.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-24 15:31:24
 * :last editor: 张德志
 * :date last edited: 2022-07-24 15:31:25
 */
import * as THREE from 'three';
import * as dat from 'dat.gui';


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


// 创建平面
const planeGeometry = new THREE.PlaneGeometry(60,40,1,1);
const planeMaterial = new THREE.MeshLambertMaterial({color:0xffffff});
const plane = new THREE.Mesh(planeGeometry,planeMaterial);
plane.receiveShadow = true;


plane.rotation.x = -0.5 * Math.PI;
plane.position.x = 0;
plane.position.y = - 2;
plane.position.z = 0;

scene.add(plane);


// 设置相机位置
camera.position.x = -40;
camera.position.y = 40;
camera.position.z = 40;
camera.lookAt(scene.position);


// 添加灯光
const ambientLight = new THREE.AmbientLight(0x0c0c0c);
scene.add(ambientLight);

// 设置点光源
const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(-40,60,-10);
spotLight.castShadow = true;
scene.add(spotLight);

let group = new THREE.Mesh();
let mats = [];
mats.push(new THREE.MeshBasicMaterial({color:0x009e60}));
mats.push(new THREE.MeshBasicMaterial({color:0x009e60}));
mats.push(new THREE.MeshBasicMaterial({color:0x0051ba}));
mats.push(new THREE.MeshBasicMaterial({color:0x0051ba}));
mats.push(new THREE.MeshBasicMaterial({color:0xffd500}));
mats.push(new THREE.MeshBasicMaterial({color:0xffd500}));
mats.push(new THREE.MeshBasicMaterial({color: 0xff5800}));
mats.push(new THREE.MeshBasicMaterial({color: 0xff5800}));
mats.push(new THREE.MeshBasicMaterial({color: 0xC41E3A}));
mats.push(new THREE.MeshBasicMaterial({color: 0xC41E3A}));
mats.push(new THREE.MeshBasicMaterial({color: 0xffffff}));
mats.push(new THREE.MeshBasicMaterial({color: 0xffffff}));

console.log(THREE);

var faceMaterial = new THREE.MeshNormalMaterial(mats);

for (var x = 0; x < 3; x++) {
    for (var y = 0; y < 3; y++) {
        for (var z = 0; z < 3; z++) {
            var cubeGeom = new THREE.BoxGeometry(2.9, 2.9, 2.9);
            var cube = new THREE.Mesh(cubeGeom, faceMaterial);
            cube.position.set(x * 3 - 3, y * 3, z * 3 - 3);

            group.add(cube);
        }
    }
}

scene.add(group);
var step = 0;

var controls = new function () {
    this.rotationSpeed = 0.02;
    this.numberOfObjects = scene.children.length;
};

var gui = new dat.GUI();
gui.add(controls, 'rotationSpeed', 0, 0.5);

document.body.append(renderer.domElement);

function render() {
    group.rotation.y = step += controls.rotationSpeed;
    requestAnimationFrame(render);
    renderer.render(scene,camera);
}

render();