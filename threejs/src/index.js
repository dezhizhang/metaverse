/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2022-07-12 07:44:44
 * :last editor: 张德志
 * :date last edited: 2023-02-07 05:59:56
 */
import  * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import output_fragment from './output_fragment.glsl.js';
import {  CSS2DObject,CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

var scene = new THREE.Scene();
// scene.add(model); //三维模型添加到场景中
/**
 * 光源设置
 */
// 平行光1
var directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
directionalLight.position.set(400, 200, 300);
scene.add(directionalLight);
// 平行光2
var directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight2.position.set(-300, 600, -300);
scene.add(directionalLight2);
//环境光
var ambient = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambient);

// Three.js三维坐标轴 三个坐标轴颜色RGB分别对应xyz轴
var axesHelper = new THREE.AxesHelper(250);

function tag(name) {
  // 创建div元素(作为标签)
  var div = document.createElement('div');
  div.innerHTML = name;
  div.classList.add('tag');
  //div元素包装为CSS2模型对象CSS2DObject
  var label = new CSS2DObject(div);
  div.style.pointerEvents = 'none';//避免HTML标签遮挡三维场景的鼠标事件
  // 设置HTML元素标签在three.js世界坐标中位置
  // label.position.set(x, y, z);
  return label;//返回CSS2模型标签      
}

var model = new THREE.Group(); //声明一个组对象，用来添加城市三场场景的模型对象

var loader = new GLTFLoader(); //创建一个GLTF加载器
loader.load("https://tugua.oss-cn-hangzhou.aliyuncs.com/model/shanghai.glb", function (gltf) { //gltf加载成功后返回一个对象
  console.log('控制台查看gltf对象结构', gltf);
  // 设置地面材质
  var Floor = gltf.scene.getObjectByName('地面');
  Floor.material = new THREE.MeshLambertMaterial({
    color: 0x001111,
  });
  // 设置河面材质
  var River = gltf.scene.getObjectByName('河面');
  River.material = new THREE.MeshLambertMaterial({
    color: 0x001f1c,
  });
  // 所有建筑物递归遍历批量设置材质
  gltf.scene.getObjectByName('楼房').traverse(function (child) {
    if (child.isMesh) {
      child.material = new THREE.MeshLambertMaterial({
        // color: 0x1A92C6,//场景小对应颜色  可以亮一些
        color: 0x001111, //场景大可以暗一些  要不然整个屏幕太亮
        transparent: true, //允许透明计算
        opacity: 0.7, //半透明设置
      });
      // 设置模型边线
      var edges = new THREE.EdgesGeometry(child.geometry, 1);
      var edgesMaterial = new THREE.LineBasicMaterial({
        // color: 0x31DEEF,
        color: 0x006666,
      });
      var line = new THREE.LineSegments(edges, edgesMaterial);
      child.add(line);
    }
    
  });

  scene.add(model);






  // 如果想代码方便，一般最好让美术把模型的局部坐标原点设置在你想标注的位置
  var arr = ['东方明珠','上海中心大厦','金茂大厦','环球金融中心'];
  for (var i = 0; i < arr.length; i++) {
    var obj = gltf.scene.getObjectByName(arr[i]);
    var messageTag = tag(arr[i]);//创建标签对象
    var pos = new THREE.Vector3();
    obj.getWorldPosition(pos); //获取obj世界坐标
    messageTag.position.copy(pos); //标签标注在obj世界坐标
    model.add(messageTag);//标签对象添加到三维场景
    messageTag.position.y += 20;//可以根据自己需要微调偏移HTML标签
   //美术给的需要标注的模型的局部坐标系坐标原点在底部，如果你想标注顶部，就需要在世界坐标基础上考虑模型高度
    if(arr[i]==='东方明珠') messageTag.position.y += 450; 
  }

  for (var i = 0; i < arr.length; i++) {
    var dongfang = gltf.scene.getObjectByName(arr[i]);
    dongfang.material = new THREE.MeshLambertMaterial({
      color: 0x1A92C6, //需要突出的模型可以更加亮一些
      // color: 0x001111,//场景大可以暗一些  要不然整个屏幕太亮
      transparent: true, //允许透明计算
      opacity: 0.7, //半透明设置
    });
    // 设置模型边线
    var edges = new THREE.EdgesGeometry(dongfang.geometry, 1);
    var edgesMaterial = new THREE.LineBasicMaterial({
      color: 0x31DEEF,
      // color: 0x006666,
    });
    var line = new THREE.LineSegments(edges, edgesMaterial);
    dongfang.add(line);
  }




  //把gltf.scene中的所有模型添加到model组对象中
  model.add(gltf.scene);
});
scene.add(model);

// width和height用来设置Three.js输出Canvas画布尺寸，同时用来辅助设置相机渲染范围
var width = window.innerWidth; //窗口文档显示区的宽度
var height = window.innerHeight; //窗口文档显示区的高度
/**
* 透视投影相机设置
*/
// 30:视场角度, width / height:Canvas画布宽高比, 1:近裁截面, 30000：远裁截面
var camera = new THREE.PerspectiveCamera(30, width / height, 1, 30000);
// camera.position.set(1000, 1000, 1000);//根据场景尺寸数量级预先设置一个相机大致位置
camera.position.set(-1770, 842, -221);//通过OrbitControls改变相机状态，浏览器控制台选择合适的相机具体位置
camera.lookAt(0, 0, 0);//相机指向Three.js坐标系原点

/**
 * 创建渲染器对象
 */
var renderer = new THREE.WebGLRenderer({
    antialias: true, //开启锯齿
});
renderer.setPixelRatio(window.devicePixelRatio);//设置设备像素比率,防止Canvas画布输出模糊。
renderer.setSize(width, height); //设置渲染区域尺寸
// renderer.setClearColor(0xffffff, 1); //设置背景颜色
// renderer.domElement表示Three.js渲染结果,也就是一个HTML元素(Canvas画布)
document.body.appendChild(renderer.domElement); //body元素中插入canvas对象

//创建控件对象  控件可以监听鼠标的变化，改变相机对象的属性
// 旋转：拖动鼠标左键
// 缩放：滚动鼠标中键
// 平移：拖动鼠标右键
var controls = new OrbitControls(camera, renderer.domElement);

// 创建一个CSS2渲染器CSS2DRenderer
var labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = 'absolute';
// 相对标签原位置位置偏移大小
labelRenderer.domElement.style.top = '0px';
labelRenderer.domElement.style.left = '0px';
// //设置.pointerEvents=none，以免模型标签HTML元素遮挡鼠标选择场景模型
labelRenderer.domElement.style.pointerEvents = 'none';
document.body.appendChild(labelRenderer.domElement);

// onresize 事件会在窗口被调整大小时发生
window.onresize=function(){
  // 重置渲染器输出画布canvas尺寸
  renderer.setSize(window.innerWidth,window.innerHeight);
  // 全屏情况下：设置观察范围长宽比aspect为窗口宽高比
  camera.aspect = window.innerWidth/window.innerHeight;
  // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
  // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
  // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
  camera.updateProjectionMatrix ();
};

function render() {
  labelRenderer.render(scene, camera); //渲染HTML标签对象
  renderer.render(scene, camera); //执行渲染操作
  requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧
  // console.log(camera.position);//通过相机控件OrbitControls旋转相机，选择一个合适场景渲染角度
}
render();