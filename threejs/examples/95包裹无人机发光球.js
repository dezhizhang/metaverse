import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import vertexShader from './light_vertex.glsl.js'
import fragmentShader from './light_fragment.glsl.js'


const scene = new THREE.Scene();

//平行光1
const directionalLight = new THREE.DirectionalLight(0xffffff,0.8);
directionalLight.position.set(400, 200, 300);
scene.add(directionalLight);

// 平行光2
const directionalLight2 = new THREE.DirectionalLight(0xffffff,0.8);
directionalLight2.position.set(-400, -200, -300);
scene.add(directionalLight2);

//环境光
const ambient = new THREE.AmbientLight(0xffffff,0.3);
scene.add(ambient);

//三维坐标轴 
const axesHelper = new THREE.AxesHelper(300);
scene.add(axesHelper);

const model = new THREE.Group();
const geometry = new THREE.SphereGeometry(25,30,30);
const material = new THREE.ShaderMaterial({
  vertexShader:   vertexShader,
  fragmentShader: fragmentShader,
  transparent: true
});

const mesh = new THREE.Mesh(geometry,material);
model.add(mesh);
scene.add(model);


// 波动动画
var S = 2; //波动范围设置
var _s = 1.0;

function waveAnimation() {
  _s += 0.015;
  mesh.scale.set(_s, _s, _s);
  if (_s > S) _s = 1.0;
  requestAnimationFrame(waveAnimation);
}
waveAnimation();


function plane() {
  const gridHelper = new THREE.GridHelper(300, 15, 0x003333, 0x003333);
  model.add(gridHelper);
  const geometry = new THREE.PlaneGeometry(310, 310);
  const material = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.1,
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(geometry,material);
  gridHelper.position.y = -0.1;
  model.add(mesh);
  mesh.rotateX(-Math.PI / 2);
}

plane();


const flyGroup = new THREE.Group();
const mixer = null;
const loader = new GLTFLoader();

loader.load('https://tugua.oss-cn-hangzhou.aliyuncs.com/model/fly.glb',function(gltf) {
  const fly = gltf.scene;
  flyGroup.add(fly);
  fly.traverse(function(child) {
    if(child.isMesh) {
      const material = child.material;
      child.material = new THREE.MeshLambertMaterial({
        color: material.color,
      });
    }
  });
  mixer = new THREE.AnimationMixer(fly);
  const AnimationAction = mixer.clipAction(gltf.animations[0]);
  AnimationAction.timeScale = 15;
  AnimationAction.play();

});
model.add(flyGroup);

const clock = new THREE.Clock();
function updateLoop() {
  if(mixer !== null) {
    mixer.update(clock.getDelta());
  }
  requestAnimationFrame(updateLoop);
}

updateLoop();

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(30, width / height,1,30000);
camera.position.set(292, 223, 185);
camera.lookAt(scene.position);

const renderer = new THREE.WebGLRenderer({
  antialias:true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width,height);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera,renderer.domElement);

window.onresize = function() {
  renderer.setSize(window.innerWidth,window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

}


function render() {
  renderer.render(scene,camera);
  requestAnimationFrame(render);
}

render();
