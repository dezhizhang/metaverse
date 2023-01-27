 // 现在浏览器支持ES6语法，自然包括import方式引入js文件
 import * as THREE from 'three';
 // 引入Three.js扩展库
 import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

 const scene = new THREE.Scene();
 //创建线条模型
 const geometry = new THREE.BufferGeometry();
 //三维样条曲线
 const curve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(100, 0, -100),
  new THREE.Vector3(0, 80, 0),
  new THREE.Vector3(-100, 0, 100),
 ]);

 const points = curve.getSpacedPoints(100);
 geometry.setFromPoints(points);
 const material = new THREE.LineBasicMaterial({
  color:0x006666
 });
 const line = new THREE.Line(geometry,material);
 scene.add(line);

 let index = 20;
 let num = 10;
 let points2 = points.slice(index,index + num);
 let geometry2 = new THREE.BufferGeometry();
 geometry2.setFromPoints(points2);
 const material2 = new THREE.LineBasicMaterial({
  color:0xffff00
 });
 const line2 = new THREE.Line(geometry2,material2);
 scene.add(line2);

 const axesHelper = new THREE.AxesHelper(300);
 scene.add(axesHelper);
 const gridHelper = new THREE.GridHelper(300,25);
 scene.add(gridHelper);

 // 设置相机
 const width = window.innerWidth;
 const height = window.innerHeight;
 const k = width / height;
 const s = 150;
 // 创建相机对像
 const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
 camera.position.set(200, 300, 200);
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
