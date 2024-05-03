/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-24 09:41:51
 * :last editor: 张德志
 * :date last edited: 2024-05-03 17:01:53
 */

import dat from 'dat.gui';
import h337 from 'heatmap.js'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// //创建场影
const scene = new THREE.Scene();

//创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// 设置相机位置
camera.position.set(0, 0, 300);
scene.add(camera);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

let heatMapGeo = new THREE.PlaneGeometry(800, 800, 300, 300);

const vertexshader = `
varying vec2 vUv;
    uniform float Zscale;
    uniform sampler2D greyMap;
    void main() {
     vUv = uv;
    vec4 frgColor = texture2D(greyMap, uv);
    float height = Zscale * frgColor.a;
    vec3 transformed = vec3( position.x, position.y, height);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);

    }
`;

const fragmentshader = `
#ifdef GL_ES
precision highp float;
#endif
varying vec2 vUv;
uniform sampler2D heatMap;
uniform vec3 u_color;//基础颜色
uniform float u_opacity; // 透明度
void main() {
  //vec4 alphaColor = texture2D(heatMap, vUv);
  // gl_FragColor = alphaColor;
   gl_FragColor = vec4(u_color, u_opacity) * texture2D(heatMap, vUv);
}
`;

var heatmap = h337.create({
  container: document.getElementById('heatmap'),
});
let len = 100;
let width = 500;
let height = 500;
let points = [];
let max = 0;
while (len--) {
  var val = Math.floor(Math.random() * 100);
  max = Math.max(max, val);
  var point = {
    x: Math.floor(Math.random() * width),
    y: Math.floor(Math.random() * height),
    value: val,
  };
  points.push(point);
}
heatmap.setData({
  max: max,
  data: points,
});
// 灰度图
var greymap = h337.create({
  container: document.getElementById('greymap'),
  gradient: {
    0: 'black',
    '1.0': 'white',
  },
});

let heatMapMaterial = new THREE.ShaderMaterial({
  transparent: true,
  vertexShader: vertexshader,
  fragmentShader: fragmentshader,
  uniforms: {
    heatMap: {
      value: { value: undefined },
    },
    greyMap: {
      value: { value: undefined },
    },
    Zscale: { value: 100.0 },
    u_color: { value: new THREE.Color('rgb(255, 255, 255)') },
    u_opacity: {
      value: 1.0,
    },
  },
});
let texture = new THREE.Texture(heatmap._config.container.children[0]);
texture.needsUpdate = true;
let texture2 = new THREE.Texture(greymap._config.container.children[0]);
texture2.needsUpdate = true;
heatMapMaterial.uniforms.heatMap.value = texture;
heatMapMaterial.side = THREE.DoubleSide; // 双面渲染
heatMapMaterial.uniforms.greyMap.value = texture2;
// heatMapGeo.geometry.verticesNeedUpdate = true
// let position = heatMapGeo.attributes.position;
// position.dynamic = true;//设置planeGeometry为动态的，这样才允许改变其中的顶点
// position.needsUpdate = true;//更新位置
let heatMapPlane = new THREE.Mesh(heatMapGeo, heatMapMaterial);
scene.add(heatMapPlane);

scene.add(new THREE.AxesHelper(100));

// 初始化渲染器
const renderer = new THREE.WebGLRenderer();

const controls = new OrbitControls(camera, renderer.domElement);

// 设置渲染器大小
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.append(renderer.domElement);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
});

const clock = new THREE.Clock();

function render() {
  const delta = clock.getDelta();
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();


