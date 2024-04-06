import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

//平行光1
const directionalLight = new THREE.DirectionalLight(0xffffff,0.8);
directionalLight.position.set(400, 200, 300);
scene.add(directionalLight);

// 平行光2
const directionalLight2 = new THREE.DirectionalLight(0xffffff,0.8);
directionalLight2.position.set(-400, -200, -300);
scene.add(directionalLight2);

// 环境光
const ambient = new THREE.AmbientLight(0xffffff,0.3);
scene.add(ambient);


//三维坐标轴
const axesHelper = new THREE.AxesHelper(300);
scene.add(axesHelper);

const model = new THREE.Group();
const geometry = new THREE.PlaneGeometry(30,30);
const textureLoader = new THREE.TextureLoader();
const material = new THREE.MeshBasicMaterial({
  color:0x22ffcc,
  map:textureLoader.load(' /marked-aperture.png'),
  transparent:true
});
const mesh = new THREE.Mesh(geometry,material);
model.add(mesh);


mesh.rotateX(-Math.PI / 2);
scene.add(model);


// 波动动画
var S= 20;//波动范围倍数设置
var _s = 1.0;
function waveAnimation() {
  _s += 0.4;
  mesh.scale.set(_s, _s,  _s);
  if (_s <= S*0.2) {
      material.opacity = (_s - 1) /(S*0.2-1);//保证透明度在0~1之间变化
  } else if (_s > S*0.2 && _s <= S) {
      material.opacity = 1 - (_s - S*0.2) /(S - S*0.2);//保证透明度在0~1之间变化
  } else {
      _s = 1.0;
  }
  requestAnimationFrame(waveAnimation);
}
waveAnimation();

function plane() {
  const gridHelper = new THREE.GridHelper(300,15,0x003333,0x003333);
  model.add(gridHelper);

  const geometry = new THREE.PlaneGeometry(310, 310);
  const material = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.1,
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(geometry,material);
  mesh.position.y = 1;
  model.add(mesh);
  mesh.rotateX(-Math.PI / 2);
}

const width = window.innerWidth;
const height = window.innerHeight;
const camera = new THREE.PerspectiveCamera(30,width / height,1,3000);
camera.position.set(292, 223, 185);
camera.lookAt(scene.position);


//创建渲染器对象
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
  renderer.render(scene, camera); //执行渲染操作
  requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧
  // console.log(camera.position);//通过相机控件OrbitControls旋转相机，选择一个合适场景渲染角度
}
render();
