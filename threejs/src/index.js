// 引入Three.js
import * as THREE from 'three';

// 引入gltf模型加载库GLTFLoader.js
import {
  GLTFLoader
} from 'three/examples/jsm/loaders/GLTFLoader.js';


/**
 * 创建场景对象Scene
 */
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
scene.add(axesHelper);


var model = new THREE.Group(); //声明一个组对象，用来添加城市三场场景的模型对象

var loader = new GLTFLoader(); //创建一个GLTF加载器
loader.load("https://tugua.oss-cn-hangzhou.aliyuncs.com/model/shanghai.glb", function (gltf) { //gltf加载成功后返回一个对象
  console.log('控制台查看gltf对象结构', gltf);
  // 设置地面材质
  var Floor = gltf.scene.getObjectByName('地面');
  Floor.material = new THREE.MeshLambertMaterial({
    color: 0x444433,
  });
  // 设置河面材质
  var River = gltf.scene.getObjectByName('河面');
  River.material = new THREE.MeshLambertMaterial({
    color: 0x336633,
  });


  // 所有建筑物递归遍历批量设置材质
  gltf.scene.getObjectByName('楼房').traverse(function (object) {
    if (object.type === 'Mesh') {
      // console.log(object.material);//控制台查看mesh材质
      // MeshLambertMaterial：受光照影响   MeshBasicMaterial：不受光照影响  
      object.material = new THREE.MeshLambertMaterial({
        // color: object.material.color, //读取原来材质的颜色
        color: 0xffffff,
      })
    }
  })

  // 单独设置东方明珠材质
  var dongfang= gltf.scene.getObjectByName('东方明珠');
  dongfang.material = new THREE.MeshLambertMaterial({
    color: 0x996633,
  });




  //把gltf.scene中的所有模型添加到model组对象中
  model.add(gltf.scene);
  scene.add(model);
});

// width和height用来设置Three.js输出Canvas画布尺寸，同时用来辅助设置相机渲染范围
var width = window.innerWidth; //窗口文档显示区的宽度
var height = window.innerHeight; //窗口文档显示区的高度
/**
* 透视投影相机设置
*/
// 30:视场角度, width / height:Canvas画布宽高比, 1:近裁截面, 30000：远裁截面
var camera = new THREE.PerspectiveCamera(30, width / height, 1, 30000);
// camera.position.set(1000, 1000, 1000);//根据场景尺寸数量级预先设置一个相机大致位置
camera.position.set(-1496, 1559, 2715);//通过OrbitControls改变相机状态，浏览器控制台选择合适的相机具体位置
camera.lookAt(0, 0, 0);//相机指向Three.js坐标系原点

/**
 * 创建渲染器对象
 */
var renderer = new THREE.WebGLRenderer({
    antialias: true, //开启锯齿
});
renderer.setPixelRatio(window.devicePixelRatio);//设置设备像素比率,防止Canvas画布输出模糊。
renderer.setSize(width, height); //设置渲染区域尺寸
document.body.appendChild(renderer.domElement);



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


// 渲染循环
function render() {
  renderer.render(scene, camera); //执行渲染操作
  requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧
  // console.log(camera.position);//通过相机控件OrbitControls旋转相机，选择一个合适场景渲染角度
}
render();
