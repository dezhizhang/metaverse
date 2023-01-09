/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2022-07-12 07:44:44
 * :last editor: 张德志
 * :date last edited: 2023-01-10 06:48:15
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

/**
     * 创建场景对象Scene
     */
 var scene = new THREE.Scene();
 // 矩形平面网格模型设置背景透明的png贴图
 var geometry = new THREE.PlaneBufferGeometry(60, 60); //默认在XOY平面上
 var textureLoader = new THREE.TextureLoader(); // TextureLoader创建一个纹理加载器对象
 var material = new THREE.MeshBasicMaterial({
   color: 0x00ffff,//设置光圈颜色
   map: textureLoader.load('https://tugua.oss-cn-hangzhou.aliyuncs.com/%E8%B4%B4%E5%9B%BE.png'),
   transparent: true, //使用背景透明的png贴图，注意开启透明计算      
   // side: THREE.DoubleSide, //双面可见
 });
 var mesh = new THREE.Mesh(geometry, material);
 // mesh.rotateX(-Math.PI / 2); //旋转到XOZ平面
 scene.add(mesh);

 var gridHelper = new THREE.GridHelper(300, 25, 0x004444, 0x004444);
 gridHelper.position.y = -0.5;
 scene.add(gridHelper);
 var axesHelper = new THREE.AxesHelper(300);
 scene.add(axesHelper);
 axesHelper.position.y = -0.2;
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
 /**
  * 创建渲染器对象
  */
 var renderer = new THREE.WebGLRenderer();
 renderer.setSize(width, height); //设置渲染区域尺寸
 // renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
 document.body.appendChild(renderer.domElement); //body元素中插入canvas对象
 
 // 光圈大小在1~2.5倍之间变化
 var _s = 2.5;
 // 渲染函数
 function render() {
   _s += 0.01;
   mesh.scale.set(_s, _s, _s);
   mesh.material.opacity = 1 - (_s - 1) / 1.5;//缩放2.5对应0 缩放1.0对应1
   if (_s > 2.5) _s = 1;
   renderer.render(scene, camera); //执行渲染操作
   requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧
 }
 render();
 //创建控件对象  相机对象camera作为参数   控件可以监听鼠标的变化，改变相机对象的属性
 var controls = new OrbitControls(camera, renderer.domElement);