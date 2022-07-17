
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';

const gui = new dat.GUI();

let step = 0;
//创建场影
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
const planeGeometry = new THREE.PlaneGeometry(60,20,1,1);
const planeMaterial = new THREE.MeshLambertMaterial({color:0xffffff});
const plane = new THREE.Mesh(planeGeometry,planeMaterial);
plane.receiveShadow = true;

// 旋转和设置平面
plane.rotation.x = -0.5 * Math.PI;
plane.position.x = 15;
plane.position.y = 0;
plane.position.z = 0;

// 将平面添加到场景中
scene.add(plane);

// 创建几何体
const cubeGeometry = new THREE.BoxGeometry(4,4,4);
const cubeMaterial = new THREE.MeshLambertMaterial({color:0xff0000});
const cube = new THREE.Mesh(cubeGeometry,cubeMaterial);
cube.castShadow = true;
cube.position.x = -4;
cube.position.y = 3;
cube.position.z = 0;

// 将几何体添加到场影中
scene.add(cube);


const sphereGeometry = new THREE.SphereGeometry(4,20,20);
const sphereMaterial = new THREE.MeshLambertMaterial({color: 0x7777ff});
const sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);

// 设置圆形位置
sphere.position.x = 20;
sphere.position.y = 0;
sphere.position.z = 2;
sphere.castShadow = true;


scene.add(sphere);


// 设置相机的位置
camera.position.x = -25;
camera.position.y = 30;
camera.position.z = 25;
camera.lookAt(new THREE.Vector3(10,0,0));

// 设置基本光源
const ambiColor = '#0c0c0c';
const ambientLight = new THREE.AmbientLight(ambiColor);
scene.add(ambientLight);

// 设置点光源
const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(-40,60,10);
spotLight.castShadow = true;
scene.add(spotLight);


document.body.append(renderer.domElement);

    
const controls = new function () {
    
    this.rotationSpeed = 0.02;
    this.bouncingSpeed = 0.03;
    this.ambientColor = ambiColor;
    this.disableSpotlight = false;
};

gui.addColor(controls, 'ambientColor').onChange(function (e) {
    ambientLight.color = new THREE.Color(e);
});
gui.add(controls, 'disableSpotlight').onChange(function (e) {
    spotLight.visible = !e;
});

function render() {
    
    cube.rotation.x += controls.rotationSpeed;
    cube.rotation.y += controls.rotationSpeed;
    cube.rotation.z += controls.rotationSpeed;

    step += controls.bouncingSpeed;
    sphere.position.x = 20 + ( 10 * (Math.cos(step)));
    sphere.position.y = 2 + ( 10 * Math.abs(Math.sin(step)));

    // render using requestAnimationFrame
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}


render();


