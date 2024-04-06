import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

// 平行光1
const directionalLight = new THREE.DirectionalLight(0xffffff,0.8);
directionalLight.position.set(200,400,300);
scene.add(directionalLight);

// 平行光2
const directionalLight2 = new THREE.DirectionalLight(0xffffff,0.8);
directionalLight2.position.set(-200, -400, 300);
scene.add(directionalLight2);

// 环境光
const ambient = new THREE.AmbientLight(0xffffff,0.3);
scene.add(ambient);

function ShapeMesh(pointsArr) {
  let vector2Arr = [];
  pointsArr[0].forEach(elem => {
    vector2Arr.push(new THREE.Vector2(elem[0],elem[1]));
  });

  const shape = new THREE.Shape(vector2Arr);
  const geometry = new THREE.ShapeGeometry(shape);
  const material = new THREE.MeshLambertMaterial({
    color: 0x0099ff
  });

  const mesh = new THREE.Mesh(geometry,material);
  return mesh;
}

const model = new THREE.Group();
const loader = new THREE.FileLoader();
loader.setResponseType('json');

loader.load(' /huangpu-river.json',function(data) {
  const buildGroup = new THREE.Group();
  data.features.forEach(build => {
    buildGroup.add(ShapeMesh(build.geometry.coordinates));
  });
  model.add(buildGroup);
  scene.add(model);
});

const width = window.innerWidth;
const height = window.innerHeight;
const camera = new THREE.PerspectiveCamera(30,width / height,0.001,3000);
camera.position.set(292,)
const x = 121.49526536464691;//东方明珠经纬度坐标
const y = 31.24189350905988;
camera.position.set(x+0.02, y+0.02, 0.02);//0.02是根据黄浦江尺寸范围设置  数量级对应即可 具体数值不用精准
camera.lookAt(x,y,0);//根据黄浦江几何中心坐标或附近某个经纬度坐标设置

// 创建渲染器对象
const renderer = new THREE.WebGLRenderer({
  antialias:true
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width,height);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera,renderer.domElement);
controls.target.set(x,y,0);
controls.update();

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
