// /*
//  * :file description: 
//  * :name: /threejs/src/scene.js
//  * :author: 张德志
//  * :copyright: (c) 2024, Tungee
//  * :date created: 2024-02-09 17:09:51
//  * :last editor: 张德志
//  * :date last edited: 2024-02-18 06:24:59
//  */
// // 引入Three.js
// import * as THREE from 'three';
// // 引入Three.js扩展库
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

    

// var R = 100;//地球半径
// var earth = createEarth(R);// 创建地球
// /**
//  * 创建场景对象Scene
//  */
// var scene = new THREE.Scene();
// scene.add(earth);//地球Mesh插入场景中
// /**
// * 光源设置
// */
// // 平行光1
// var directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
// directionalLight.position.set(400, 200, 300);
// scene.add(directionalLight);
// // 平行光2
// var directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.6);
// directionalLight2.position.set(-400, -200, -300);
// scene.add(directionalLight2);
// //环境光
// var ambient = new THREE.AmbientLight(0xffffff, 0.6);
// scene.add(ambient);

// // width和height用来设置Three.js输出Canvas画布尺寸，同时用来辅助设置相机渲染范围
// var width = window.innerWidth; //窗口文档显示区的宽度
// var height = window.innerHeight; //窗口文档显示区的高度
// /**
// * 相机设置
// */
// var k = width / height; //Three.js输出的Cnavas画布宽高比
// // var s = 200; //控制相机渲染空间左右上下渲染范围，s越大，相机渲染范围越大
// var s = 120;
// //THREE.OrthographicCamera()创建一个正投影相机对象
// // -s * k, s * k, s, -s, 1, 1000定义了一个长方体渲染空间，渲染空间外的模型不会被渲染
// var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
// camera.position.set(200, 300, 200); //相机在Three.js坐标系中的位置
// camera.lookAt(0, 0, 0); //相机指向Three.js坐标系原点
// /**
//  * 创建渲染器对象
//  */
// var renderer = new THREE.WebGLRenderer({
//   antialias: true, //开启锯齿
// });
// renderer.setPixelRatio(window.devicePixelRatio);//设置设备像素比率,防止Canvas画布输出模糊。
// renderer.setSize(width, height); //设置渲染区域尺寸
// // renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
// // renderer.domElement表示Three.js渲染结果,也就是一个HTML元素(Canvas画布)
// // document.body.appendChild(renderer.domElement); //body元素中插入canvas对象

// // 渲染循环
// function render() {
//   renderer.render(scene, camera); //执行渲染操作
//   requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧
// }
// render();

// // Three.js三维坐标轴 三个坐标轴颜色RGB分别对应xyz轴
// var axesHelper = new THREE.AxesHelper(250);
// scene.add(axesHelper);


// //创建控件对象  控件可以监听鼠标的变化，改变相机对象的属性
// // 旋转：拖动鼠标左键
// // 缩放：滚动鼠标中键
// // 平移：拖动鼠标右键
// var controls = new OrbitControls(camera, renderer.domElement);

// export { scene, renderer, camera }