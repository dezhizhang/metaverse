// 现在浏览器支持ES6语法，自然包括import方式引入js文件
import * as THREE from 'three';
// 引入Three.js扩展库
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


const scene = new THREE.Scene();

// 创建立方体
const box = new THREE.BoxGeometry(30,30,30);
const boxMaterial = new THREE.MeshPhongMaterial({
  color: 0xffff00,
});
const boxMesh = new THREE.Mesh(box,boxMaterial);
boxMesh.translateZ(-80);
scene.add(boxMesh);

// 创建球体
const sphere = new THREE.SphereGeometry(20,40,40);
const sphereMaterial = new THREE.MeshPhongMaterial({
  color: 0xff00ff,
});
const sphereMesh= new THREE.Mesh(sphere,sphereMaterial);
sphereMesh.translateX(-80);
scene.add(sphereMesh);

// 创建柱体
const cylinder = new THREE.CylinderGeometry(15,15,100,40);
const cylinderMaterial = new THREE.MeshPhongMaterial({
  color: 0x00ffff,
  side: THREE.BackSide
});
// 财质对像
const cylinderMesh = new THREE.Mesh(cylinder,cylinderMaterial);
cylinderMesh.translateX(80);
scene.add(cylinderMesh);

//选中的网格模型变为半透明效果
function choose(event) {
  const Sx = event.clientX;
  const Sy = event.clientY;

  const x = (Sx / window.innerWidth) * 2 - 1;
  const y = -(Sy / window.innerHeight) * 2 - 1;
   //创建一个射线投射器`Raycaster`
  const raycaster = new THREE.Raycaster();
  // 未选中对象返回空数组[],选中一个数组1个元素，选中两个数组两个元素
  const intersects = raycaster.intersectObjects([boxMesh,sphereMesh,cylinderMesh]);

  console.log('intersects',intersects);
  
  if(intersects.length > 0) {
    intersects[0].object.material.transparent = true;
    intersects[0].object.material.opacity = 0.6;
  }

}


addEventListener('click', choose); // 监听窗口鼠标单击事件


const width = window.innerWidth;
const height = window.innerHeight;
const k = width / height;
const s = 150;

// 创建相机对像
const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
camera.position.set(200,300,200);
camera.lookAt(scene.position);

//创建渲染器对象
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width,height);
document.body.appendChild(renderer.domElement);

function render() {
  renderer.render(scene,camera);
  requestAnimationFrame(render);

}

render();

//创建控件对象  相机对象camera作为参数   控件可以监听鼠标的变化，改变相机对象的属性
const controls = new OrbitControls(camera,renderer.domElement);


// 光源设置
const directionalLight = new THREE.DirectionalLight(0xffffff,0.6);
directionalLight.position.set(400,200,300);
scene.add(directionalLight);

//平行光2
const directionalLight2 = new THREE.DirectionalLight(0xffffff,0.6);
directionalLight2.position.set(-400, -200, -300);
scene.add(directionalLight2);


// 环境光
const ambient = new THREE.AmbientLight(0xffffff,0.6);
scene.add(ambient);

