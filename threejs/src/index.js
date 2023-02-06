/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2022-07-12 07:44:44
 * :last editor: 张德志
 * :date last edited: 2023-02-06 23:34:46
 */
import  * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import output_fragment from './output_fragment.glsl.js';


const scene = new THREE.Scene();

// 光源设置
const directionalLight = new THREE.DirectionalLight(0xffffff,0.8);
directionalLight.position.set(200, 400, 300);
scene.add(directionalLight);

// 平行光1
const directionalLight2 = new THREE.DirectionalLight(0xffffff,0.8);
directionalLight2.position.set(-200, -400, 300);
scene.add(directionalLight2);

// 环境光
const ambient = new THREE.AmbientLight(0xffffff,0.3);
scene.add(ambient);

//三维坐标轴
const axesHelper = new THREE.AxesHelper(3000);
const E = 121.49526536464691; 
const N =  31.24189350905988;
const xy = lon2xy(E, N);
const x = xy.x;
const y = xy.y;
axesHelper.position.set(x,y,0);
scene.add(axesHelper);

function lon2xy(longitude,latitude) {
  const E = longitude;
  const N = latitude;
  const x = E * 20037508.34 / 180;
  let y = Math.log(Math.tan((90 + N) * Math.PI / 360)) / (Math.PI / 180);
  y = y *  20037508.34 / 180;
  return {
    x,
    y
  }
}

const model = new THREE.Group();
const loader = new THREE.FileLoader();
loader.setResponseType('json');
loader.load('https://tugua.oss-cn-hangzhou.aliyuncs.com/model/shanghai.json',function(data) {
  const buildGroup = new THREE.Group();
  data.features.forEach(build => {
    if(build.geometry) {
      if(build.geometry.type === 'Polygon') {
        build.geometry.coordinates = [build.geometry.coordinates];
      }
      const height = build.properties.Floor * 3;
      buildGroup.add(ExtrudeMesh(build.geometry.coordinates,height));
    }
  });
  model.add(buildGroup);
  
});

//黄浦江
loader.load('https://tugua.oss-cn-hangzhou.aliyuncs.com/model/huangpu-river.json',function(data) {
  const buildGroup = new THREE.Group();
  data.features.forEach(build => {
    if(build.geometry) {
      if(build.geometry.type === 'Polygon') {
        build.geometry.coordinates = [build.geometry.coordinates];
      }
      buildGroup.add(ShapeMesh(build.geometry.coordinates));
    }
  });
  model.add(buildGroup);
});

function ShapeMesh(pointsArrs) {
  let shapeArr = [];
  pointsArrs.forEach(pointsArr => {
    let vector2Arr = [];
    pointsArr[0].forEach(elem => {
      let xy = lon2xy(elem[0],elem[1]);
      vector2Arr.push(new THREE.Vector2(xy.x,xy.y));
    });
    const shape = new THREE.Shape(vector2Arr);
    shapeArr.push(shape);
  });

  const geometry = new THREE.ShapeGeometry(shapeArr);
  const material = new THREE.MeshLambertMaterial({
    color:0x001c1a
  });
  const mesh = new THREE.Mesh(geometry,material);
  return mesh
}

const flyGroup = new THREE.Group();
const mixer = null;
const loader1 = new GLTFLoader();
loader1.load('https://tugua.oss-cn-hangzhou.aliyuncs.com/model/fly.glb',function(gltf) {
  const fly = gltf.scene();

  fly.scale.set(4,4,4);
  fly.position.x = -28 * 4;
  flyGroup.add(fly);
  fly.traverse(function(child) {
    if(child.isMesh) {
      const material = child.material;
      child.material = new THREE.MeshLambertMaterial({
        color:material.color
      })
    }
  });
  mixer = new THREE.AnimationMixer(fly);
  const AnimationAction = mixer.clipAction(gltf.animations[0]);
  AnimationAction.timeScale = 15;
  AnimationAction.play();
  model.add(flyGroup);
})


scene.add(model);



var clock = new THREE.Clock();
function UpdateLoop() {
    if (mixer !== null) {
        //clock.getDelta()方法获得两帧的时间间隔
        mixer.update(clock.getDelta());
    }
    requestAnimationFrame(UpdateLoop);
}
UpdateLoop();

// 一直无人机数据：经纬度和高度
var height = 300;//无人机飞行高度300米
// var E = 121.49526536464691; //无人机经纬度坐标
// var N = 31.24189350905988;
// var xy = lon2xy(E, N);
// var x = xy.x;
// var y = xy.y;
// 设置无人机坐标
flyGroup.position.set(x, y, height);

// 姿态调整
flyGroup.rotateX(Math.PI/2);


