/*
 * :file description:
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-12 07:02:27
 * :last editor: 张德志
 * :date last edited: 2024-04-13 16:36:59
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { CSS2DObject, CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';

let rotate = {
  bool: true,
};

let phoneMesh = null;
let sprite = null;

//创建场影
const scene = new THREE.Scene();
//创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
// 设置相机位置
camera.position.set(-28, -30, -205);

camera.lookAt(scene.position);

const textureLoader = new THREE.TextureLoader();

const dracoLoader = new DRACOLoader();
const gltfLoader = new GLTFLoader();
dracoLoader.setDecoderPath('/draco/');
gltfLoader.setDRACOLoader(dracoLoader);

const model = new THREE.Group();

  // 渲染标签
  const div = document.getElementById('camera');
  // div.style.visibility = 'visible';

gltfLoader.load('/phone.glb', (gltf) => {


  const mesh = gltf.scene.getObjectByName('手机');
  phoneMesh = mesh;

  mesh.material = new THREE.MeshStandardMaterial({
    metalness: 1.0,
    roughness: 1.0,
    map: textureLoader.load('/model/basecolor.png'),
    roughnessMap: textureLoader.load('/model/roughness.png'),
    metalnessMap: textureLoader.load('/model/metallic.png'),
    normalMap: textureLoader.load('/model/normal.png'),
    alphaMap: textureLoader.load('/model/opacity.png'),

    transparent: true,
  });
  mesh.renderOrder = 0;

  const mesh2 = gltf.scene.getObjectByName('后置摄像头位置');

  const spriteMaterial = new THREE.SpriteMaterial({
    map:textureLoader.load('/光点.png'),
    transparent:true
  });
  sprite = new THREE.Sprite(spriteMaterial);
  sprite.scale.set(6,6,1);

  const position = new THREE.Vector3();
  mesh2.getWorldPosition(position);
  sprite.position.copy(position);
  sprite.position.x -= 6;
  sprite.position.z -= 3;
  sprite.renderOrder = 1;
  scene.add(sprite);

  let s = 0.0;
  function waveAnimation() {
    s += 0.01;
    if(s < 0.5) {
      sprite.scale.x = 6 * (1 + s);
      sprite.scale.y = 6 * (1 + s);
    }else if(s >=0.5 && s < 1.0) {
      sprite.scale.x = 6 * (2 -s);
      sprite.scale.y = 6 * (2 -s);
    }else {
      s = 0.0;
    }
    requestAnimationFrame(waveAnimation);
  }

  waveAnimation();


  const label = new CSS2DObject(div);
  label.position.copy(sprite.position);
  scene.add(label);


  scene.add(gltf.scene);
});

const R = 60;
const geometry = new THREE.BufferGeometry();
const arc = new THREE.ArcCurve(0, 0, R, Math.PI / 2 + Math.PI / 6, Math.PI / 2 - Math.PI / 6);
const points = arc.getPoints(50);
geometry.setFromPoints(points);

const material = new THREE.LineBasicMaterial({
  color: 0xffffff,
});
const line = new THREE.Line(geometry, material);
line.rotateX(-Math.PI / 2);
line.position.y = -85;
scene.add(line);

const loader = new FontLoader();
loader.load('https://threejs.org/examples/fonts/helvetiker_bold.typeface.json', (font) => {
  const material = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
  });
  const shapes = font.generateShapes('abbc', 10);
  const geometry = new THREE.ShapeGeometry(shapes);
  const text = new THREE.Mesh(geometry, material);

  text.position.z = -R;
  text.position.x = -12;
  text.position.y = -85;

  scene.add(text);
});

const directionLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionLight.position.set(0, 50, 100);
scene.add(directionLight);

const directionLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
directionLight2.position.set(0, 50, -100);
scene.add(directionLight2);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

// 初始化渲染器
const renderer = new THREE.WebGLRenderer();

// 设置渲染器大小
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.append(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);
// controls.minDistance = 200;
// controls.maxDistance = 2000;



const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth,window.innerHeight);
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = '0px';
labelRenderer.domElement.style.left = '255px';
labelRenderer.domElement.style.pointerEvents = 'none';

document.body.appendChild(labelRenderer.domElement);

window.addEventListener('click',(event) => {
  const sx = event.clientX;
  const sy = event.clientY;

  const x = (sx / window.innerWidth) * 2 - 1;
  const y = -(sy / window.innerHeight) * 2 + 1;

  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(new THREE.Vector2(x,y),camera);
  const intersects = raycaster.intersectObjects([sprite]);
  if(intersects.length > 0) {
    div.style.visibility = 'visible';
    //window.location.href = 'https://www.xiaozhi.shop'
  }
});





window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
});

const mapTexture1 = textureLoader.load('/model/极光蓝.png');
const mapTexture2 = textureLoader.load('/model/幻夜黑.png');
const mapTexture3 = textureLoader.load('/model/珊瑚红.png');
const mapTexture4 = textureLoader.load('/model/极光蓝.png');
mapTexture1.flipY = false;
mapTexture2.flipY = false;
mapTexture3.flipY = false;
mapTexture4.flipY = false;

const map1 = document.getElementById('map1');
const map2 = document.getElementById('map2');
const map3 = document.getElementById('map3');
const map4 = document.getElementById('map4');

map1.addEventListener('click', () => {
  phoneMesh.material.map = mapTexture1;
});

map2.addEventListener('click', () => {
  phoneMesh.material.map = mapTexture2;
});

map3.addEventListener('click', () => {
  phoneMesh.material.map = mapTexture3;
});

map4.addEventListener('click', () => {
  phoneMesh.material.map = mapTexture4;
});

const clock = new THREE.Clock();

function render() {

  const t = clock.getDelta();
  

  if (rotate.bool) {
    model.rotateY(0.01);
  }
  requestAnimationFrame(render);
  renderer.render(scene, camera);
  labelRenderer.render(scene,camera);
}

render();
