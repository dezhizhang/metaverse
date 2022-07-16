import * as THREE from 'three';
// 创建场影
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);

// 创建渲染器
const renderer = new THREE.WebGL1Renderer();
renderer.setClearColor(new THREE.Color(0xEEEEE,1.0));
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.shadowMap = {
    enabled:true
};

// 创建平面
const planeGeometry = new THREE.PlaneGeometry(60,20);
const planeMaterial = new THREE.MeshBasicMaterial({color:0xffffff});
const plane = new THREE.Mesh(planeGeometry,planeMaterial);
plane.receiveShadow = true;

plane.rotation.x = -0.5 *Math.PI;
plane.position.x = 15;
plane.position.y = 0;
plane.position.z = 0;

scene.add(plane);


// 创建几何体
const cubeGeometry = new THREE.BoxGeometry(4,4,4);
const cubeMaterial = new THREE.MeshBasicMaterial({color:0xff0000,wireframe:true});
const cube = new THREE.Mesh(cubeGeometry,cubeMaterial);
cube.castShadow = true;

cube.position.x = -4;
cube.position.y = 3;
cube.position.z = 0;
scene.add(cube);

// 创建圆形几何体
const sphereGeometry = new THREE.SphereGeometry(4,20,20);
const sphereMaterial = new THREE.MeshLambertMaterial({color:0x7777ff});
const sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);

sphere.position.x = 20;
sphere.position.y = 4;
sphere.position.z = 2;
sphere.castShadow = true;
scene.add(sphere);


//创建灯光
const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(-40,60,-10);
spotLight.castShadow = true;
scene.add(spotLight);


// 设置相机位置
camera.position.x = -30;
camera.position.y = 40;
camera.position.z = 30;
camera.lookAt(scene.position);


document.body.append(renderer.domElement);
renderer.render(scene,camera);



