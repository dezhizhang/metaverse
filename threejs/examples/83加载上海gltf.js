import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// 创建场景
const scene = new THREE.Scene();

// 创建光源
const directionalLight = new THREE.DirectionalLight(0xffffff,0.3);
directionalLight.position.set(400,200,300);
scene.add(directionalLight);

// 平行光2
const directionalLight2 = new THREE.DirectionalLight(0xffffff,0.6);
directionalLight2.position.set(-300,600,300);
scene.add(directionalLight2);

// 添加环境光
const ambient = new THREE.AmbientLight(0xffffff,0.5);
scene.add(ambient);

// Three.js三维坐标轴 三个坐标轴颜色RGB分别对应xyz轴
const axesHelper = new THREE.AxesHelper(300);
scene.add(axesHelper);

const model = new THREE.Group();

//创建一个GLTF加载器
const loader = new GLTFLoader();
loader.load('https://tugua.oss-cn-hangzhou.aliyuncs.com/model/shanghai.glb',function(gltf) {
  const floor = gltf.scene.getObjectByName('地面');
  floor.material = new THREE.MeshLambertMaterial({
    color: 0x444433,
  });

  // 设置河面
  const river = gltf.scene.getObjectByName('河面');
  river.material = new THREE.MeshLambertMaterial({
    color: 0x336633,
  });

  gltf.scene.getObjectByName('楼房').traverse(function(object) {
    if(object.type === 'Mesh') {
      object.material = new THREE.MeshLambertMaterial({
        color:0xffffff
      })
    }
  });

  const dongfang = gltf.scene.getObjectByName('东方明珠');
  dongfang.material = new THREE.MeshLambertMaterial({
    color:0x996633
  });
  model.add(gltf.scene);
  scene.add(model);
});

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(30,width / height,1,30000);
camera.position.set(-1496, 1559, 2715);
camera.lookAt(scene.position);

const renderer = new THREE.WebGLRenderer({
  antialias:true
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width,height);
document.body.appendChild(renderer.domElement);

window.onreset = function() {
  renderer.setSize(window.innerWidth,window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();
}

function render() {
  renderer.render(scene,camera);
  requestAnimationFrame(render);

}

render();

