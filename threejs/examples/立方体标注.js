/*
 * :file description: 
 * :name: /threejs/examples/立方体标注.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-13 15:26:56
 * :last editor: 张德志
 * :date last edited: 2024-04-13 15:43:34
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

//创建场影
const scene = new THREE.Scene();

//创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// 设置相机位置
camera.position.set(20, 20, 20);
camera.lookAt(scene.position);


const geometry = new THREE.BoxGeometry(10,10,10);
const material = new THREE.MeshBasicMaterial({
  color:0x0000ff
});
const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);

const div = document.createElement('div');
div.innerHTML = '立方体';
div.style.padding = '4px 10px';
div.style.color = '#fff';
div.style.backgroundColor = 'rgba(25,25,25,0.5)';
div.style.borderRadius = '5px';

const label = new CSS2DObject(div);
label.position.copy(mesh.position);
label.position.y += 5;
label.position.x += 5;
scene.add(label);


const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth,window.innerHeight);
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = '0px';
labelRenderer.domElement.style.left = '0px';
labelRenderer.domElement.style.pointerEvents = 'none';
document.body.appendChild(labelRenderer.domElement);

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);


// 初始化渲染器
const renderer = new THREE.WebGL1Renderer();

// 设置渲染器大小
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.append(renderer.domElement);

const controls = new OrbitControls(camera,renderer.domElement);




function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
  labelRenderer.render(scene,camera);
}

render();
