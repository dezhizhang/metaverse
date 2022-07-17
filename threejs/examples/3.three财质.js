/*
 * :file description: ;

 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-12 07:44:44
 * :last editor: 张德志
 * :date last edited: 2022-07-16 23:18:29
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';

// 创建gui
const gui = new dat.GUI();

// 创建场影
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0xffffff, 0.015);

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

// 设置平面的位置
plane.rotation.x = -0.5 *Math.PI;
plane.position.x = 0;
plane.position.y = 0;
plane.position.z = 0;

// 将平面添加到场景中
scene.add(plane);

// 设置相机位置
camera.position.x = -30;
camera.position.y = 40;
camera.position.z = 30;
camera.lookAt(scene.position);

// 创建平行光
const ambientLight = new THREE.AmbientLight(0x0c0c0c);
scene.add(ambientLight);

//创建点光源
const spotLight = new THREE.SpotLight(0xeeeeee);
spotLight.position.set(-40,60,10);
spotLight.castShadow = true;
scene.add(spotLight);




//创建控制器
var controls = new function () {
    new OrbitControls(camera,renderer.domElement);
    this.rotationSpeed = 0.02;
    this.numberOfObjects = scene.children.length;

    this.removeCube = function () {
        var allChildren = scene.children;
        var lastObject = allChildren[allChildren.length - 1];
        if (lastObject instanceof THREE.Mesh) {
            scene.remove(lastObject);
            this.numberOfObjects = scene.children.length;
        }
    };

    this.addCube = function() {
        const cubeSize = Math.ceil((Math.random() * 3));
        const cubeGeometry = new THREE.BoxGeometry(cubeSize,cubeSize,cubeSize);
        const cubeMaterial = new THREE.MeshBasicMaterial({color:Math.random() * 0xffffff});
        const cube = new THREE.Mesh(cubeGeometry,cubeMaterial);
        cube.castShadow = true;

        cube.position.x = - 30 + Math.round((Math.random() * planeGeometry.parameters.width));
        cube.position.y = Math.round((Math.random() * 5));
        cube.position.z = -20 + Math.round((Math.random() * planeGeometry.parameters.height));

        // 添加场景中
        scene.add(cube);
        this.numberOfObjects = scene.children.length;
    }

    this.outputObjects = function() {
        console.log(scene.children)
    }
};

gui.add(controls, 'rotationSpeed', 0, 0.5);
gui.add(controls, 'addCube');
gui.add(controls, 'removeCube');
gui.add(controls, 'outputObjects');
gui.add(controls, 'numberOfObjects').listen();

document.body.append(renderer.domElement);

function render() {
    scene.traverse((e) => {
        if(e instanceof THREE.Mesh && e != plane) {
            e.rotation.x += controls.rotationSpeed;
            e.rotation.y += controls.rotationSpeed;
            e.rotation.z += controls.rotationSpeed;
        }
    });
    requestAnimationFrame(render);
    renderer.render(scene,camera);

}

render();


