 // 现在浏览器支持ES6语法，自然包括import方式引入js文件
 import * as THREE from 'three';
 // 引入Three.js扩展库
 import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
 import { CSS3DRenderer,CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';

 // 创建场影
 const scene = new THREE.Scene();

 //需要添加标签的立方体
 const box = new THREE.BoxGeometry(30,30,30);
 const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff
 });
 const boxMesh = new THREE.Mesh(box,material);
 boxMesh.position.set(80,0,0);
 scene.add(boxMesh);

 // 平行光
 const directionalLight = new THREE.DirectionalLight(0xffffff,0.6);
 directionalLight.position.set(400,200,300);
 scene.add(directionalLight);

 // 平行光2
 const directionalLight2 = new THREE.DirectionalLight(0xffffff,0.6);
 directionalLight2.position.set(-400,-200,-300);
 scene.add(directionalLight2);

 // 环境光
 const ambient = new THREE.AmbientLight(0xffffff,0.4);
 scene.add(ambient);

 const gridHelper = new THREE.GridHelper(300,25, 0x004444, 0x004444);
 gridHelper.position.y = -0.5;
 scene.add(gridHelper);

 const axesHelper = new THREE.AxesHelper(300);
 scene.add(axesHelper);

const width = window.innerWidth;
const height = window.innerHeight;
const k = width / height;
const s = 150;
const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
camera.position.set(200,300,200);
camera.lookAt(scene.position);

//创建渲染器对象
const renderer = new THREE.WebGLRenderer({
  antialias:true
});
renderer.setSize(width,height);
document.body.appendChild(renderer.domElement);

const div = document.createElement('div');
div.innerHTML = '立方体';
div.style.padding = '5px 10px';
div.style.color = '#fff';
div.style.fontSize = '16px';
div.style.position = 'absolute';
div.style.backgroundColor = 'rgba(25,25,25,0.5)';
div.style.borderRadius = '5px';

const tag = document.getElementById('tag');

//div元素包装为CSS3模型对象CSS3DObject，并插入场景中
const label = new CSS3DObject(div);
div.style.pointerEvents = 'none';
label.position.copy(boxMesh.position);
label.scale.set(0.5,0.5,0.5);
label.position.y += 20;
scene.add(label);

const labelRenderer = new CSS3DRenderer();
labelRenderer.setSize(window.innerWidth,window.innerHeight);
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = '0px';
labelRenderer.domElement.style.left = '0px';
labelRenderer.domElement.style.pointerEvents = 'none';
document.body.appendChild(labelRenderer.domElement);

function render() {
  labelRenderer.render(scene,camera);
  renderer.render(scene,camera);
  requestAnimationFrame(render)
}

render();

const controls = new OrbitControls(camera,renderer.domElement);
