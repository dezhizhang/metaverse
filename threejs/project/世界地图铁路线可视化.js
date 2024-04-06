/*
 * :file description: 
 * :name: /threejs/project/世界地图铁路线可视化.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-06 17:01:42
 * :last editor: 张德志
 * :date last edited: 2024-04-06 19:01:14
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { lon2xyz } from './math';

const scene = new THREE.Scene();

const width = window.innerWidth;
const height = window.innerHeight;

const k = width / height;
const s = 200;
const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
camera.position.set(200, 300, 200);
camera.lookAt(scene.position);

// 灯光
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
directionalLight1.position.set(400, 200, 300);
scene.add(directionalLight1);

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
directionalLight2.position.set(-400, -200, -300);
scene.add(directionalLight2);

const loader = new THREE.FileLoader();
loader.setResponseType('json');

const mapGroup = new THREE.Group();
const lineGroup = new THREE.Group();
const meshGroup = new THREE.Group();
const pointGroup = new THREE.Group();

const R = 120;


loader.load('/world.json',(data) => {
  data.features.forEach(function(country) {
    if(country.geometry.type === 'Polygon') {
      country.geometry.coordinates = [country.geometry.coordinates];
    }
    country.geometry.coordinates.forEach((polygon) => {
      const pointArr = [];
      polygon[0].forEach((elem) => {
        const coord = lon2xyz(R,elem[0],elem[1]);
        pointArr.push(coord.x,coord.y,coord.z);
      });
      lineGroup.add(lineLoop(pointArr));
    })
  });
  mapGroup.add(lineGroup);
})

meshGroup.add(sphereMesh(R));
mapGroup.add(spriteMesh(R));
mapGroup.add(meshGroup);


scene.add(mapGroup);

function lineLoop(pointArr,color) {
  const geometry = new THREE.BufferGeometry();
  const vertices = new Float32Array(pointArr);
  const attribue = new THREE.BufferAttribute(vertices,3);
  geometry.attributes.position = attribue;
  const material = new THREE.LineBasicMaterial({
    color:color || 0x00cccc
  });
  return new THREE.LineLoop(geometry,material);
}


function line(pointArr) {
  const geometry = new THREE.BufferGeometry();
  const vertices = new Float32Array(pointArr);
  const attribue = new THREE.BufferAttribute(vertices,3);
  geometry.attributes.position = attribue;
  const material = new THREE.LineBasicMaterial({
    color:0x00ff00
  });
  return new THREE.Line(geometry,material)
}


function sphereMesh(R) {
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load('/earth.png');
  const geometry = new THREE.SphereGeometry(R,40,40);
  const material = new THREE.MeshLambertMaterial({
    map:texture
  });
  return new THREE.Mesh(geometry,material);
}


function spriteMesh(R) {
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load('/地球光圈.png');
  const material = new THREE.SpriteMaterial({
    map:texture,
    transparent:true,
    opacity:0.7,
  });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(R * 3.0,R * 3.0,1.0);
  return sprite;
}



loader.load('https://tugua.oss-cn-hangzhou.aliyuncs.com/model/%E9%93%81%E8%B7%AF%E7%BA%BF.json',function(data) {
  data.features.forEach((obj) => {
    if(obj.geometry.type === 'LineString') {
      obj.geometry.coordinates = [obj.geometry.coordinates];
    }
    obj.geometry.coordinates.forEach((arr) => {
      const pointArr = [];
      arr.forEach((elem) => {
        const coord = lon2xyz(R,elem[0],elem[1]);
        pointArr.push(coord.x,coord.y,coord.z);
      });
      lineGroup.add(line(pointArr,0x00ff00));
    })
  });
});




const axesHelper = new THREE.AxesHelper(200);
scene.add(axesHelper);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  preserveDrawingBuffer: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, renderer.domElement);

document.body.appendChild(renderer.domElement);

function render() {
  mapGroup.rotateY(0.001);
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
