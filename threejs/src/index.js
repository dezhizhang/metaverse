/*
 * :file description:
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2024-05-16 23:24:49
 */
import dat from 'dat.gui';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';

//创建场影
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(200, 200, 200);
camera.lookAt(0, 0, 0);

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);


const directionalLight = new THREE.DirectionalLight(0xffffff,1);
directionalLight.position.set(100,60,50);
scene.add(directionalLight);

scene.add(new THREE.CameraHelper(directionalLight.shadow.camera));

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight)

scene.add(directionalLightHelper);


const ambient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambient);

const geometry = new THREE.BoxGeometry(50, 50, 50);
const material = new THREE.MeshLambertMaterial({
    color: 0x009999,
});
const mesh = new THREE.Mesh(geometry, material);

const mesh2 = mesh.clone();
mesh2.position.y = 100;
const mesh3 = mesh.clone();
mesh3.position.x = 100;


// 三个网格模型用于高亮发光描边测试
scene.add(mesh,mesh2,mesh3);

// 初始化渲染器
const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.shadowMap.enabled = true;
// 设置渲染器大小
renderer.setSize(window.innerWidth, window.innerHeight);



// 后处理
const composer = new EffectComposer(renderer);

const renderPass = new RenderPass(scene,camera);
composer.addPass(renderPass);

const v2 = new THREE.Vector2(window.innerWidth,window.innerHeight);

const outlinePass = new OutlinePass(v2,scene,camera);

outlinePass.selectedObjects = [mesh];

composer.addPass(outlinePass);








const controls = new OrbitControls(camera,renderer.domElement);



window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

document.body.append(renderer.domElement);

function render() {
  requestAnimationFrame(render);
  composer.render();
  // renderer.render(scene, camera);
}

render();
