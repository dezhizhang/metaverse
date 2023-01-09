/*
 * :file description: 
 * :name: /threejs/examples/48.拉伸几何体.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-01-10 06:12:15
 * :last editor: 张德志
 * :date last edited: 2023-01-10 06:12:16
 */
/*
 * :file description:
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2022-07-12 07:44:44
 * :last editor: 张德志
 * :date last edited: 2023-01-10 06:11:25
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// 创建场景
const scene = new THREE.Scene();

// 创建网格模型
const arr = [
  [0, 0],
  [0, 50],
  [50, 50],
  [50, 0],
  [50, 0],
];

const vector2Arr = [];
arr.forEach((elem) => {
  vector2Arr.push(new THREE.Vector2(elem[0],elem[1]));
});

const material = new THREE.MeshBasicMaterial({
  color: 0x004444,
  side: THREE.DoubleSide, //两面可见
});
const shape = new THREE.Shape(vector2Arr);
const geometry = new THREE.ExtrudeBufferGeometry(
  shape,
  {
    amount: 10, //拉伸长度
    bevelEnabled: false, //无倒角
  }
);

const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);

const axesHelper = new THREE.AxesHelper(300);
scene.add(axesHelper);

const width = window.innerWidth;
const height = window.innerHeight;
const k = width / height; //窗口宽高比
const s = 150; //三维场景显示范围控制系数，系数越大，显示的范围越大
//创建相机对象
const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
camera.position.set(200, 300, 200); //设置相机位置
// camera.position.set(0, 0, 200); //设置相机位置
camera.lookAt(scene.position); //设置相机方向(指向的场景对象)


const renderer = new THREE.WebGLRenderer();
renderer.setSize(width,height);
renderer.setClearColor(0xb9d3ff,1);
document.body.appendChild(renderer.domElement);

function render() {
  requestAnimationFrame(render);
  renderer.render(scene,camera);
}

render();

const controls = new OrbitControls(camera,renderer.domElement);
controls.addEventListener('change',render);

