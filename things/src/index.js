/*
 * :file description:
 * :name: /things/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-24 20:16:05
 * :last editor: 张德志
 * :date last edited: 2024-04-08 22:23:24
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';
import { baseUrl } from '../config';

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x005577, -100, 1000);

const width = window.innerWidth;
const height = window.innerHeight;

// camera
const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
camera.position.set(301, 167, -38);
camera.lookAt(scene.position);

// render
const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setSize(width, height);
renderer.setClearColor(0x005577, 1);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// controls
const controls = new OrbitControls(camera, renderer.domElement);

// helper
const axesHelper = new THREE.AxesHelper(200);
scene.add(axesHelper);

// light
const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);

const directionalLight1 = new THREE.DirectionalLight(0xfffff, 1.0);
directionalLight1.position.set(200, 300, 200);

const directionalLight2 = new THREE.DirectionalLight(0xfffff, 1.0);
directionalLight2.position.set(-300, -300, -200);

scene.add(ambientLight, directionalLight1, directionalLight2);

// CSS2DRenderer
function createTag(name) {
  const div = document.createElement('div');
  div.innerHTML = name;
  div.style.padding = '4px 10px';
  div.style.color = '#fff';
  div.style.background = 'rgba(25,25,25,0.4)';
  div.style.position = 'absolute';
  div.classList.add('tag');

  const label = new CSS2DObject(div);
  div.style.pointerEvents = 'none';

  return label;
}

const css2dRenderer = new CSS2DRenderer();
css2dRenderer.domElement.style.position = 'absolute';
css2dRenderer.domElement.style.left = '0px';
css2dRenderer.domElement.style.top = '0px';
css2dRenderer.domElement.style.pointerEvents = 'none';
document.body.appendChild(css2dRenderer.domElement);

// screen change
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
});

//loader
const dracoLoader = new DRACOLoader();
const gltfLoader = new GLTFLoader();
dracoLoader.setDecoderPath('/draco/');
gltfLoader.setDRACOLoader(dracoLoader);

const labelGroup = new THREE.Group();

gltfLoader.load(`${baseUrl}/model/factory.glb`, (gltf) => {
  console.log(gltf.scene);

  gltf.scene.traverse(function (object) {
    if (object.type === 'Mesh') {
      object.material = new THREE.MeshLambertMaterial({
        map: object.material.map,
        color: object.material.color,
        // side:THREE.DoubleSide,
        depthTest: true,
      });
    }
  });

  const group = gltf.scene.getObjectByName('粮仓');
  group.traverse(function (obj) {
    if (obj.type === 'Mesh') {
      const label = createTag(obj.name);
      const position = new THREE.Vector3();
      obj.getWorldPosition(position);

      if (obj.parent.name === '立简仓') {
        position.y += 36;
      } else if (obj.parent.name === '浅圆仓') {
        position.y += 20;
      } else if (obj.parent.name === '平房仓') {
        position.y += 17;
      }
  
      label.position.copy(position);
      labelGroup.add(label);
    }
  });

  scene.add(labelGroup);
  scene.add(gltf.scene);
});

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
  css2dRenderer.render(scene, camera);
}

render();
