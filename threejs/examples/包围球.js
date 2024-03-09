import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(72,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(1,1,10);
scene.add(camera);

const ambientLight = new THREE.AmbientLight(0xffffff,3);
scene.add(ambientLight);


const rgbLoader = new RGBELoader();
rgbLoader.load('Alex_Hart-Nature_Lab_Bones_2k.hdr',(envMap) => {
  envMap.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = envMap;
  scene.background = envMap;

});

const gltfLoader = new GLTFLoader();
gltfLoader.load('/Duck.glb',(gltf) => {
  scene.add(gltf.scene);

  const duckMesh = gltf.scene.getObjectByName('LOD3spShape');
  const duckGeometry = duckMesh.geometry;
  duckGeometry.center();


  duckMesh.updateWorldMatrix(true,true);
  // 计算包围盒
  duckGeometry.computeBoundingBox();

  const duckBox = duckGeometry.boundingBox;
  duckBox.applyMatrix4(duckMesh.matrixWorld);

  // 获取中心点 
  const center = duckBox.getCenter(new THREE.Vector3());
  // console.log('center',center);

  const boxHelper = new THREE.Box3Helper(duckBox,0xff00ff);
  scene.add(boxHelper);

  // 获取包围球
  const duckSphere = duckGeometry.boundingSphere;
  duckSphere.applyMatrix4(duckMesh.matrixWorld);

  const sphereGeometry = new THREE.SphereGeometry(
    duckSphere.radius,
    16,16
  );
  const material = new THREE.MeshBasicMaterial({
    color:0xff0000,
    wireframe:true
  });
  const mesh = new THREE.Mesh(sphereGeometry,material);
  scene.add(mesh);
});

// 初始化渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera,renderer.domElement);


window.addEventListener('resize',() => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth,window.innerHeight);
})

function render() {
  requestAnimationFrame(render);
  renderer.render(scene,camera);
}

render();



