import * as THREE from 'three';
// import vertexShader from './shader/baseic/vertex.glsl';
// import fragmentShader from './shader/baseic/fragment.glsl';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//创建场影
const scene = new THREE.Scene();

//创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// 设置相机位置
camera.position.set(0, 0, 10);
scene.add(camera);


const geometry = new THREE.PlaneGeometry();


const shaderMaterial = new THREE.RawShaderMaterial({
  vertexShader:`
    
    precision mediump float;

    attribute vec3 position;
    attribute vec2 uv;

    uniform mat4 modelMatrix;
    uniform mat4 projectionMatrix;
    uniform mat4 viewMatrix;

    varying vec2 vUv;


    void main() {
        vUv = uv;
        gl_Position = modelMatrix * projectionMatrix * viewMatrix * vec4(position,1.0);
    }

  `,
  fragmentShader:`
    precision mediump float;

    varying vec2 vUv;
    
    
    void main() {
        gl_FragColor = vec4(vUv, 0.0, 1.0);
    }
  `,
  side:THREE.DoubleSide,
});


const floor = new THREE.Mesh(geometry, shaderMaterial);
scene.add(floor);

// 初始化渲染器
const renderer = new THREE.WebGL1Renderer();

// 设置渲染器大小
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.append(renderer.domElement);


const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);


const controls = new OrbitControls(camera, renderer.domElement);


window.addEventListener('resize',() => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth,window.innerHeight);
})

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
