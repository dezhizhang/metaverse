/*
 * :file description:
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2024-05-14 05:02:31
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

scene.add(new THREE.DirectionalLightHelper(directionalLight));


const ambient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambient);


const gui = new dat.GUI();



const textureCube = new THREE.CubeTextureLoader()
    .setPath('/environ/')
    .load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']);
textureCube.encoding = THREE.SRGBColorSpace;//和renderer.outputEncoding一致

const gltfLoader = new GLTFLoader();
gltfLoader.load('/工厂.glb',function(gltf) {
  gltf.scene.traverse(function(obj) {
    if(obj.isMesh) {
      obj.material.envMap = textureCube;
      obj.material.envMapIntensity = 1.0;
    }
  });

  const obj = {
    envMapIntensity:1.0,
  }

  gui.add(obj,'envMapIntensity',0,10).onChange((value) => {
    gltf.scene.traverse(function(obj) {
      if(obj.isMesh) {
        obj.material.envMapIntensity = value;
      }
    })
  })

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
