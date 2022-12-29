/*
 * :file description:
 * :name: /threejs/examples/28透明几何体.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-12 07:44:44
 * :last editor: 张德志
 * :date last edited: 2022-12-28 21:03:47
 */
import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils';

let group, camera, scene, renderer;

init();
animate();

function init() {
  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth,window.innerHeight);

  document.body.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(40,window.innerWidth / window.innerHeight,1,1000);
  camera.position.set(15,20,30);
  scene.add(camera);

  const controls = new OrbitControls(camera,renderer.domElement);
  controls.minDistance = 20;
  controls.maxDistance = 50;
  controls.maxPolarAngle = Math.PI / 2;

  // 
  scene.add(new THREE.AmbientLight(0x222222));

  const light = new THREE.PointLight(0xffffff,1);
  scene.add(light);
  
  scene.add(new THREE.AxesHelper(20));
  
  const loader = new THREE.TextureLoader();
  const texture = loader.load('https://threejs.org/examples/textures/sprites/disc.png');

  group = new THREE.Group();
  scene.add(group);
  
  let dodecahedronGeometry = new THREE.DodecahedronGeometry(10);
  dodecahedronGeometry.deleteAttribute('normal');
  dodecahedronGeometry.deleteAttribute('uv');

  dodecahedronGeometry = BufferGeometryUtils.mergeVertices(dodecahedronGeometry);
  
  const vertices = [];
  const positionAttribute = dodecahedronGeometry.getAttribute('position');

  for(let i=0;i < positionAttribute.count;i++) {
    const vertex = new THREE.Vector3();
    vertex.fromBufferAttribute(positionAttribute,i);
    vertices.push(vertex); 
  }

  const pointsMaterial = new THREE.PointsMaterial({
    color:0x0080ff,
    map:texture,
    size:1,
    alphaTest:0.5,
  });

  const pointsGeometry = new THREE.BufferGeometry().setFromPoints(vertices);
  
  const points = new THREE.Points(pointsGeometry,pointsMaterial);
  group.add(points);

  const meshMaterial = new THREE.MeshLambertMaterial({
    color:0xffffff,
    opacity: 0.5,
    transparent: true,
  });

  const meshGeometry = new ConvexGeometry(vertices);

  const mesh1 = new THREE.Mesh(meshGeometry, meshMaterial);
  mesh1.material.side = THREE.BackSide; // back faces
  mesh1.renderOrder = 0;
  group.add(mesh1);

  const mesh2 = new THREE.Mesh(meshGeometry, meshMaterial.clone());
  mesh2.material.side = THREE.FrontSide; // front faces
  mesh2.renderOrder = 1;
  group.add(mesh2);

  window.addEventListener('resize', onWindowResize);
  
}


function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);

  group.rotation.y += 0.005;

  render();
}

function render() {
  renderer.render(scene, camera);
}
