import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

// 平行光
const directionalLight = new THREE.DirectionalLight(0xffffff,0.8);
directionalLight.position.set(400, 200, 300);
scene.add(directionalLight);

// 平行光2
const directionalLight2 = new THREE.DirectionalLight(0xffffff,0.8);
directionalLight2.position.set(-400,-200,-300);
scene.add(directionalLight2);

// 环境光
const ambient = new THREE.AmbientLight(0xffffff,0.3);
scene.add(ambient);

//三维坐标轴 三个坐标轴颜色RGB分别对应xyz轴
const axesHelper = new THREE.AxesHelper(300);
scene.add(axesHelper);

const model = new THREE.Group();
const shape1 = new THREE.Sphere([
    new THREE.Vector2(0, 0),
    new THREE.Vector2(60, 0),
    new THREE.Vector2(60, 80),
    new THREE.Vector2(40, 120),
    new THREE.Vector2(-20, 80),
]);

const shape2 = new THREE.Sphere([
    new THREE.Vector2(100, 0),
    new THREE.Vector2(160, 0),
    new THREE.Vector2(160, 80),
    new THREE.Vector2(140, 120),
]);

const geometry = new THREE.ExtrudeGeometry([shape1,shape2],{
    depth:50,
    bevelEnabled:false
});

const material = new THREE.MeshLambertMaterial({
    color: 0x00ffff,
    side: THREE.DoubleSide,
});

const mesh = new THREE.Mesh(geometry,material);
model.add(mesh);
scene.add(model);

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(30,width / height,1,3000);
camera.position.set(292,223,185);
camera.lookAt(scene.position);

// 创建渲染对像
const renderer = new THREE.WebGLRenderer({
    antialias:true
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width,height);
document.body.appendChild(renderer.domElement);

window.onresize = function() {
    renderer.setSize(window.innerWidth,window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

}

function render() {
    renderer.render(scene,camera);
    requestAnimationFrame(render);
}

render();