var material = new THREE.MeshLambertMaterial({
  color: 0x00ffff, //颜色
});
// GPU执行material对应的着色器代码前，通过.onBeforeCompile()插入新的代码，修改已有的代码
material.onBeforeCompile = function (shader) {
  // 浏览器控制台打印着色器代码
  // console.log('shader.fragmentShader', shader.fragmentShader)
  // 顶点位置坐标position类似uv坐标进行插值计算，用于在片元着色器中控制片元像素
  shader.vertexShader = shader.vertexShader.replace(
    'void main() {',
    ['varying vec3 vPosition;',
      'void main() {',
      'vPosition = position;',
    ].join('\n') // .join()把数组元素合成字符串
  );
  shader.fragmentShader = shader.fragmentShader.replace(
    'void main() {',
    ['varying vec3 vPosition;',
      'void main() {',
    ].join('\n')
  );
  shader.fragmentShader = shader.fragmentShader.replace('#include <output_fragment>', output_fragment);
};
// pointsArrs：多个轮廓，一个轮廓对应pointsArrs的一个元素
function ExtrudeMesh(pointsArrs, height) {
  var shapeArr = []; //轮廓形状Shape集合
  pointsArrs.forEach(pointsArr => {
    var vector2Arr = [];
    // 转化为Vector2构成的顶点数组
    pointsArr[0].forEach(elem => {
      var xy = lon2xy(elem[0], elem[1]); //经纬度转墨卡托坐标
      vector2Arr.push(new THREE.Vector2(xy.x, xy.y));
    });
    var shape = new THREE.Shape(vector2Arr);
    shapeArr.push(shape);
  });

  var geometry = new THREE.ExtrudeGeometry( //拉伸造型
    shapeArr, //多个多边形二维轮廓
    //拉伸参数
    {
      depth: height, //拉伸高度
      bevelEnabled: false, //无倒角
    }
  );
  var mesh = new THREE.Mesh(geometry, material); //网格模型对象
  return mesh;
}

// width和height用来设置Three.js输出Canvas画布尺寸，同时用来辅助设置相机渲染范围
var width = window.innerWidth; //窗口文档显示区的宽度
var height = window.innerHeight; //窗口文档显示区的高度
/**
 * 透视投影相机设置
 */
// 30:视场角度, width / height:Canvas画布宽高比, 1:近裁截面, 3000：远裁截面
// var camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
// 根据需要调整远裁截面 
var camera = new THREE.PerspectiveCamera(30, width / height,1, 30000);
// camera.position.set(292, 223, 185);//相机在Three.js三维坐标系中的位置
// camera.lookAt(0, 0, 0); //相机指向Three.js坐标系原点
// var E = 121.49131393432617;// 黄浦江几何中心坐标
// var N = 31.232206344604492;
// var E = 121.49526536464691;//东方明珠经纬度坐标
// var N = 31.24189350905988;
// var xy = lon2xy(E,N);
// var x = xy.x;
// var y = xy.y;
// camera.position.set(x+5000, y+5000, 5000);//5000是根据建筑物尺寸范围设置  数量级对应即可 具体数值不用精准
camera.position.set(13524797, 3662134, 1220);//利用OrbitControls重新设置相机参数 调整视角
camera.lookAt(x,y,0);//根据黄浦江几何中心坐标或附近某个经纬度坐标设置
/**
 * 创建渲染器对象
 */
var renderer = new THREE.WebGLRenderer({
  antialias: true, //开启锯齿
});
renderer.setPixelRatio(window.devicePixelRatio); //设置设备像素比率,防止Canvas画布输出模糊。
renderer.setSize(width, height); //设置渲染区域尺寸
renderer.setClearColor(0x001111, 1); //设置背景颜色
// renderer.domElement表示Three.js渲染结果,也就是一个HTML元素(Canvas画布)
document.body.appendChild(renderer.domElement); //body元素中插入canvas对象

//创建控件对象  控件可以监听鼠标的变化，改变相机对象的属性
// 旋转：拖动鼠标左键
// 缩放：滚动鼠标中键
// 平移：拖动鼠标右键
var controls = new OrbitControls(camera, renderer.domElement);

// 相机控件与.lookAt()无效( .target属性 )
controls.target.set(x,y,0);
controls.update(); //update()函数内会执行camera.lookAt(controls.targe)

// onresize 事件会在窗口被调整大小时发生
window.onresize = function () {
  // 重置渲染器输出画布canvas尺寸
  renderer.setSize(window.innerWidth, window.innerHeight);
  // 全屏情况下：设置观察范围长宽比aspect为窗口宽高比
  camera.aspect = window.innerWidth / window.innerHeight;
  // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
  // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
  // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
  camera.updateProjectionMatrix();
};

function render() {
  renderer.render(scene, camera); //执行渲染操作
  requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧
  // console.log(camera.position);//通过相机控件OrbitControls旋转相机，选择一个合适场景渲染角度
}
render();