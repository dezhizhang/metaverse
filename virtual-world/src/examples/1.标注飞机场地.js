/*
 * :file description: 
 * :name: /virtual-world/src/examples/1.标注飞机场地.js
 * :author:张德志
 * :copyright: (c) 2025, Xiaozhi
 * :date created: 2025-02-15 20:09:27
 * :last editor: 张德志
 * :date last edited: 2025-02-15 20:09:28
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { lon2xyz } from './utils';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(200, 200, 200);
camera.lookAt(scene.position);


const R = 100;
const fileLoader = new THREE.FileLoader();
fileLoader.setResponseType('json');
const textureLoader = new THREE.TextureLoader();

const texture = textureLoader.load('earth.png');
const textureLight = textureLoader.load('earth-light.png');


const spriteMaterial = new THREE.SpriteMaterial({
  map:textureLight,
  transparent:true,
});

const sprite = new THREE.Sprite(spriteMaterial);
sprite.scale.set(R * 3,R * 3,1);
scene.add(sprite);

fileLoader.load('/airports.json',function(data) {
  data.geometries.forEach((obj) => {
    const lon = obj.coordinates[0];
    const lat = obj.coordinates[1];

    const geometry = new THREE.PlaneGeometry(1,1);
    const texture = textureLoader.load('air.png');
    const material = new THREE.MeshBasicMaterial({
      color:0x22ffcc,
      map:texture,
      transparent:true,
      depthWrite:false
    });

    const mesh = new THREE.Mesh(geometry,material);
    const coord = lon2xyz(R * 1.001,lon,lat);
    const size = R * 0.05;
    mesh.scale.set(size,size,size);

    mesh.position.set(coord.x,coord.y,coord.z);

    const coordVec3 = new THREE.Vector3(coord.x,coord.y,coord.z).normalize();
    const normal = new THREE.Vector3(0,0,1);
    mesh.quaternion.setFromUnitVectors(normal,coordVec3);
    scene.add(mesh);
  })
})


const geometry = new THREE.SphereGeometry(100,40,40);
const material = new THREE.MeshBasicMaterial({
  map:texture
});

const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);


new OrbitControls(camera,renderer.domElement);


const axesHelper = new THREE.AxesHelper(1000);
scene.add(axesHelper);

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();