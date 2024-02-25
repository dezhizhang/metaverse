import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(0,0,10);
scene.add(camera);

const sphereGeometry = new THREE.SphereGeometry(1,20,20);
const material = new THREE.MeshStandardMaterial();
const sphere = new THREE.Mesh(sphereGeometry,material);
sphere.castShadow = true;

scene.add(sphere);

const planeGeometry = new THREE.PlaneGeometry(50,50);
const plane = new THREE.Mesh(planeGeometry,material);
plane.position.set(0,-1,0);
plane.rotation.x = -Math.PI / 2;
plane.receiveShadow = true;
scene.add(plane);


// 灯光
const spotLight = new THREE.SpotLight(0xffffff,0.5);
spotLight.position.set(5,5,5);
spotLight.castShadow = true;
spotLight.shadow.radius = 20;
spotLight.color = new THREE.Color(0xff00ff);
spotLight.shadow.mapSize.set(4096,4096);
spotLight.target = sphere;
scene.add(spotLight);


const spotLightHelper = new THREE.SpotLightHelper( spotLight );
scene.add(spotLightHelper)

const light = new THREE.AmbientLight(0xffffff,0.5);
scene.add(light);


// 渲染
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;

const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);

function render() {
  requestAnimationFrame(render);
  renderer.render(scene,camera);

}

render();

const controls = new OrbitControls(camera,renderer.domElement);

document.body.appendChild(renderer.domElement);


