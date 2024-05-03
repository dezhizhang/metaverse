/*
 * :file description: 
 * :name: /threejs/examples/解决世界地图.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-01 21:09:29
 * :last editor: 张德志
 * :date last edited: 2024-04-01 21:09:30
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(300, 300, 200);
camera.lookAt(scene.position);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const meshGroup = new THREE.Group();

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const loader = new THREE.FileLoader();
loader.setResponseType('json');

loader.load('/world.json', function (data) {
  data.features.forEach(function (area) {

    if (area.geometry.type === 'Polygon') {
      const pointArr = [];
      area.geometry.coordinates[0].forEach((elem) => {
        pointArr.push(elem[0], elem[1], 0);
      });
      meshGroup.add(lineLoop(pointArr));
    }else if(area.geometry.type === 'MultiPolygon') {
      area.geometry.coordinates.forEach(polygon => {
        const pointArr = [];
        polygon[0].forEach((elem) => {
          pointArr.push(elem[0],elem[1],0)
        });
        meshGroup.add(lineLoop(pointArr));
      })
    }
  });
});

scene.add(meshGroup);


function lineLoop(pointArr) {
  const geometry = new THREE.BufferGeometry();
  const vertices = new Float32Array(pointArr);
  const attribute = new THREE.BufferAttribute(vertices,3);
  geometry.attributes.position = attribute;

  const material = new THREE.LineBasicMaterial({
    color:0x00ffff
  });
  const line = new THREE.LineLoop(geometry,material);
  return line;
}

const controls = new OrbitControls(camera, renderer.domElement);

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
});

function render() {
  renderer.render(scene, camera);
  // effectComposer.render();
  requestAnimationFrame(render);
}

render();
