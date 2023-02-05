import  * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';


const scene = new THREE.Scene();
// 平行光1
const directionalLight = new THREE.DirectionalLight(0xffffff,0.8);
directionalLight.position.set(400, 200, 300);
scene.add(directionalLight);


// // 平行光2
// var directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
// directionalLight2.position.set(-400, -200, -300);
// scene.add(directionalLight2);
// //环境光
// var ambient = new THREE.AmbientLight(0xffffff, 0.3);
// scene.add(ambient);

// // Three.js三维坐标轴 三个坐标轴颜色RGB分别对应xyz轴
// var axesHelper = new THREE.AxesHelper(250);
// scene.add(axesHelper);

var model = new THREE.Group(); //声明一个组对象
/**
 * 创建线条模型
 */
var geometry = new THREE.BufferGeometry(); //创建一个缓冲类型几何体
// 三维样条曲线
var curve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(100, 0, -100),
  new THREE.Vector3(0, 80, 0),
  new THREE.Vector3(-100, 0, 100),
]);
//曲线上等间距返回多个顶点坐标
var points = curve.getSpacedPoints(100); //分段数100，返回101个顶点
// setFromPoints方法从points中提取数据赋值给attributes.position
geometry.setFromPoints(points);
var material = new THREE.LineBasicMaterial({
  color: 0x006666, //轨迹颜色
});
//线条模型对象
var line = new THREE.Line(geometry, material);
model.add(line);
scene.add(model);



var index = 20; //取点索引位置
var num = 15; //从曲线上获取点数量
var points2 = points.slice(index, index + num); //从曲线上获取一段
var curve = new THREE.CatmullRomCurve3(points2);
var newPoints2 = curve.getSpacedPoints(100); //获取更多的点数
var geometry2 = new THREE.BufferGeometry();
geometry2.setFromPoints(newPoints2);
// 每个顶点对应一个百分比数据attributes.percent 用于控制点的渲染大小
var percentArr = []; //attributes.percent的数据
for (var i = 0; i < newPoints2.length; i++) {
  percentArr.push(i / newPoints2.length);
}
var percentAttribue = new THREE.BufferAttribute(new Float32Array(percentArr), 1);
geometry2.attributes.percent = percentAttribue;
// 批量计算所有顶点颜色数据
var colorArr = [];
for (var i = 0; i < newPoints2.length; i++) {
  var color1 = new THREE.Color(0x006666); //轨迹线颜色 青色
  var color2 = new THREE.Color(0xffff00); //黄色
  var color = color1.lerp(color2, i / newPoints2.length)
  colorArr.push(color.r, color.g, color.b);
}
// 设置几何体顶点颜色数据
geometry2.attributes.color = new THREE.BufferAttribute(new Float32Array(colorArr), 3);

// 点模型渲染几何体每个顶点
var PointsMaterial = new THREE.PointsMaterial({
  // color: 0xffff00,
  size: 5.0, //点大小
  vertexColors: THREE.VertexColors, //使用顶点颜色渲染
});
var flyPoints = new THREE.Points(geometry2, PointsMaterial);
model.add(flyPoints);
// 修改点材质的着色器源码(注意：不同版本细节可能会稍微会有区别，不过整体思路是一样的)
PointsMaterial.onBeforeCompile = function (shader) {
  // 顶点着色器中声明一个attribute变量:百分比
  shader.vertexShader = shader.vertexShader.replace(
    'void main() {',
    [
      'attribute float percent;', //顶点大小百分比变量，控制点渲染大小
      'void main() {',
    ].join('\n') // .join()把数组元素合成字符串
  );
  // 调整点渲染大小计算方式
  shader.vertexShader = shader.vertexShader.replace(
    'gl_PointSize = size;',
    [
      'gl_PointSize = percent * size;',
    ].join('\n') // .join()把数组元素合成字符串
  );
};
// 飞线动画
var indexMax = points.length - num; //飞线取点索引范围
function animation() {
  if (index > indexMax) index = 0;
  index += 1
  points2 = points.slice(index, index + num); //从曲线上获取一段
  var curve = new THREE.CatmullRomCurve3(points2);
  var newPoints2 = curve.getSpacedPoints(100); //获取更多的点数
  geometry2.setFromPoints(newPoints2);

  requestAnimationFrame(animation);
}
animation();

plane();//设置一个地面
function plane() {
    var gridHelper = new THREE.GridHelper(300, 15, 0x003333, 0x003333);
    model.add(gridHelper);
    var geometry = new THREE.PlaneGeometry(310, 310); 
    var material = new THREE.MeshLambertMaterial({
        // map: texture,
        color: 0xffffff,
        transparent: true,
        opacity: 0.1,
        side: THREE.DoubleSide,
    });
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = 1
    model.add(mesh);
    mesh.rotateX(-Math.PI / 2);
}

// width和height用来设置Three.js输出Canvas画布尺寸，同时用来辅助设置相机渲染范围
var width = window.innerWidth; //窗口文档显示区的宽度
var height = window.innerHeight; //窗口文档显示区的高度
/**
* 透视投影相机设置
*/
// 30:视场角度, width / height:Canvas画布宽高比, 1:近裁截面, 3000：远裁截面
var camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
camera.position.set(292, 223, 185);//相机在Three.js三维坐标系中的位置
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
  renderer.render(scene, camera); //执行渲染操作
  requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧
  // console.log(camera.position);//通过相机控件OrbitControls旋转相机，选择一个合适场景渲染角度
}
render();