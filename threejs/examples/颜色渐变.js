/*
 * :file description: 
 * :name: /threejs/examples/颜色渐变.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-05-27 05:24:18
 * :last editor: 张德志
 * :date last edited: 2024-05-27 05:24:19
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

//创建场影
const scene = new THREE.Scene();

//创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);

// 设置相机位置
camera.position.set(200, 200, 200);
camera.lookAt(scene.position);

// 初始化渲染器
const renderer = new THREE.WebGLRenderer();

const geometry = new THREE.PlaneGeometry(100,50);

const vertexShader = `
  varying vec3 vPosition;
  void main() {
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
  }
`;

const fragmentShader = `
  varying vec3 vPosition;
  void main() {
    // if(vPosition.y < 0.0) {
    //   gl_FragColor = vec4(1.0,0.0,0.0,1.0);
    // }else {
    //   gl_FragColor = vec4(0.0,1.0,1.0,1.0);
    // }
    float per = (vPosition.y + 25.0) / 50.0;

    gl_FragColor = vec4(per,1.0 - per,0.0,1.0);
  }
`

const material = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  side:THREE.DoubleSide,
})

const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);


// 设置渲染器大小
renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, renderer.domElement);

document.body.append(renderer.domElement);

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
