 // 现在浏览器支持ES6语法，自然包括import方式引入js文件
 import * as THREE from 'three';
 // 引入Three.js扩展库
 import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
 // 引入线宽设置相关库
 import { LineSegmentsGeometry } from 'three/examples/jsm/lines/LineSegmentsGeometry.js';
 import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js';
 import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
 import { LineSegments2 } from 'three/examples/jsm/lines/LineSegments2.js';
 import { Line2 } from 'three/examples/jsm/lines/Line2.js';

const scene = new THREE.Scene();
//创建线条模型
const geometry = new THREE.BufferGeometry(); 
// 三维样条曲线
const curve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(100, 0, -100),
  new THREE.Vector3(0, 80, 0),
  new THREE.Vector3(-100, 0, 100),
]);
//曲线上等间距返回多个顶点坐标
const points = curve.getSpacedPoints(100);
geometry.setFromPoints(points);
const material = new THREE.LineBasicMaterial({
  color: 0x006666, //轨迹颜色
});
const line = new THREE.Line(geometry,material);
scene.add(line);

let index = 20;
let num = 10;
let points2 = points.slice(index, index + num);
const geometry2 = new LineGeometry();
const pointArr = [];
points2.forEach((v3) => {
  pointArr.push(v3.x,v3.y,v3.z);
});

geometry2.setPositions(pointArr);
const posNum = points2.length - 2;
const colorArr = [];
for(let i=0;i < points2.length;i++) {
  let color1 = new THREE.Color(0x006666);
  let color2 = new THREE.Color(0xffff00);
  let color = null;
  if(i < posNum) {
    color = color1.lerp(color2, i / posNum);
  }else {
    color = color2.lerp(color1, (i - posNum) / (points2.length - posNum));
  }
  colorArr.push(color.r,color.g,color.b);
}

geometry2.setColors(colorArr);

let material2 = new LineMaterial({
  linewidth:3,
  vertexColors: THREE.VertexColors, // 注释color设置，启用顶点颜色渲染
});

 material2.resolution.set(window.innerWidth, window.innerHeight);
 //Line2模型对象
 let line2 = new Line2(geometry2,material2);
 scene.add(line2);

 const axesHelper = new THREE.AxesHelper(300);
 scene.add(axesHelper);

 const gridHelper = new THREE.GridHelper(300,25);
 scene.add(gridHelper);

 const width = window.innerWidth;
 const height = window.innerHeight;

 const k = width / height;
 const s = 150;
 //创建相机对象
 const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
 camera.position.set(200, 300, 200); //设置相机位置
 camera.lookAt(scene.position);

 const renderer = new THREE.WebGLRenderer({
  antialias:true
 });
 renderer.setSize(width,height);
 document.body.appendChild(renderer.domElement);

 const indexMax = points.length - num;
 function render() {
  if(index > indexMax) index = 0;
  index += 1;
  points2 = points.slice(index,index + num);
  let pointArr = [];
  points2.forEach(function(v3){
    pointArr.push(v3.x,v3.y,v3.z);
  });
  geometry2.setPositions(pointArr);
  renderer.render(scene,camera);
  requestAnimationFrame(render);
 }

 render();

 const controls = new OrbitControls(camera,renderer.domElement);
