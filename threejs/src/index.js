import * as THREE from 'three';
import html2canvas from 'html2canvas';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


// 创建场景、相机、渲染器
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 添加环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// 添加点光源
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// 创建一个立方体
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const controls = new OrbitControls(camera,renderer.domElement);


// 设置相机位置
camera.position.z = 5;

// 获取 div 元素
const div = document.getElementById('label');

// 将 div 渲染到 Canvas 并创建 Sprite
html2canvas(div).then((canvas) => {
    // 将 Canvas 转换为纹理
    const texture = new THREE.CanvasTexture(canvas);

    // 创建 SpriteMaterial
    const spriteMaterial = new THREE.SpriteMaterial({ map: texture });

    // 创建 Sprite
    const sprite = new THREE.Sprite(spriteMaterial);

    // 设置 Sprite 的大小（根据 Canvas 的尺寸）
    const scale = 0.01; // 调整缩放比例
    sprite.scale.set(canvas.width * scale, canvas.height * scale, 1);

    // 设置 Sprite 的位置（在盒子上方）
    sprite.position.set(0, 1.2, 0); // 盒子高度为 1，标签放在上方

    // 将 Sprite 添加到场景中
    scene.add(sprite);
});

// 渲染循环
function animate() {
    requestAnimationFrame(animate);


    // 渲染场景
    renderer.render(scene, camera);
}
animate();