/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2022-07-12 07:44:44
 * :last editor: 张德志
 * :date last edited: 2023-01-06 23:15:07
 */
import * as THREE from 'three';

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(100,100);
const material = new THREE.MeshLambertMaterial({
  color: 0x0000ff
});
const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);

const point = new THREE.PointLight(0xffffff);
point.position.set(400,200,300);
scene.add(point);

const ambient = new THREE.AmbientLight(0x444444);
scene.add(ambient);

const width = window.innerWidth;
const height = window.innerHeight;
const k = width / height;
const s = 200;

const camera = new THREE.OrthographicCamera(-s * k, s * k,s,-s,1,1000);
camera.position.set(200,300,200);
camera.lookAt(0,0,0);

const renderer = new THREE.WebGL1Renderer();
renderer.setSize(width,height);
renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色

document.body.appendChild(renderer.domElement);

function render() {
  requestAnimationFrame(render);
  renderer.render(scene,camera);
}

render();


