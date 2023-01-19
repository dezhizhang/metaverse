import * as THREE from 'three';
import image from './贴图.png';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// 创建场影
const scene = new THREE.Scene();

//创建几何体
const geometry = new THREE.PlaneBufferGeometry(60,60);
const textureLoader = new THREE.TextureLoader();
const material = new THREE.MeshBasicMaterial({
 map:textureLoader.load(image)
});
const mesh = new THREE.Mesh(geometry,material);
mesh.rotateX(-Math.PI / 2);
scene.add(mesh);

const gridHelper = new THREE.GridHelper(300,25,0x004444,0x004444);
gridHelper.position.y = -0.5;
scene.add(gridHelper);
const axesHelper = new THREE.AxesHelper(300);
scene.add(axesHelper);
axesHelper.position.y = -0.2;

const width = window.innerWidth;
const height = window.innerHeight;
const k = width / height;
const s = 150;
const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
camera.position.set(200,300,200);
camera.lookAt(scene.position);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width,height);
document.body.appendChild(renderer.domElement);

function render() {
 renderer.render(scene,camera);
 requestAnimationFrame(render);

}

render();

const controls = new OrbitControls(camera,renderer.domElement);
