// 现在浏览器支持ES6语法，自然包括import方式引入js文件
import * as THREE from 'three';
// 引入Three.js扩展库
import {
  OrbitControls
} from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

// 创建线条模型
const geometry = new THREE.BufferGeometry();

//三维样条曲线
const curve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(100, 0, -100),
  new THREE.Vector3(0, 80, 0),
  new THREE.Vector3(-100, 0, 100),
]);

//曲线上等间距返回多个顶点坐标
const points = curve.getSpacedPoints(100);
geometry.setFromPoints(points);
const material = new THREE.LineBasicMaterial({
  color: 0x006666,
});
const line = new THREE.Line(geometry, material);
scene.add(line);

const index = 20;
const num = 10;
const points2 = points.slice(index, index + num);
const geometry2 = new THREE.BufferGeometry();
geometry2.setFromPoints(points2);

const percentArr = [];
for (let i = 0; i < points2.length; i++) {
  percentArr.push(i / points2.length);
}

const percentAttribue = new THREE.BufferAttribute(
  new Float32Array(percentArr),
  1,
);
geometry2.addAttribute.percent = percentAttribue;

const pointsMaterial = new THREE.PointsMaterial({
  color: 0xffff00,
  size: 10.0,
});
const flyPoints = new THREE.Points(geometry2, pointsMaterial);
scene.add(flyPoints);

pointsMaterial.onBeforeCompile = function (shader) {
  shader.vertexShader = shader.vertexShader.replace(
    'void main() {',
    [
      'attribute float percent;', //顶点大小百分比变量，控制点渲染大小
      'void main() {',
    ].join('\n'), // .join()把数组元素合成字符串
  );
  shader.vertexShader = shader.vertexShader.replace(
    'gl_PointSize = size;',
    [
      'gl_PointSize = percent * size;',
    ].join('\n') // .join()把数组元素合成字符串
  )
};

const axesHelper = new THREE.AxesHelper(300);
scene.add(axesHelper);
const gridHelper = new THREE.GridHelper(300,25);
scene.add(gridHelper);

const width = window.innerWidth;
const height = window.innerHeight;
const k = width / height;
const s = 150;
const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
camera.position.set(200,300,200);
camera.lookAt(scene.position);

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
