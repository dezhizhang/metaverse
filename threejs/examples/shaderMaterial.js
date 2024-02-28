import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//创建场影
const scene = new THREE.Scene();

//创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// 设置相机位置
camera.position.set(0, 0, 10);
scene.add(camera);


const geometry = new THREE.PlaneGeometry();


const shaderMaterial = new THREE.ShaderMaterial({
  vertexShader:`
    void main() {
      gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position,1.0);
    }
  `,
  fragmentShader:`
    void main() {
      gl_FragColor = vec4(1.0,0.0,0.0,1.0);
    }
  `
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

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
