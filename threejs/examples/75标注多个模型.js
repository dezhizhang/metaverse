import * as THREE from 'three';

const scene = new THREE.Scene();

// 立方体
const box = new THREE.BoxGeometry(30,30,30);
const material = new THREE.MeshLambertMaterial({
  color:0x0000ff
});
const boxMesh = new THREE.Mesh(box,material);
boxMesh.translateZ(-80);
scene.add(boxMesh);

// 球体
const sphere = new THREE.SphereGeometry(20,40,40);
const sphereMesh = new THREE.Mesh(sphere,material);
sphereMesh.translateX(-80);
scene.add(sphereMesh);

// 圆柱
const cylinder = new THREE.CylinderGeometry(15,15,30,40);
const cylinderMesh = new THREE.Mesh(cylinder,material);
cylinderMesh.translateX(80);
scene.add(cylinderMesh);

// 点光源
const point = new THREE.PointLight(0xffffff);
point.position.set(400,200,300);
scene.add(point);

// 环境光
const ambient = new THREE.AmbientLight(0xffffff,0.9);
scene.add(ambient);

// 设置相机
const width = window.innerWidth;
const height = window.innerHeight;
const k = width / height;
const s = 150;
const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
camera.position.set(200,300,200);
camera.lookAt(scene.position);


// 创建渲染对像
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width,height);
renderer.setClearColor(0x888888,1);
document.body.appendChild(renderer.domElement);

function render() {
  renderer.render(scene,camera);
  requestAnimationFrame(render);

}

render();

 // 创建立方体模型标签
 tag(boxMesh, '立方体');
 // 创建球体模型标签
 tag(sphereMesh, '球体');
 // 创建圆柱体模型标签
 tag(cylinderMesh, '圆柱体');


function tag(mesh,name) {
  const div = document.createElement('div');
  div.innerHTML = name;
  div.style.padding = '10px';
  div.style.color = '#fff';
  div.style.position = 'absolute';
  div.style.backgroundColor = 'rgba(25,25,25,0.5)';
  div.style.borderRadius = '5px';
  document.body.appendChild(div);

  //立方体世界坐标转屏幕坐标
  const worldVector = mesh.position.clone();
  const standardVector = worldVector.project(camera);

  const a = window.innerWidth / 2;
  const b = window.innerHeight / 2;
  const x = Math.round(standardVector.x * a + a);
  const y = Math.round(-standardVector.y * b + b);

  // 设置标签位置
  div.style.left = x + 'px';
  //这里的130px主要是为了标签和模型有一定偏移，当然也可以不设置，两者叠加在一起
  div.style.top = y - 130 + 'px';
}


