// 现在浏览器支持ES6语法，自然包括import方式引入js文件
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { line } from './line.js';
import { ExtrudeMesh } from './ExtrudeMesh.js';




const scene = new THREE.Scene();
const loader = new THREE.FileLoader();
loader.setResponseType('json');

// 组对象mapGroup是所有国家边界Line模型的父对象
const mapGroup = new THREE.Group();
scene.add(mapGroup);

//边界线组
const lineGroup = new THREE.Group();
mapGroup.add(lineGroup);

//轮廓Mesh组
const meshGroup = new THREE.Group();
mapGroup.add(meshGroup);

//拉伸高度
const mapHeight = 0.8;
lineGroup.position.z = mapHeight + mapHeight * 0.1;

loader.load(' /china.json',function(data) {
  data.features.forEach(function(area) {
    //"Polygon"：省份area有一个封闭轮廓
    if(area.geometry.type === 'Polygon') {
      area.geometry.coordinates = [area.geometry.coordinates];
    }
    //解析所有封闭轮廓边界坐标area.geometry.coordinates
    lineGroup.add(line(area.geometry.coordinates));
    meshGroup.add(ExtrudeMesh(area.geometry.coordinates,mapHeight));

  })
});

// 光源设置
const directionalLight = new THREE.DirectionalLight(0xffffff,0.6);
directionalLight.position.set(400,200,300);
scene.add(directionalLight);


const directionalLight2 = new THREE.DirectionalLight(0xffffff,0.6);
directionalLight2.position.set(-400, -200, -300);
scene.add(directionalLight2);

// 环境光
const ambient = new THREE.AmbientLight(0xffffff,0.6);
scene.add(ambient);

//辅助坐标系
const axesHelper = new THREE.AxesHelper(300);
scene.add(axesHelper);

// 相机设置
const width = window.innerWidth;
const height = window.innerHeight;
const k = width / height;
const s = 15; //根据包围盒大小(行政区域经纬度分布范围大小)设置渲染范围
const camera = new THREE.OrthographicCamera(-s * k,s * k,s,-s,1,1000);
camera.position.set(104, -105, 200);
camera.lookAt(104, 35, 0);

// 创建渲染对像
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

// 创建控制对像
const controls = new OrbitControls(camera,renderer.domElement);
controls.target.set(104, 35, 0);
controls.update();

//射线投射器`Raycaster`的射线拾取选中网格模型对象函数choose()
//选中的网格模型变为半透明效果
let chooseMesh = null;
function choose(event) {
  if(chooseMesh) {
    chooseMesh.material.color.set(0x004444);
  }
  const Sx = event.clientX;
  const Sy = event.clientY;

  const x = (Sx / window.innerWidth) * 2 - 1;
  const y = (Sy / window.innerHeight) * 2 + 1;

  //创建一个射线投射器`Raycaster`
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(new THREE.Vector2(x,y),camera);

  // 未选中对象返回空数组[],选中一个数组1个元素，选中两个数组两个元素
  let intersects = raycaster.intersectObjects(meshGroup.children);
  if(intersects.length > 0) {
    intersects[0].object.material.color.set(0x009999);
    chooseMesh = intersects[0].object;
  }

}

addEventListener('click', choose); // 监听窗口鼠标单击事件