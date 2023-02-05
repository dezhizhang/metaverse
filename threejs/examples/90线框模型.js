import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x001122,10,50);

// 光源设置
const directionalLight = new THREE.DirectionalLight(0xffffff,0.5);
directionalLight.position.set(400, 200, 300);
scene.add(directionalLight);

// 平行光2
const directionalLight2 = new THREE.DirectionalLight(0xffffff,0.5);
directionalLight2.position.set(400, 200, 300);
scene.add(directionalLight2);

// 环境光
const ambient = new THREE.AmbientLight(0xffffff,0.4);
scene.add(ambient);

// 三维坐标轴 
const axesHelper = new THREE.AxesHelper(300);
scene.add(axesHelper);

let groundGrid = new THREE.Group();
groundGrid = createGroundGrid(100, 80, 0x004444, 0.05, 0x00aaaa);
groundGrid.position.z = -0.1;
scene.add(groundGrid);



function createGroundGrid(rangeSize, divisions, color, R, RColor) {
  let group = new THREE.Group();
  const gridHelper = new THREE.GridHelper(rangeSize,divisions.color,color); 
  group.add(gridHelper);
  gridHelper.material.depthWrite = false;
  gridHelper.renderOrder = -2;

  const geometry = new THREE.CircleGeometry(R,20,20);
  geometry.rotateX(Math.PI / 2);
  const material = new THREE.MeshBasicMaterial({
    color:RColor,
    side:THREE.DoubleSide,
    depthWrite:false,
  });
  const distance = rangeSize / divisions;
  const halfRange =  rangeSize / 2;

  for(let i=0;i < divisions;i++) {
    for(let j =0;j < divisions;j++) {
      const mesh = new THREE.Mesh(geometry,material);
      mesh.renderOrder = -1;
      mesh.translateX(-halfRange + i * distance);
      mesh.translateZ(-halfRange + j * distance);
      group.add(mesh);
    }
    return group
  }
}


const width = window.innerWidth;
const height = window.innerHeight;

// 设置相机
const k = width / height;
const s = 100;
const camera = new THREE.PerspectiveCamera(30, width / height,1,3000);
camera.position.set(15,8,10);
camera.lookAt(scene.position);

// 设置渲染器
const renderer = new THREE.WebGLRenderer({
  antialias:true
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width,height);

document.body.appendChild(renderer.domElement);
renderer.setClearColor(0x001122,1);


const controls = new OrbitControls(camera,renderer.domElement);

function render() {
  renderer.render(scene,camera);
  requestAnimationFrame(render);
}

render();
