/*
 * :file description: 
 * :name: /threejs/examples/S曲线/1曲线上文字.js
 * :author:张德志
 * :copyright: (c) 2024, Xiaozhi
 * :date created: 2024-12-30 04:58:43
 * :last editor: 张德志
 * :date last edited: 2024-12-30 04:58:44
 */
/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author:张德志
 * :copyright: (c) 2024, Xiaozhi
 * :date created: 2024-07-27 12:32:40
 * :last editor: 张德志
 * :date last edited: 2024-12-29 23:09:15
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'


// 初始化场景
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 创建点
const points = [
  new THREE.Vector3(-3, 1, 0),
  new THREE.Vector3(-2, 2, 0),
  new THREE.Vector3(-1, 1, 0),
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(1, 1, 0),
  new THREE.Vector3(2, 2, 0),
  new THREE.Vector3(3, 1, 0)
];

// 创建 CatmullRom 曲线（通过这些点）
const curve = new THREE.CatmullRomCurve3(points);

// 创建字体加载器
const fontLoader = new FontLoader();
fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
  const textMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });

  // 需要在路径上均匀分布的字符串
  const textString = "Hello";
  const numTexts = textString.length; // 字符串长度

  for (let i = 0; i < numTexts; i++) {
    const char = textString[i];

    // 为每个字符创建 TextGeometry
    const text = new TextGeometry(char, {
      font: font,
      size: 0.2,
      height: 0.1
    });

    const textMesh = new THREE.Mesh(text, textMaterial);

    // 计算每个字符的位置和切线
    const t = i / (numTexts - 1); // 计算每个字符在曲线上的位置，范围从 0 到 1
    const point = curve.getPointAt(t); // 获取路径上的一个点
    const tangent = curve.getTangentAt(t); // 获取路径切线

    // 设置文本位置
    textMesh.position.set(point.x, point.y, 0.5); // 在 Z 轴上偏移，避免与曲面重叠

    // 计算法向量
    const normal = new THREE.Vector3(-tangent.y, tangent.x, 0); // 法线向量
    textMesh.lookAt(textMesh.position.clone().add(normal)); // 使文本朝向切线法线

    scene.add(textMesh);
  }


  const consists = new OrbitControls(camera,renderer.domElement)
  // 渲染循环
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();
});