import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { line } from './line.js';
import { shapeMesh } from './shapeMesh.js';
import { cirMesh } from './cirMesh.js';


const scene = new THREE.Scene();
const loader = new THREE.FileLoader();
loader.setResponseType('json');

const mapGroup = new THREE.Group();
scene.add(mapGroup);

const lineGroup = new THREE.Group();
mapGroup.add(lineGroup);

const meshGroup = new THREE.Group();
mapGroup.add(meshGroup);
lineGroup.position.z += 0.1;

// 加载地图
loader.load(' /china.json',function(data) {
  data.features.forEach(function(area) {
    if(area.geometry.type === 'Polygon') {
      area.geometry.coordinates = [area.geometry.coordinates];
    }
    lineGroup.add(line(area.geometry.coordinates));
    meshGroup.add(shapeMesh(area.geometry.coordinates));

  })
});

const cirGroup = new THREE.Group();
cirGroup.position.z = 0.2;
scene.add(cirGroup);

loader.load(' /data.json',function(data) {
  const color1 = new THREE.Color(0x00ffcc);
  const color2 = new THREE.Color(0xff6666);

  const pmArr = [];
  data.arr.forEach(function(obj){
    pmArr.push(obj.value);
  });
  pmArr.sort(compareNum);

  const max = pmArr[pmArr.length - 1];
  data.arr.forEach(function(obj) {
    console.log('obj',obj);

    const pm25 = obj.value;
    const color = color1.clone().lerp(color2.clone(),pm25 / max);
    const mesh = cirMesh(obj.coordinate[0],obj.coordinate[1],pm25 / max,color.getHex());
    cirGroup.add(mesh);
    mesh.name = obj.name;
  })
})


// 数组排序规则
function compareNum(num1, num2) {
  if (num1 < num2) {
    return -1;
  } else if (num1 > num2) {
    return 1;
  } else {
    return 0;
  }
}

//three.js辅助坐标系
const axesHelper = new THREE.AxesHelper(300);
scene.add(axesHelper);

// 相机设置
const width = window.innerWidth;
const height = window.innerHeight;
const k = width / height;
const s = 18;

const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
camera.position.set(104,35,200);
camera.lookAt(104,35,0);

// 创建渲染器
const renderer = new THREE.WebGLRenderer({
  antialias:true
});
renderer.setSize(width,height);
document.body.appendChild(renderer.domElement);

function render() {
  renderer.render(scene,camera);
  requestAnimationFrame(render);
}

render();

const controls = new OrbitControls(camera,renderer.domElement);
controls.target.set(104,35,0);
controls.update();

