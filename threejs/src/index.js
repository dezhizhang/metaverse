import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


const scene = new THREE.Scene();
const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array([
	30, 0,30,  250, 0,30,  200,0,150, 20, 0,150, 
]);

const attribue = new THREE.BufferAttribute(vertices,3);
geometry.attributes.position = attribue;
const material = new THREE.LineBasicMaterial({
	color: 0x00ffff, //线条颜色
});
const line = new THREE.Line(geometry,material);
scene.add(line);

const axesHelper = new THREE.AxesHelper(300);
scene.add(axesHelper);

// 相机设置
const width = window.innerWidth;
const height = window.innerHeight;

const k = width / height;
const s = 200;
const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
camera.position.set(200, 300, 200);
camera.lookAt(scene.position);

// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width,height);
document.body.appendChild(renderer.domElement);

function render() {
	renderer.render(scene,camera);
	requestAnimationFrame(render);
}

render();

const controls = new OrbitControls(camera,renderer.domElement);


