 // 现在浏览器支持ES6语法，自然包括import方式引入js文件
 import * as THREE from 'three';
 // 引入Three.js扩展库
 import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


 const scene = new THREE.Scene();

 // 创建线条模型
 const geometry = new THREE.BufferGeometry();
 
 // 创建样条线
 const curve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(100, 0, -100),
  new THREE.Vector3(0, 80, 0),
  new THREE.Vector3(-100, 0, 100),
 ]);

 // 曲线上等间距返回多个顶点坐标
 const points = curve.getSpacedPoints(40);
 console.log(points);

 geometry.setFromPoints(points);
 const material = new THREE.LineBasicMaterial({
  color: 0x00ffff, //轨迹颜色
 });
 const line = new THREE.Line(geometry,material);
 scene.add(line);


 const axesHelper = new THREE.AxesHelper(300);
 scene.add(axesHelper);

 const gridHelper = new THREE.GridHelper(300,25);
 scene.add(gridHelper);

 /**
  * 相机设置
  */
 var width = window.innerWidth; //窗口宽度
 var height = window.innerHeight; //窗口高度
 var k = width / height; //窗口宽高比
 var s = 150; //三维场景显示范围控制系数，系数越大，显示的范围越大
 //创建相机对象
 var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
 camera.position.set(200, 300, 200); //设置相机位置
 // camera.position.set(0, 0, 200); //设置相机位置
 camera.lookAt(scene.position); //设置相机方向(指向的场景对象)

 const renderer = new THREE.WebGLRenderer({
  antialias:true
 });
 renderer.setSize(width,height);

 document.body.appendChild(renderer.domElement);


 function render() {
  requestAnimationFrame(render);
  renderer.render(scene,camera);
 }

 render();

