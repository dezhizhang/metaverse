/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-12 07:44:44
 * :last editor: 张德志
 * :date last edited: 2022-07-23 07:36:05
 */

// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import * as dat from 'dat.gui';

import * as THREE from 'three';
import * as dat from 'dat.gui';

const gui = new dat.GUI();

let step = 0;

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
const planeGeom = new THREE.PlaneGeometry(100,100,4,4);
const planeMaterial = new THREE.MeshBasicMaterial({color:0x777777});
const planeMesh = new THREE.Mesh(planeGeom,planeMaterial)
planeMesh.rotation.x = -Math.PI / 2;
planeMesh.position.y = -20;
scene.add(planeMesh);


// 创建圆形几何体
const sphereGeometry = new THREE.SphereGeometry(14,20,20);
const cubeGeometry = new THREE.BoxGeometry(15,15,15);
const planeGeometry = new THREE.PlaneGeometry(14,14,4,4);

const meshMaterial = new THREE.MeshBasicMaterial({color: 0x7777ff});
const sphere = new THREE.Mesh(sphereGeometry,meshMaterial);
const cube = new THREE.Mesh(cubeGeometry,meshMaterial);
const plane = new THREE.Mesh(planeGeometry,meshMaterial);

sphere.position.x = 0;
sphere.position.y = 3;
sphere.position.z = 2;

cube.position.x = 0;
cube.position.y = 3;
cube.position.z = 2;

plane.position.x = 0;
plane.position.y = 3;
plane.position.z = 2;

scene.add(cube);


// 设置相机的位置
camera.position.x = -20;
camera.position.y = 50;
camera.position.z = 40;

camera.lookAt(new THREE.Vector3(10,0,0));

// 设置光源
const ambientLight = new THREE.AmbientLight(0x0c0c0c);
scene.add(ambientLight);

// 设置点光源
const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(-40,60,-10);
spotLight.castShadow = true;
scene.add(spotLight);



document.body.appendChild(renderer.domElement);


function render() {
    cube.rotation.y = step += 0.01;
    console.log('cube',cube);
            // plane.rotation.y = step;
            // sphere.rotation.y = step;
    requestAnimationFrame(render)
    renderer.render(scene,camera);
}

render();


//     // call the render function
//     var step = 0;
//     var oldContext = null;

//     var controls = new function () {
//         this.rotationSpeed = 0.02;
//         this.bouncingSpeed = 0.03;

//         this.opacity = meshMaterial.opacity;
//         this.transparent = meshMaterial.transparent;
//         this.overdraw = meshMaterial.overdraw;
//         this.visible = meshMaterial.visible;
//         this.side = "front";

//         this.color = meshMaterial.color.getStyle();
//         this.wireframe = meshMaterial.wireframe;
//         this.wireframeLinewidth = meshMaterial.wireframeLinewidth;
//         this.wireFrameLineJoin = meshMaterial.wireframeLinejoin;

//         this.selectedMesh = "cube";

//         this.switchRenderer = function () {
//             if (renderer instanceof THREE.WebGLRenderer) {
//                 renderer = canvasRenderer;
//                 document.getElementById("WebGL-output").empty();
//                 document.getElementById("WebGL-output").appendChild(renderer.domElement);
//             } else {
//                 renderer = webGLRenderer;
//                 document.getElementById("WebGL-output").empty();
//                 document.getElementById("WebGL-output").appendChild(renderer.domElement);
//             }
//         }
//     };

//     var gui = new dat.GUI();


//     var spGui = gui.addFolder("Mesh");
//     spGui.add(controls, 'opacity', 0, 1).onChange(function (e) {
//         meshMaterial.opacity = e
//     });
//     spGui.add(controls, 'transparent').onChange(function (e) {
//         meshMaterial.transparent = e
//     });
//     spGui.add(controls, 'wireframe').onChange(function (e) {
//         meshMaterial.wireframe = e
//     });
//     spGui.add(controls, 'wireframeLinewidth', 0, 20).onChange(function (e) {
//         meshMaterial.wireframeLinewidth = e
//     });
//     spGui.add(controls, 'visible').onChange(function (e) {
//         meshMaterial.visible = e
//     });
//     spGui.add(controls, 'side', ["front", "back", "double"]).onChange(function (e) {

//         switch (e) {
//             case "front":
//                 meshMaterial.side = THREE.FrontSide;
//                 break;
//             case "back":
//                 meshMaterial.side = THREE.BackSide;
//                 break;
//             case "double":
//                 meshMaterial.side = THREE.DoubleSide;
//                 break;
//         }
//         meshMaterial.needsUpdate = true;
//     });
//     spGui.addColor(controls, 'color').onChange(function (e) {
//         meshMaterial.color.setStyle(e)
//     });
//     spGui.add(controls, 'selectedMesh', ["cube", "sphere", "plane"]).onChange(function (e) {

//         scene.remove(plane);
//         scene.remove(cube);
//         scene.remove(sphere);

//         switch (e) {
//             case "cube":
//                 scene.add(cube);
//                 break;
//             case "sphere":
//                 scene.add(sphere);
//                 break;
//             case "plane":
//                 scene.add(plane);
//                 break;

//         }

//         scene.add(e);
//     });

//     gui.add(controls, 'switchRenderer');
//     var cvGui = gui.addFolder("Canvas renderer");
//     cvGui.add(controls, 'overdraw').onChange(function (e) {
//         meshMaterial.overdraw = e
//     });
//     cvGui.add(controls, 'wireFrameLineJoin', ['round', 'bevel', 'miter']).onChange(function (e) {
//         meshMaterial.wireframeLinejoin = e
//     });


//     render();

//     function render() {
//         stats.update();

//         cube.rotation.y = step += 0.01;
//         plane.rotation.y = step;
//         sphere.rotation.y = step;

//         // render using requestAnimationFrame
//         requestAnimationFrame(render);
//         renderer.render(scene, camera);
//     }

//     function initStats() {

//         var stats = new Stats();

//         stats.setMode(0); // 0: fps, 1: ms


//         // Align top-left
//         stats.domElement.style.position = 'absolute';
//         stats.domElement.style.left = '0px';
//         stats.domElement.style.top = '0px';

//         document.getElementById("Stats-output").appendChild(stats.domElement);

//         return stats;
//     }
// }
// window.onload = init;


