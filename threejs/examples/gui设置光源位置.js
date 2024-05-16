/*
 * :file description:
 * :name: /threejs/examples/gui设置光源位置.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2024-05-14 06:01:55
 */
import dat from 'dat.gui';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
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

const gui = new dat.GUI();

gui.domElement.style.position = 'absolute';
gui.domElement.style.right = '0px';
gui.domElement.style.top = '20px';


gui.add(directionalLight.position,'x',-300,300).onChange((value) => {
  directionalLightHelper.update();
});

gui.add(directionalLight.position,'y',-300,300).onChange(() => {
  directionalLightHelper.update();
});

gui.add(directionalLight.position,'z',-300,300).onChange(() => {
  directionalLightHelper.update();
});

const textureCube = new THREE.CubeTextureLoader();
textureCube.setPath('/environ/').load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']);

const gltfLoader = new GLTFLoader();
gltfLoader.load('/工厂.glb',function(gltf) {
  gltf.scene.traverse(function(obj) {
    if(obj.isMesh) {
      obj.material.envMap = textureCube;
      obj.material.envMapIntensity = 1.0;
    }
  });
  scene.add(gltf.scene);
})




// 初始化渲染器
const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.shadowMap.enabled = true;
// 设置渲染器大小
renderer.setSize(window.innerWidth, window.innerHeight);


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
  renderer.render(scene, camera);
}

render();
