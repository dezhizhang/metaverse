/*
 * :file description: 
 * :name: /threejs/examples/ImageLoader.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-02-07 22:36:11
 * :last editor: 张德志
 * :date last edited: 2024-02-07 22:36:13
 */
import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let camera, scene, renderer;

let object;

init();

function init() {
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000);
  camera.position.z = 2.5;

  scene = new THREE.Scene();

  const ambientLight = new THREE.AmbientLight(0xffffff);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 15);
  camera.add(pointLight);
  scene.add(camera);

  // manager
  function loadModel() {
    object.traverse(function (child) {
      if (child.isMesh) child.material.map = texture;
    });

    object.position.y = -0.95;
    object.scale.setScalar(0.01);
    scene.add(object);

    render();
  }

  const manager = new THREE.LoadingManager(loadModel);

  // texture
  const textureLoader = new THREE.TextureLoader(manager);
  const texture = textureLoader.load(
    'https://threejs.org/examples/textures/uv_grid_opengl.jpg',
    render,
  );
  texture.colorSpace = THREE.SRGBColorSpace;

  function onProgress(xhr) {
    if (xhr.lengthComputable) {
      const percentComplete = (xhr.loaded / xhr.total) * 100;
      console.log('model' + percentComplete.toFixed(2) + '% downloaded');
    }
  }

  function onError() {}

  const loader = new OBJLoader(manager);
  loader.load(
    'https://threejs.org/examples/models/obj/male02/male02.obj',
    function (obj) {
      object = obj;
    },
    onProgress,
    onError,
  );

  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth,window.innerHeight);
  document.body.appendChild(renderer.domElement);

}

const controls = new OrbitControls(camera,renderer.domElement);
controls.minDistance = 2;
controls.maxDistance = 5;
controls.addEventListener('change',render);


window.addEventListener('resize',onWindowResize);


function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth,window.innerHeight);
}

function render() {
	renderer.render(scene,camera);
}

