/*
 * :file description: 
 * :name: /threejs/project/世界地图线模型解析.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-06 11:45:06
 * :last editor: 张德志
 * :date last edited: 2024-04-06 11:45:07
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

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

loader.load(' /world.json',(data) => {
  data.features.forEach(function(country) {
    if(country.geometry.type === 'Polygon') {
      const pointArr = [];
      country.geometry.coordinates[0].forEach((elem) => {
        pointArr.push(elem[0],elem[1],0);
      });
      mapGroup.add(line(pointArr));
    }else if(country.geometry.type === 'MultiPolygon') {
      country.geometry.coordinates.forEach((polygon) => {
        const pointArr = [];
        polygon[0].forEach((elem) => {
          pointArr.push(elem[0],elem[1],0);
        });
        mapGroup.add(line(pointArr));
      })
    }
  })
 
});

scene.add(mapGroup);

function line(pointArr) {
  const geometry = new THREE.BufferGeometry();
  const vertices = new Float32Array(pointArr);
  const attribue = new THREE.BufferAttribute(vertices, 3);
  geometry.attributes.position = attribue;
  const material = new THREE.LineBasicMaterial({
    color: 0x00cccc
  });
  return new THREE.LineLoop(geometry, material);

}


const axesHelper = new THREE.AxesHelper(200);
scene.add(axesHelper);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, renderer.domElement);

document.body.appendChild(renderer.domElement);

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
