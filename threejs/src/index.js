import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import vertexShader from './shader/point/vertex.glsl';
import fragmentShader from './shader/point/fragment.glsl';


//创建场影
const scene = new THREE.Scene();

//创建相机
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);

// 设置相机位置
camera.position.set(0,0,10);
scene.add(camera);


const geometry = new THREE.BufferGeometry();
const position = new Float32Array([0,0,0]);
geometry.setAttribute('position',new THREE.BufferAttribute(position,3));
const material = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader
});





//  生成点
const points  = new THREE.Points(geometry,material);
scene.add(points);


const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);


// 初始化渲染器
const renderer = new THREE.WebGL1Renderer();

// 设置渲染器大小
renderer.setSize(window.innerWidth,window.innerHeight);

document.body.append(renderer.domElement);

const controls = new OrbitControls(camera,renderer.domElement);



function render() {
  requestAnimationFrame(render);
  renderer.render(scene,camera);
}

render();
