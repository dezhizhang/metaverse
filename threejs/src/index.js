/*
 * :file description: ;

 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-12 07:44:44
 * :last editor: 张德志
 * :date last edited: 2022-07-17 08:53:55
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import * as dat from 'dat.gui';

const gui = new dat.GUI();


let step = 0;
// 创建场影
const scene = new THREE.Scene();

// 创健相机
const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.x = 120;
camera.position.y = 60;
camera.position.z = 180;

// 创建渲染器
const renderer = new THREE.WebGL1Renderer();
renderer.setClearColor(new THREE.Color(0xEEEEEE));
renderer.setSize(window.innerWidth,window.innerHeight);




// 创建平面
const planeGeometry = new THREE.PlaneGeometry(180, 180);
const planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
const plane = new THREE.Mesh(planeGeometry,planeMaterial);

// 设置平面位置
plane.rotation.x = -0.5 * Math.PI;
plane.position.x = 0;
plane.position.y = 0;
plane.position.z = 0;

// 将平面添加场景中
scene.add(plane);

const cubeGeometry = new THREE.BoxGeometry(4,4,4);
const cubeMaterial = new THREE.MeshLambertMaterial({color: 0x00ee22});
for(let i=0;i < (planeGeometry.parameters.width / 5);i++) {
    for(let j=0;j < (planeGeometry.parameters.height / 5);j++) {
        const cube = new THREE.Mesh(cubeGeometry,cubeMaterial);
        cube.position.z = -((planeGeometry.parameters.height) / 2) + 2 + j * 5;
        cube.position.x = -((planeGeometry.parameters.width) / 2) + 2 + (i *5);
        scene.add(cube);

    }
}


const lookAtGeom = new THREE.SphereGeometry(2);
const lookAtMesh = new THREE.Mesh(lookAtGeom,new THREE.MeshLambertMaterial({color:0xff0000}));
scene.add(lookAtMesh);


const directionalLight = new THREE.DirectionalLight(0xffffff,0.7);
directionalLight.position.set(-20,40,60);
scene.add(directionalLight);


// 添加平行光
const ambientLight = new THREE.AmbientLight(0x292929);
scene.add(ambientLight);


const controls = new function() {
    this.perspective = "Perspective";
    this.switchCamera = function () {
        if (camera instanceof THREE.PerspectiveCamera) {
            camera = new THREE.OrthographicCamera(window.innerWidth / -16, window.innerWidth / 16, window.innerHeight / 16, window.innerHeight / -16, -200, 500);
            camera.position.x = 120;
            camera.position.y = 60;
            camera.position.z = 180;

            camera.lookAt(scene.position);
            this.perspective = "Orthographic";
        } else {
            camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.x = 120;
            camera.position.y = 60;
            camera.position.z = 180;

            camera.lookAt(scene.position);
            this.perspective = "Perspective";
        }
    };
}

gui.add(controls,'switchCamera');
gui.add(controls,'perspective').listen();




document.body.append(renderer.domElement);


function render() {
    step += 0.2;
    if(camera instanceof THREE.Camera) {
        let x = 10 + (100 * (Math.sin(step)));
        camera.lookAt(new THREE.Vector3(x,10,0));
        lookAtMesh.position.copy(new THREE.Vector3(x,10,0));
    }
    requestAnimationFrame(render);
    renderer.render(scene,camera);

}

render();


