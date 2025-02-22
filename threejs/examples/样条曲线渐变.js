/*
 * :file description: 
 * :name: /threejs/examples/样条曲线渐变.js
 * :author:张德志
 * :copyright: (c) 2025, Xiaozhi
 * :date created: 2025-02-22 21:23:55
 * :last editor: 张德志
 * :date last edited: 2025-02-22 21:23:56
 */
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(200, 200, 200);

const renderer = new THREE.WebGLRenderer({});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

new OrbitControls(camera, renderer.domElement);

scene.add(new THREE.AxesHelper(100));

const geometry = new THREE.BufferGeometry();
const curve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(-50, 20, 90),
  new THREE.Vector3(-10, 40, 40),
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(60, -60, 0),
  new THREE.Vector3(70, 0, 80),
]);

const points = curve.getSpacedPoints(100);
geometry.setFromPoints(points);


const colors = [];
const colorStops = [
  {
    position: 0, color: new THREE.Color(0xFF0000)
  },
  {
    position: 0.5, color: new THREE.Color(0x00FF00)
  },
  {
    position: 1, color: new THREE.Color(0x0000FF)
  }
];

points.forEach((point,index) => {
  const t  = index / (points.length - 1);
  let color;

  for(let i=1;i < colorStops.length;i++) {
    if(t <= colorStops[i].position) {
      const prev = colorStops[i - 1];
      const curr = colorStops[i];
      const ratio = (t - prev.position) / (curr.position - prev.position);
      color = prev.color.clone().lerp(curr.color,ratio);
      break
    }
  }
  colors.push(color.r,color.g,color.b)
});

geometry.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));



// 创建线段物体
const material = new THREE.LineBasicMaterial({
  vertexColors: true, // 启用顶点颜色
  linewidth: 5
});

const line = new THREE.Line(geometry, material);
scene.add(line);

function render() {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();
